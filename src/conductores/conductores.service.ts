import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateConductoreDto } from './dto/update-conductore.dto';

// Ubicación fija del restaurante (Catedral de Santa Cruz)
const RESTAURANTE_LAT = -17.783300;
const RESTAURANTE_LNG = -63.182140;

@Injectable()
export class ConductoresService {
  constructor(private prisma: PrismaService) {}

  // Actualizar ubicación del conductor
  async actualizarUbicacion(id: string, latitud: number, longitud: number) {
    const conductor = await this.prisma.conductor.findUnique({
      where: { id },
    });

    if (!conductor) {
      throw new NotFoundException(`Conductor ${id} no encontrado`);
    }

    return this.prisma.conductor.update({
      where: { id },
      data: { latitud, longitud },
    });
  }

  // Obtener pedido pendiente asignado al conductor
  async obtenerPedidoPendiente(conductorId: string) {
    return this.prisma.pedido.findFirst({
      where: {
        conductorId,
        estado: 'PENDIENTE',
      },
      include: {
        detallesPedido: {
          include: {
            producto: true,
          },
        },
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  // Calcular distancia entre dos puntos (fórmula de Haversine)
  private calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Encontrar conductor más cercano al RESTAURANTE
  async encontrarConductorMasCercano(
    conductoresRechazados: string[] = [],
  ): Promise<string | null> {
    const conductoresDisponibles = await this.prisma.conductor.findMany({
      where: {
        disponible: true,
        id: {
          notIn: conductoresRechazados,
        },
      },
    });

    if (conductoresDisponibles.length === 0) {
      return null;
    }

    // Calcular distancia de cada conductor al RESTAURANTE (punto de recogida)
    let conductorMasCercano = conductoresDisponibles[0];
    let distanciaMinima = this.calcularDistancia(
      conductorMasCercano.latitud,
      conductorMasCercano.longitud,
      RESTAURANTE_LAT,
      RESTAURANTE_LNG,
    );

    for (const conductor of conductoresDisponibles.slice(1)) {
      const distancia = this.calcularDistancia(
        conductor.latitud,
        conductor.longitud,
        RESTAURANTE_LAT,
        RESTAURANTE_LNG,
      );

      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        conductorMasCercano = conductor;
      }
    }

    return conductorMasCercano.id;
  }

  findAll() {
    return this.prisma.conductor.findMany();
  }

  findOne(id: string) {
    return this.prisma.conductor.findUnique({
      where: { id },
    });
  }

  update(id: string, updateConductoreDto: UpdateConductoreDto) {
    return this.prisma.conductor.update({
      where: { id },
      data: updateConductoreDto,
    });
  }
}
