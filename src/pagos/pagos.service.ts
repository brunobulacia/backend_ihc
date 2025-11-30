import { Injectable } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PagosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPagoDto: CreatePagoDto) {
    return this.prismaService.pago.create({
      data: createPagoDto,
    });
  }

  findAll() {
    return this.prismaService.pago.findMany({
      include: {
        pedido: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.pago.findUnique({
      where: { id },
      include: {
        pedido: true,
      },
    });
  }

  update(id: string, updatePagoDto: UpdatePagoDto) {
    return this.prismaService.pago.update({
      where: { id },
      data: updatePagoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.pago.delete({
      where: { id },
    });
  }
}
