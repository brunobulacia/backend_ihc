import { Body, Controller, Post } from '@nestjs/common';
import { PagarService } from './pagar.service';
import type { PagarCompraDto } from './dto/pagar-compra.dto';

@Controller('pagar')
export class PagarController {
  constructor(private readonly pagarService: PagarService) {}

  @Post()
  async pagarCompra(@Body() pagarCompraDto: PagarCompraDto) {
    return this.pagarService.pagarCompra(pagarCompraDto);
  }
}
