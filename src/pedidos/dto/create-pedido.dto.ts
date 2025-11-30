import { Pedido, EstadoPedido } from '@prisma/client';

export type CreatePedidoDto = Omit<Pedido, 'id' | 'fechaCreacion'>;

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
