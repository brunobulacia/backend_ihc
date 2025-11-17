import { Injectable } from '@nestjs/common';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarritosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCarritoDto: CreateCarritoDto) {
    return this.prismaService.carrito.create({
      data: createCarritoDto,
    });
  }

  findAll() {
    return this.prismaService.carrito.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.carrito.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateCarritoDto: UpdateCarritoDto) {
    return this.prismaService.carrito.update({
      where: { id, isActive: true },
      data: updateCarritoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.carrito.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
  }
}
