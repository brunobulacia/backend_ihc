import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductosModule } from 'src/productos/productos.module';
import { CarritosModule } from 'src/carritos/carritos.module';
import { ItemsCarritoModule } from 'src/items_carrito/items_carrito.module';
import { VentasModule } from 'src/ventas/ventas.module';
import { DetalleVentaModule } from 'src/detalle_venta/detalle_venta.module';
import { PagosModule } from 'src/pagos/pagos.module';

@Module({
  controllers: [CompraController],
  providers: [CompraService],
  imports: [
    UsersModule,
    ProductosModule,
    CarritosModule,
    ItemsCarritoModule,
    VentasModule,
    DetalleVentaModule,
    PagosModule,
  ],
})
export class CompraModule {}
