import { Module } from '@nestjs/common';
import { ProductosCategoriasService } from './productos_categorias.service';
import { ProductosCategoriasController } from './productos_categorias.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProductosCategoriasController],
  providers: [ProductosCategoriasService],
  imports: [PrismaModule],
})
export class ProductosCategoriasModule {}
