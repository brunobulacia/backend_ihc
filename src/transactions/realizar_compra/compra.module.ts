import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductosModule } from 'src/productos/productos.module';
import { PedidosModule } from 'src/pedidos/pedidos.module';
import { DetallePedidoModule } from 'src/detalle_pedido/detalle_pedido.module';
import { PagosModule } from 'src/pagos/pagos.module';
import { CarritosModule } from 'src/carritos/carritos.module';
import { ItemsCarritoModule } from 'src/items_carrito/items_carrito.module';

@Module({
  controllers: [CompraController],
  providers: [CompraService],
  imports: [
    UsersModule,
    ProductosModule,
    PedidosModule,
    DetallePedidoModule,
    PagosModule,
    CarritosModule,
    ItemsCarritoModule,
  ],
})
export class CompraModule {}

