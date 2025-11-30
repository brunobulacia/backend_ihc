import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { DireccionModule } from './direccion/direccion.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PagosModule } from './pagos/pagos.module';
import { ProductosModule } from './productos/productos.module';
import { CarritosModule } from './carritos/carritos.module';
import { ItemsCarritoModule } from './items_carrito/items_carrito.module';
import { DetallePedidoModule } from './detalle_pedido/detalle_pedido.module';
import { CompraModule } from './transactions/realizar_compra/compra.module';
import { TelegramModule } from './telegram/telegram.module';
import { LogsModule } from './logs/logs.module';
import { ConductoresModule } from './conductores/conductores.module';

@Module({
  imports: [
    UsersModule,
    DireccionModule,
    PedidosModule,
    PagosModule,
    ProductosModule,
    CarritosModule,
    ItemsCarritoModule,
    DetallePedidoModule,
    CompraModule,
    TelegramModule,
    LogsModule,
    ConductoresModule,
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
