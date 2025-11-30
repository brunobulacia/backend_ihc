import { Injectable } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle_pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle_pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DetallePedidoService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDetallePedidoDto: CreateDetallePedidoDto) {
    return this.prismaService.detallePedido.create({
      data: createDetallePedidoDto,
    });
  }

  findAll() {
    return this.prismaService.detallePedido.findMany({
      include: {
        producto: true,
        pedido: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.detallePedido.findUnique({
      where: { id },
      include: {
        producto: true,
        pedido: true,
      },
    });
  }

  update(id: string, updateDetallePedidoDto: UpdateDetallePedidoDto) {
    return this.prismaService.detallePedido.update({
      where: { id },
      data: updateDetallePedidoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.detallePedido.delete({
      where: { id },
    });
  }
}
