import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  private readonly logger = new Logger(TelegramController.name);
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Body() update: any,
    @Headers('x-telegram-bot-api-secret-token') secretHeader?: string,
  ) {
    const expected = process.env.WEBHOOK_SECRET;
    if (expected && secretHeader !== expected) {
      this.logger.warn('Secret token inválido en webhook');
      // devuelve un body para logs, Telegram solo mira el status code
      return { ok: false, message: 'invalid secret' };
    }

    this.logger.debug('Update recibido, procesando inline');
    // Procesar inline — mantené lógica ligera
    this.telegramService
      .processUpdate(update)
      .catch((err) => this.logger.error(err));

    return { ok: true };
  }
}
