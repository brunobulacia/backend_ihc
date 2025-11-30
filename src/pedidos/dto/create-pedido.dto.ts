import { EstadoPedido } from '@prisma/client';

export interface CreatePedidoDto {
  userId: string;
  estado: EstadoPedido;
  total: number;
  direccion: string;
  conductorId?: string;
  latitudDestino?: number;
  longitudDestino?: number;
  conductoresRechazados?: string[];
}

// DTO extendido para cuando el frontend crea pedidos con items
export interface CreatePedidoConItemsDto {
  userId: string;
  items: Array<{
    productoId: string;
    cantidad: number;
    precioUnit: number;
  }>;
  direccion?: string; // Opcional si usan tabla Direccion
  estado?: EstadoPedido;
}
