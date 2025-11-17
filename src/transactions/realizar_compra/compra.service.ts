import { Injectable } from '@nestjs/common';

@Injectable()
export class CompraService {
  realizarCompra() {
    return 'Compra realizada con éxito';
  }
}
