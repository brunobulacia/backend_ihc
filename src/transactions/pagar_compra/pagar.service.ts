import { Injectable } from '@nestjs/common';
import { PagarCompraDto } from './dto/pagar-compra.dto';

@Injectable()
export class PagarService {
  async pagarCompra(pagarCompraDto: PagarCompraDto) {
    return 'Paga hermanito';
  }
}
