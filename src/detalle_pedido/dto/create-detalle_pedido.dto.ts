import { DetallePedido } from '@prisma/client';

export type CreateDetallePedidoDto = Omit<
  DetallePedido,
  'id' | 'createdAt' | 'updatedAt'
>;
