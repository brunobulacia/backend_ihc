import { Injectable } from '@nestjs/common';
import { CreateItemsCarritoDto } from './dto/create-items_carrito.dto';
import { UpdateItemsCarritoDto } from './dto/update-items_carrito.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsCarritoService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createItemsCarritoDto: CreateItemsCarritoDto) {
    return this.prismaService.itemCarrito.create({
      data: createItemsCarritoDto,
    });
  }

  findAll() {
    return this.prismaService.itemCarrito.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.itemCarrito.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateItemsCarritoDto: UpdateItemsCarritoDto) {
    return this.prismaService.itemCarrito.update({
      where: { id, isActive: true },
      data: updateItemsCarritoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.itemCarrito.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
  }
}
