export type CreateCompraDto = {
  userId: string;
  productos: {
    productoId: string;
    cantidad: number;
  }[];
};
