import { Module } from '@nestjs/common';
import { DetallePedidoService } from './detalle_pedido.service';
import { DetallePedidoController } from './detalle_pedido.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
  imports: [PrismaModule],
  exports: [DetallePedidoService],
})
export class DetallePedidoModule {}
