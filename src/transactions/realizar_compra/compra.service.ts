import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UsersService } from 'src/users/users.service';
import { ProductosService } from 'src/productos/productos.service';
import { CarritosService } from 'src/carritos/carritos.service';
import { ItemsCarritoService } from 'src/items_carrito/items_carrito.service';
import { VentasService } from 'src/ventas/ventas.service';
import { DetalleVentaService } from 'src/detalle_venta/detalle_venta.service';

@Injectable()
export class CompraService {
  constructor(
    private readonly userService: UsersService,
    private readonly productoService: ProductosService,
    private readonly carritoService: CarritosService,
    private readonly itemsCarritoService: ItemsCarritoService,
    private readonly ventaService: VentasService,
    private readonly detalleVentaService: DetalleVentaService,
  ) {}

  async realizarCompra(createCompraDto: CreateCompraDto) {
    //1. VERIFICAR SI EL USUARIO EXISTE
    const usuario = await this.userService.findOne(createCompraDto.userId);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // 2. VERIFICAR SI LOS PRODUCTOS EXISTEN Y SI TIENEN STOCK
    const productos = await this.productoService.verificarProductosYStock(
      createCompraDto.productos,
    );

    // 3. CREAR CARRITO SI LOS PRODUCTOS SON VALIDOS Y TIENEN STOCK
    const carrito = await this.carritoService.create({ userId: usuario.id });

    // 4. AGREGAR PRODUCTOS AL CARRITO
    for (const producto of createCompraDto.productos) {
      await this.itemsCarritoService.create({
        carritoId: carrito.id,
        productoId: producto.productoId,
        cantidad: producto.cantidad,
      });
    }

    // 4.1. CALCULAR TOTAL DE LA VENTA (YA ME DIÓ PAJA)
    let totalVenta = 0;

    // 5. CREAR VENTA CON EL MONTO TOTAL
    const createdVenta = await this.ventaService.create({
      userId: usuario.id,
      estado: 'PENDIENTE',
      total: totalVenta,
    });

    // 6. CREAR EL DETALLE DE VENTA CON LA VENTA CREADA (YA ME DIÓ PAJA)
    for (const producto of createCompraDto.productos) {
    }

    // 7. ACTUALIZAR EL MONTO TOTAL EN LA VENTA
    await this.ventaService.update(createdVenta.id, { total: totalVenta });

    // 8. RETORNAR CONFIRMACIÓN DE COMPRA
    return {
      message: 'Procede a pagar la compra',
      ventaId: createdVenta.id,
      total: totalVenta,
    };
  }
}
