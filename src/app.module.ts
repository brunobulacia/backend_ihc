import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DireccionModule } from './direccion/direccion.module';
import { VentasModule } from './ventas/ventas.module';
import { PagosModule } from './pagos/pagos.module';
import { MetodosPagoModule } from './metodos_pago/metodos_pago.module';
import { ProductosModule } from './productos/productos.module';
import { CarritosModule } from './carritos/carritos.module';
import { ItemsCarritoModule } from './items_carrito/items_carrito.module';
import { DetalleVentaModule } from './detalle_venta/detalle_venta.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosCategoriasModule } from './productos_categorias/productos_categorias.module';
import { CompraModule } from './transactions/realizar_compra/compra.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DireccionModule,
    VentasModule,
    PagosModule,
    MetodosPagoModule,
    ProductosModule,
    CarritosModule,
    ItemsCarritoModule,
    DetalleVentaModule,
    CategoriasModule,
    ProductosCategoriasModule,
    CompraModule,
  ],
  controllers: [],
  providers: [
    /*  {
      //PARA PONER EL GUARD DE JWT EN TODOS LOS ENDPOINTS PERRITOUUUU
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, */
  ],
})
export class AppModule {}
