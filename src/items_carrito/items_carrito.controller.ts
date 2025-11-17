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
import type { CreateItemsCarritoDto } from './dto/create-items_carrito.dto';
import type { UpdateItemsCarritoDto } from './dto/update-items_carrito.dto';

@Controller('items-carrito')
export class ItemsCarritoController {
  constructor(private readonly itemsCarritoService: ItemsCarritoService) {}

  @Post()
  create(@Body() createItemsCarritoDto: CreateItemsCarritoDto) {
    return this.itemsCarritoService.create(createItemsCarritoDto);
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
