import { Categoria } from '@prisma/client';

export type CreateCategoriaDto = Omit<Categoria, 'id' | 'isActive'>;
