import { Module } from '@nestjs/common';
import { ItemsCarritoService } from './items_carrito.service';
import { ItemsCarritoController } from './items_carrito.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ItemsCarritoController],
  providers: [ItemsCarritoService],
  imports: [PrismaModule],
  exports: [ItemsCarritoService],
})
export class ItemsCarritoModule {}
