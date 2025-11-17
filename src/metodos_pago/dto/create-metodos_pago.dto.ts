import { MetodoPago } from '@prisma/client';

export type CreateMetodosPagoDto = Omit<
  MetodoPago,
  'id' | 'ventaId' | 'isActive'
>;
