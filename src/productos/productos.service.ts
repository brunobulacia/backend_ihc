import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductoDto: CreateProductoDto) {
    return this.prismaService.producto.create({
      data: createProductoDto,
    });
  }

  findAll() {
    return this.prismaService.producto.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.producto.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateProductoDto: UpdateProductoDto) {
    return this.prismaService.producto.update({
      where: { id, isActive: true },
      data: updateProductoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.producto.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
  }

  //REALIZAR COMPRA SERVICES
  async verificarProductosYStock(
    productos: { productoId: string; cantidad: number }[],
  ) {
    const productIds = productos.map((producto) => producto.productoId);
    const foundProducts = await this.prismaService.producto.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
    });

    if (foundProducts.length !== productIds.length) {
      throw new NotFoundException(
        'Algunos productos no existen o no están disponibles',
      );
    }

    // Verificar si cantidad no sobrepasa el stock disponible
    const productosConStock = foundProducts.filter((producto) => {
      const productoEnPedido = productos.find(
        (p) => p.productoId === producto.id,
      );
      return producto.stock >= (productoEnPedido?.cantidad || 0);
    });

    if (productosConStock.length !== foundProducts.length) {
      throw new NotFoundException(
        'Algunos productos no tienen suficiente stock',
      );
    }

    return productos;
  }
}
