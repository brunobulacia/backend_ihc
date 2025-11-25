import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [TelegramController],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
