import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { UpdateConductoreDto } from './dto/update-conductore.dto';

@Controller('conductores')
export class ConductoresController {
  constructor(private readonly conductoresService: ConductoresService) {}

  @Get()
  findAll() {
    return this.conductoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conductoresService.findOne(id);
  }

  @Get(':id/pedido-pendiente')
  obtenerPedidoPendiente(@Param('id') id: string) {
    return this.conductoresService.obtenerPedidoPendiente(id);
  }

  @Put(':id/ubicacion')
  @HttpCode(HttpStatus.OK)
  actualizarUbicacion(
    @Param('id') id: string,
    @Body() body: { latitud: number; longitud: number },
  ) {
    return this.conductoresService.actualizarUbicacion(
      id,
      body.latitud,
      body.longitud,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConductoreDto: UpdateConductoreDto,
  ) {
    return this.conductoresService.update(id, updateConductoreDto);
  }
}
