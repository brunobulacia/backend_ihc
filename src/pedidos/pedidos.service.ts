import { Injectable, Logger } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConductoresService } from 'src/conductores/conductores.service';

@Injectable()
export class PedidosService {
  private readonly logger = new Logger(PedidosService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly conductoresService: ConductoresService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    // Crear el pedido
    const pedido = await this.prismaService.pedido.create({
      data: createPedidoDto,
    });

    // Asignar conductor más cercano
    await this.asignarConductor(pedido.id);

    return pedido;
  }

  // Método para asignar conductor (usado al crear pedido y al rechazar)
  async asignarConductor(pedidoId: string) {
    const pedido = await this.prismaService.pedido.findUnique({
      where: { id: pedidoId },
    });

    if (!pedido) {
      this.logger.error(`Pedido ${pedidoId} no encontrado`);
      return;
    }

    // Encontrar conductor más cercano al RESTAURANTE
    const conductorId = await this.conductoresService.encontrarConductorMasCercano(
      pedido.conductoresRechazados,
    );

    if (!conductorId) {
      this.logger.warn(`No hay conductores disponibles para pedido ${pedidoId}`);
      return;
    }

    // Asignar conductor al pedido
    await this.prismaService.pedido.update({
      where: { id: pedidoId },
      data: { conductorId },
    });

    this.logger.log(`Pedido ${pedidoId} asignado a conductor ${conductorId}`);
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

  // Conductor acepta el pedido
  async aceptarPedido(pedidoId: string, conductorId: string) {
    const pedido = await this.prismaService.pedido.findUnique({
      where: { id: pedidoId },
    });

    if (!pedido || pedido.conductorId !== conductorId) {
      throw new Error('Pedido no encontrado o no asignado a este conductor');
    }

    return this.prismaService.pedido.update({
      where: { id: pedidoId },
      data: { estado: 'ACEPTADO' },
    });
  }

  // Conductor rechaza el pedido
  async rechazarPedido(pedidoId: string, conductorId: string) {
    const pedido = await this.prismaService.pedido.findUnique({
      where: { id: pedidoId },
    });

    if (!pedido || pedido.conductorId !== conductorId) {
      throw new Error('Pedido no encontrado o no asignado a este conductor');
    }

    // Agregar conductor a la lista de rechazados
    const conductoresRechazados = [...pedido.conductoresRechazados, conductorId];

    // Actualizar pedido (quitar conductor actual y agregar a rechazados)
    await this.prismaService.pedido.update({
      where: { id: pedidoId },
      data: {
        conductorId: null,
        conductoresRechazados,
      },
    });

    // Intentar asignar a otro conductor
    await this.asignarConductor(pedidoId);

    this.logger.log(`Conductor ${conductorId} rechazó pedido ${pedidoId}, reasignando...`);
  }

  // Conductor inicia el viaje (recogió el pedido del restaurante)
  async iniciarViaje(pedidoId: string, conductorId: string) {
    const pedido = await this.prismaService.pedido.findUnique({
      where: { id: pedidoId },
    });

    if (!pedido || pedido.conductorId !== conductorId) {
      throw new Error('Pedido no encontrado o no asignado a este conductor');
    }

    return this.prismaService.pedido.update({
      where: { id: pedidoId },
      data: { estado: 'EN_CAMINO' },
    });
  }

  // Conductor entrega el pedido
  async entregarPedido(pedidoId: string, conductorId: string) {
    const pedido = await this.prismaService.pedido.findUnique({
      where: { id: pedidoId },
    });

    if (!pedido || pedido.conductorId !== conductorId) {
      throw new Error('Pedido no encontrado o no asignado a este conductor');
    }

    return this.prismaService.pedido.update({
      where: { id: pedidoId },
      data: { estado: 'ENTREGADO' },
    });
  }
}
