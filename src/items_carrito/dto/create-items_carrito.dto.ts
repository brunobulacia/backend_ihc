import { ItemCarrito } from '@prisma/client';

export type CreateItemsCarritoDto = Omit<
  ItemCarrito,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;
