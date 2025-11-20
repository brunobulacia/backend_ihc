import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly apiBase: string;

  constructor(private readonly http: HttpService) {
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
        const text = update.message.text.trim();

        if (text === '/start') {
          const welcomeMessage = `¡Bienvenido a CambaEats! 🍕

Comida deliciosa al instante

Selecciona tu ubicación, ordena tu pedido desde nuestro menú y recíbelo en tu puerta de la manera más rápida y fácil posible.`;

          const inlineKeyboard = {
            inline_keyboard: [
              [
                {
                  text: '🍽️ Explorar el Menú',
                  web_app: { url: 'https://t.me/CambaEats_bot/depl' },
                },
              ],
              [
                {
                  text: '📍 Mi Ubicación',
                  callback_data: 'location',
                },
                {
                  text: '🛒 Mi Carrito',
                  callback_data: 'cart',
                },
              ],
              [
                {
                  text: '📞 Soporte',
                  callback_data: 'support',
                },
                {
                  text: '🔄 Mis Pedidos',
                  callback_data: 'orders',
                },
              ],
            ],
          };

          await this.sendMessage(chatId, welcomeMessage, inlineKeyboard);
          return;
        }

        await this.sendMessage(chatId, `Recibí tu mensaje: ${text}`);
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
        const filePath = fileInfo?.result?.file_path;
        this.logger.debug(`File path: ${filePath}`);
        // si necesitás descargar -> https://api.telegram.org/file/bot<TOKEN>/<file_path>
        await this.sendMessage(
          update.message.chat.id,
          'Foto recibida, gracias!',
        );
        return;
      }

      this.logger.debug(
        'Tipo de update no manejado: ' + JSON.stringify(Object.keys(update)),
      );
    } catch (err) {
      this.logger.error('Error en processUpdate', err);
    }
  }

  // helpers usando HttpService (axios)
  private async sendMessage(
    chat_id: number | string,
    text: string,
    reply_markup?: any,
  ) {
    const url = `${this.apiBase}/sendMessage`;
    const payload: any = { chat_id, text };
    if (reply_markup) {
      payload.reply_markup = reply_markup;
    }
    await firstValueFrom(this.http.post(url, payload));
  }

  private async answerCallbackQuery(callback_query_id: string, text?: string) {
    const url = `${this.apiBase}/answerCallbackQuery`;
    await firstValueFrom(this.http.post(url, { callback_query_id, text }));
  }

  private async getFile(file_id: string) {
    const url = `${this.apiBase}/getFile`;
    const response$ = this.http.get(url, { params: { file_id } });
    const res = await firstValueFrom(response$);
    return res.data;
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
                web_app: { url: 'https://t.me/CambaEats_bot/depl' },
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
          '📞 **Soporte CambaEats**\n\n¿Necesitas ayuda? Estamos aquí para ti:\n\n• 📧 Email: soporte@cambaeats.com\n• 📱 WhatsApp: +591 123 456 789\n• 🕐 Horario: Lunes a Domingo 8:00 - 22:00\n\nTambién puedes escribir tu consulta aquí y te responderemos lo antes posible.',
        );
        break;

      case 'orders':
        const ordersKeyboard = {
          inline_keyboard: [
            [
              {
                text: '🍽️ Hacer un Pedido',
                web_app: { url: 'https://t.me/CambaEats_bot/depl' },
              },
            ],
          ],
        };
        await this.sendMessage(
          chatId,
          '🔄 **Mis Pedidos**\n\nAún no tienes pedidos realizados.\n\n¡Haz tu primer pedido y disfruta de nuestra deliciosa comida!',
          ordersKeyboard,
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
