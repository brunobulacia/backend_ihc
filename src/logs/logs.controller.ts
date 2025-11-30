import { Controller, Post, Body, Logger } from '@nestjs/common';

@Controller('logs')
export class LogsController {
  private readonly logger = new Logger('FrontendLogs');

  @Post('client')
  logFromClient(@Body() body: any) {
    const { level, message, data } = body;
    
    switch (level) {
      case 'error':
        this.logger.error(`[CLIENT] ${message}`, JSON.stringify(data));
        break;
      case 'warn':
        this.logger.warn(`[CLIENT] ${message}`, JSON.stringify(data));
        break;
      case 'info':
      default:
        this.logger.log(`[CLIENT] ${message}`, JSON.stringify(data));
        break;
    }
    
    return { ok: true };
  }
}
