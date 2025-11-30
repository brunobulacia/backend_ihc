import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConductoresModule } from 'src/conductores/conductores.module';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports: [PrismaModule, ConductoresModule],
  exports: [PedidosService],
})
export class PedidosModule {}
