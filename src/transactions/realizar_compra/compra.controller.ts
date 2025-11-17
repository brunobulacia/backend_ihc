import { Body, Controller, Post } from '@nestjs/common';
import { CompraService } from './compra.service';
import type { CreateCompraDto } from './dto/create-compra.dto';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  realizarCompra(@Body() createCompraDto: CreateCompraDto) {
    return this.compraService.realizarCompra(createCompraDto);
  }
}
