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
          await this.sendMessage(
            chatId,
            'Hola capo 😎, tu bot ya está conectado!',
          );
          return;
        }

        await this.sendMessage(chatId, `Recibí tu mensaje: ${text}`);
        return;
      }

      // callback_query
      if (update.callback_query) {
        const cq = update.callback_query;
        await this.answerCallbackQuery(cq.id, 'Recibido ✅');
        await this.sendMessage(cq.from.id, `Presionaste: ${cq.data}`);
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
  private async sendMessage(chat_id: number | string, text: string) {
    const url = `${this.apiBase}/sendMessage`;
    await firstValueFrom(this.http.post(url, { chat_id, text }));
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
}
