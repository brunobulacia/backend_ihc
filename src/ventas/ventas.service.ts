import { Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VentasService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createVentaDto: CreateVentaDto) {
    return this.prismaService.ventas.create({
      data: createVentaDto,
    });
  }

  findAll() {
    return this.prismaService.ventas.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.ventas.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateVentaDto: UpdateVentaDto) {
    return this.prismaService.ventas.update({
      where: { id, isActive: true },
      data: updateVentaDto,
    });
  }

  remove(id: string) {
    return this.prismaService.ventas.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
