import { Injectable } from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle_venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle_venta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DetalleVentaService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDetalleVentaDto: CreateDetalleVentaDto) {
    return this.prismaService.detalleVenta.create({
      data: createDetalleVentaDto,
    });
  }

  findAll() {
    return this.prismaService.detalleVenta.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.detalleVenta.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateDetalleVentaDto: UpdateDetalleVentaDto) {
    return this.prismaService.detalleVenta.update({
      where: { id, isActive: true },
      data: updateDetalleVentaDto,
    });
  }

  remove(id: string) {
    return this.prismaService.detalleVenta.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
  }
}
