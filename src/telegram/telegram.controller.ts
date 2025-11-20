import {
  Controller,
  Post,
  Get,
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

  @Get('health')
  @HttpCode(200)
  health() {
    this.logger.log('Health check endpoint alcanzado');
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      message: 'Telegram module is working correctly',
    };
  }

  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Body() update: any,
    @Headers('x-telegram-bot-api-secret-token') secretHeader?: string,
  ) {
    // Solo log si hay problema con el secret token
    const expected = process.env.WEBHOOK_SECRET;
    if (expected && secretHeader !== expected) {
      this.logger.warn('Secret token inválido en webhook');
      return { ok: false, message: 'invalid secret' };
    }

    // Log mínimo solo con información esencial
    if (update.message?.text || update.callback_query) {
      const type = update.message?.text ? 'message' : 'callback';
      const identifier = update.message?.text || update.callback_query?.data;
      this.logger.log(`Webhook: ${type} - ${identifier}`);
    }

    // Procesar inline — mantené lógica ligera
    this.telegramService.processUpdate(update).catch((err) => {
      this.logger.error('Error procesando update:', err.message || err);
    });

    return { ok: true };
  }
}
