import { Module } from '@nestjs/common';
import { MetodosPagoService } from './metodos_pago.service';
import { MetodosPagoController } from './metodos_pago.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MetodosPagoController],
  providers: [MetodosPagoService],
  imports: [PrismaModule],
})
export class MetodosPagoModule {}
