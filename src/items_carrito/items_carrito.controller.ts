import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsCarritoService } from './items_carrito.service';
import { Logger } from '@nestjs/common';
import type { CreateItemsCarritoDto } from './dto/create-items_carrito.dto';
import type { UpdateItemsCarritoDto } from './dto/update-items_carrito.dto';

@Controller('items-carrito')
export class ItemsCarritoController {
  private readonly logger = new Logger(ItemsCarritoController.name);
  constructor(private readonly itemsCarritoService: ItemsCarritoService) {}

  @Post()
  async create(@Body() createItemsCarritoDto: CreateItemsCarritoDto) {
    this.logger.log('POST /items-carrito', JSON.stringify(createItemsCarritoDto));
    try {
      const result = await this.itemsCarritoService.create(createItemsCarritoDto);
      this.logger.log('ItemCarrito creado correctamente', JSON.stringify(result));
      return result;
    } catch (error) {
      this.logger.error('Error al crear ItemCarrito', error?.message, error?.stack);
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.itemsCarritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsCarritoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemsCarritoDto: UpdateItemsCarritoDto,
  ) {
    return this.itemsCarritoService.update(id, updateItemsCarritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsCarritoService.remove(id);
  }
}
