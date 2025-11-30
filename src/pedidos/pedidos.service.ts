import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPedidoDto: CreatePedidoDto) {
    return this.prismaService.pedido.create({
      data: createPedidoDto,
    });
  }

  findAll() {
    return this.prismaService.pedido.findMany({
      include: {
        detallesPedido: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: {
        fechaCreacion: 'desc',
      },
    });
  }

  findAllByUser(userId: string) {
    return this.prismaService.pedido.findMany({
      where: { userId },
      include: {
        detallesPedido: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: {
        fechaCreacion: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.pedido.findUnique({
      where: { id },
      include: {
        detallesPedido: {
          include: {
            producto: true,
          },
        },
        pago: true,
      },
    });
  }

  update(id: string, updatePedidoDto: UpdatePedidoDto) {
    return this.prismaService.pedido.update({
      where: { id },
      data: updatePedidoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.pedido.delete({
      where: { id },
    });
  }
}
