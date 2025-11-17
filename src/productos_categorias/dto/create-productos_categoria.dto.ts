import { ProductoCategoria } from '@prisma/client';

export type CreateProductosCategoriaDto = Omit<
  ProductoCategoria,
  'id' | 'isActive'
>;
