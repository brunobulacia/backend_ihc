import { Carrito } from '@prisma/client';

export type CreateCarritoDto = Omit<
  Carrito,
  'id' | 'createdAt' | 'updatedAt' | 'isActive'
>;
