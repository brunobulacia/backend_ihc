import { DetalleVenta } from '@prisma/client';

export type CreateDetalleVentaDto = Omit<
  DetalleVenta,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;
