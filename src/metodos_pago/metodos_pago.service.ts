import { Injectable } from '@nestjs/common';
import { CreateMetodosPagoDto } from './dto/create-metodos_pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos_pago.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetodosPagoService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createMetodosPagoDto: CreateMetodosPagoDto) {
    return this.prismaService.metodoPago.create({
      data: createMetodosPagoDto,
    });
  }

  findAll() {
    return this.prismaService.metodoPago.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.metodoPago.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateMetodosPagoDto: UpdateMetodosPagoDto) {
    return this.prismaService.metodoPago.update({
      where: { id },
      data: updateMetodosPagoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.metodoPago.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
  }
}
