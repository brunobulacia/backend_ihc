import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import type { CreatePedidoDto } from './dto/create-pedido.dto';
import type { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.pedidosService.findAllByUser(userId);
    }
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(id);
  }

  // Endpoints para conductores
  @Post(':id/aceptar')
  aceptarPedido(
    @Param('id') id: string,
    @Body() body: { conductorId: string },
  ) {
    return this.pedidosService.aceptarPedido(id, body.conductorId);
  }

  @Post(':id/rechazar')
  rechazarPedido(
    @Param('id') id: string,
    @Body() body: { conductorId: string },
  ) {
    return this.pedidosService.rechazarPedido(id, body.conductorId);
  }

  @Post(':id/iniciar-viaje')
  iniciarViaje(
    @Param('id') id: string,
    @Body() body: { conductorId: string },
  ) {
    return this.pedidosService.iniciarViaje(id, body.conductorId);
  }

  @Post(':id/entregar')
  entregarPedido(
    @Param('id') id: string,
    @Body() body: { conductorId: string },
  ) {
    return this.pedidosService.entregarPedido(id, body.conductorId);
  }
}
