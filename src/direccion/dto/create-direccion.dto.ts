import { Direccion } from '@prisma/client';

export type CreateDireccionDto = Omit<
  Direccion,
  'id' | 'createdAt' | 'updatedAt'
>;
