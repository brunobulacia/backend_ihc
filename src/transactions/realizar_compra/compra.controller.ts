import { Controller, Post } from '@nestjs/common';
import { CompraService } from './compra.service';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  realizarCompra() {
    return this.compraService.realizarCompra();
  }
}
