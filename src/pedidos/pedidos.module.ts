import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports: [PrismaModule],
  exports: [PedidosService],
})
export class PedidosModule {}
