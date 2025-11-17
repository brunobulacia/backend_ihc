import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductoDto: CreateProductoDto) {
    return this.prismaService.producto.create({
      data: createProductoDto,
    });
  }

  findAll() {
    return this.prismaService.producto.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.producto.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateProductoDto: UpdateProductoDto) {
    return this.prismaService.producto.update({
      where: { id, isActive: true },
      data: updateProductoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.producto.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
  }
}
