import { Ventas } from '@prisma/client';

export type CreateVentaDto = Omit<Ventas, 'id' | 'fechaVenta' | 'isActive'>;
