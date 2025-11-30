import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly apiBase: string;
  private pendingRequests = 0;
  private readonly maxConcurrentRequests = 3;

  constructor(
    private readonly http: HttpService,
    private readonly usersService: UsersService,
  ) {
    const token = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN;
    this.apiBase = `https://api.telegram.org/bot${token}`;
    if (!token)
      this.logger.warn('TELEGRAM_BOT_TOKEN no configurado en env vars');
  }

  async processUpdate(update: any) {
    try {
      if (!update) return;

      // mensajes de texto simples
      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const user = update.message.from;
        const chatUsername =
          user.username ||
          `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}` ||
          'desconocido';
        const text = update.message.text.trim();

        const userId = String(user.id);

        if (text === '/start') {
          const user = await this.usersService.findOne(userId);

          if (!user) {
            const userCreated = await this.usersService.create({
              id: userId,
              username: chatUsername || '',
            });

            this.logger.log(`Usuario creado: ${userCreated.id}`);
          }

          const welcomeMessage = `¡Bienvenido a CambaEats! 🍕

Comida deliciosa al instante

Selecciona tu ubicación, ordena tu pedido desde nuestro menú y recíbelo en tu puerta de la manera más rápida y fácil posible.`;

          const inlineKeyboard = {
            inline_keyboard: [
              [
                {
                  text: '🍽️ Explorar el Menú',
                  url: `https://t.me/CambaEats_bot/depl?startapp=${userId}`,
                },
              ],
            ],
          };

          await this.sendMessage(chatId, welcomeMessage, inlineKeyboard);
          return;
        }

        this.logger.log(
          `Received message: ${text} from chatId: ${chatId} (username: ${chatUsername}) userId: ${userId}`,
        );

        await this.sendMessage(
          chatId,
          `Recibí tu mensaje: ${text}, tu chatId es: ${chatId} y tu usuario es: @${chatUsername} (y tu userId es: ${userId})`,
        );
        return;
      }

      // callback_query
      if (update.callback_query) {
        const cq = update.callback_query;
        await this.handleCallbackQuery(cq);
        return;
      }

      // fotos
      if (update.message && update.message.photo) {
        const photos = update.message.photo;
        const largest = photos[photos.length - 1];
        const fileId = largest.file_id;
        const fileInfo = await this.getFile(fileId);
        // Solo log si hay error, no en casos normales
        await this.sendMessage(
          update.message.chat.id,
          'Foto recibida, gracias!',
        );
        return;
      }

      // Solo log para tipos realmente desconocidos, no para cada update
    } catch (err) {
      this.logger.error(
        `Error en processUpdate: ${err.message || 'Unknown error'}`,
      );
    }
  }

  // helpers usando HttpService (axios) con timeout y rate limiting
  private async sendMessage(
    chat_id: number | string,
    text: string,
    reply_markup?: any,
    parse_mode?: string,
  ) {
    // Rate limiting interno
    if (this.pendingRequests >= this.maxConcurrentRequests) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const url = `${this.apiBase}/sendMessage`;
    const payload: any = { chat_id, text };
    if (reply_markup) {
      payload.reply_markup = reply_markup;
    }
    if (parse_mode) {
      payload.parse_mode = parse_mode;
    }

    this.pendingRequests++;
    try {
      await firstValueFrom(
        this.http.post(url, payload, {
          timeout: 10000, // 10 segundos timeout
        }),
      );
    } catch (error) {
      // Log más detallado para debug
      this.logger.error(
        `Error sending message: ${error?.response?.status || error.message}`,
      );
      if (error?.response?.data) {
        this.logger.error('Telegram API error:', error.response.data);
      }
      throw error;
    } finally {
      this.pendingRequests = Math.max(0, this.pendingRequests - 1);
    }
  }

  private async answerCallbackQuery(callback_query_id: string, text?: string) {
    const url = `${this.apiBase}/answerCallbackQuery`;
    try {
      await firstValueFrom(
        this.http.post(
          url,
          { callback_query_id, text },
          {
            timeout: 5000, // 5 segundos timeout
          },
        ),
      );
    } catch (error) {
      // Solo log errores críticos
      if (error?.response?.status !== 429) {
        this.logger.error(
          `Error answering callback: ${error?.response?.status || error.message}`,
        );
      }
    }
  }

  private async getFile(file_id: string) {
    const url = `${this.apiBase}/getFile`;
    try {
      const response$ = this.http.get(url, {
        params: { file_id },
        timeout: 8000, // 8 segundos timeout
      });
      const res = await firstValueFrom(response$);
      return res.data;
    } catch (error) {
      if (error?.response?.status !== 429) {
        this.logger.error(
          `Error getting file: ${error?.response?.status || error.message}`,
        );
      }
      return null;
    }
  }

  private async handleCallbackQuery(callbackQuery: any) {
    const chatId = callbackQuery.from.id;
    const data = callbackQuery.data;

    await this.answerCallbackQuery(callbackQuery.id);

    switch (data) {
      case 'location':
        await this.sendMessage(
          chatId,
          '📍 Para establecer tu ubicación, comparte tu ubicación usando el botón de adjuntos en Telegram o escribe tu dirección.',
        );
        break;

      case 'cart':
        const cartKeyboard = {
          inline_keyboard: [
            [
              {
                text: '🍽️ Ir al Menú',
                url: 'https://t.me/CambaEats_bot/depl?startapp=cart',
              },
            ],
          ],
        };
        await this.sendMessage(
          chatId,
          '🛒 Tu carrito está vacío\n\n¡Explora nuestro delicioso menú y agrega algunos productos!',
          cartKeyboard,
        );
        break;

      case 'support':
        await this.sendMessage(
          chatId,
          '📞 *Soporte CambaEats*\n\n¿Necesitas ayuda? Estamos aquí para ti:\n\n• 📧 Email: soporte@cambaeats.com\n• 📱 WhatsApp: +591 123 456 789\n• 🕐 Horario: Lunes a Domingo 8:00 - 22:00\n\nTambién puedes escribir tu consulta aquí y te responderemos lo antes posible.',
          null,
          'Markdown',
        );
        break;

      case 'orders':
        const ordersKeyboard = {
          inline_keyboard: [
            [
              {
                text: '🍽️ Hacer un Pedido',
                url: 'https://t.me/CambaEats_bot/depl?startapp=orders',
              },
            ],
          ],
        };
        await this.sendMessage(
          chatId,
          '🔄 *Mis Pedidos*\n\nAún no tienes pedidos realizados.\n\n¡Haz tu primer pedido y disfruta de nuestra deliciosa comida!',
          ordersKeyboard,
          'Markdown',
        );
        break;

      default:
        await this.sendMessage(
          chatId,
          'Función en desarrollo. ¡Pronto estará disponible! 🚧',
        );
    }
  }
}
