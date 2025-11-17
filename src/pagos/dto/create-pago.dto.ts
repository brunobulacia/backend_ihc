import { Pago } from '@prisma/client';
export type CreatePagoDto = Omit<Pago, 'id' | 'fechaPago' | 'isActive'>;
