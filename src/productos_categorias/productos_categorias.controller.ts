import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductosCategoriasService } from './productos_categorias.service';
import type { CreateProductosCategoriaDto } from './dto/create-productos_categoria.dto';
import type { UpdateProductosCategoriaDto } from './dto/update-productos_categoria.dto';

@Controller('productos-categorias')
export class ProductosCategoriasController {
  constructor(
    private readonly productosCategoriasService: ProductosCategoriasService,
  ) {}

  @Post()
  create(@Body() createProductosCategoriaDto: CreateProductosCategoriaDto) {
    return this.productosCategoriasService.create(createProductosCategoriaDto);
  }

  @Get()
  findAll() {
    return this.productosCategoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosCategoriasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductosCategoriaDto: UpdateProductosCategoriaDto,
  ) {
    return this.productosCategoriasService.update(
      id,
      updateProductosCategoriaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosCategoriasService.remove(id);
  }
}
