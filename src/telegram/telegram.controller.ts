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
    this.logger.log('Webhook endpoint alcanzado correctamente');

    const expected = process.env.WEBHOOK_SECRET;
    if (expected && secretHeader !== expected) {
      this.logger.warn('Secret token inválido en webhook');
      // devuelve un body para logs, Telegram solo mira el status code
      return { ok: false, message: 'invalid secret' };
    }

    this.logger.log('Secret token válido, procesando update');
    this.logger.debug('Update recibido:', JSON.stringify(update, null, 2));

    // Procesar inline — mantené lógica ligera
    this.telegramService.processUpdate(update).catch((err) => {
      this.logger.error('Error procesando update:', err);
    });

    return { ok: true };
  }
}
