import { Module } from '@nestjs/common';
import { PagarService } from './pagar.service';
import { PagarController } from './pagar.controller';

@Module({
  controllers: [PagarController],
  providers: [PagarService],
})
export class PagarModule {}
