import { Producto } from '@prisma/client';

export type CreateProductoDto = Omit<Producto, 'id' | 'isActive'>;
