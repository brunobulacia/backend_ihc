import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VentasController],
  providers: [VentasService],
  imports: [PrismaModule],
  exports: [VentasService],
})
export class VentasModule {}
