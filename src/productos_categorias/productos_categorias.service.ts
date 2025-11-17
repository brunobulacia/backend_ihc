import { Injectable } from '@nestjs/common';
import { CreateProductosCategoriaDto } from './dto/create-productos_categoria.dto';
import { UpdateProductosCategoriaDto } from './dto/update-productos_categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductosCategoriasService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductosCategoriaDto: CreateProductosCategoriaDto) {
    return this.prismaService.productoCategoria.create({
      data: createProductosCategoriaDto,
    });
  }

  findAll() {
    return this.prismaService.productoCategoria.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.productoCategoria.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateProductosCategoriaDto: UpdateProductosCategoriaDto) {
    return this.prismaService.productoCategoria.update({
      where: { id, isActive: true },
      data: updateProductosCategoriaDto,
    });
  }

  remove(id: string) {
    return this.prismaService.productoCategoria.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
  }
}
