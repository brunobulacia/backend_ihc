import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UsersService } from 'src/users/users.service';
import { ProductosService } from 'src/productos/productos.service';
import { PedidosService } from 'src/pedidos/pedidos.service';
import { DetallePedidoService } from 'src/detalle_pedido/detalle_pedido.service';
import { PagosService } from 'src/pagos/pagos.service';
import { CarritosService } from 'src/carritos/carritos.service';
import { ItemsCarritoService } from 'src/items_carrito/items_carrito.service';

@Injectable()
export class CompraService {
  constructor(
    private readonly userService: UsersService,
    private readonly productoService: ProductosService,
    private readonly pedidoService: PedidosService,
    private readonly detallePedidoService: DetallePedidoService,
    private readonly pagoService: PagosService,
    private readonly carritosService: CarritosService,
    private readonly itemsCarritoService: ItemsCarritoService,
  ) {}

  async realizarCompra(createCompraDto: CreateCompraDto) {
    const { userId, direccion } = createCompraDto;

    // 1. VERIFICAR SI EL USUARIO EXISTE
    const usuario = await this.userService.findOne(userId);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // 2. BUSCAR EL CARRITO DEL USUARIO
    const carrito = await this.carritosService.findByUserId(userId);
    if (!carrito) {
      throw new NotFoundException('Usuario no tiene carrito');
    }

    // 3. OBTENER ITEMS DEL CARRITO
    const itemsCarrito = await this.itemsCarritoService.findByCarritoId(carrito.id);
    if (!itemsCarrito || itemsCarrito.length === 0) {
      throw new BadRequestException('Carrito vacío');
    }

    // 4. TRANSFORMAR ITEMS Y VERIFICAR PRODUCTOS
    const items = await Promise.all(
      itemsCarrito.map(async (item) => {
        const producto = await this.productoService.findOne(item.productoId);
        if (!producto) {
          throw new NotFoundException(`Producto ${item.productoId} no encontrado`);
        }
        return {
          productoId: producto.id,
          cantidad: item.cantidad,
          precioUnit: producto.precio, // Precio actual del producto
        };
      })
    );

    // 5. CALCULAR TOTAL DEL PEDIDO
    const totalPedido = items.reduce(
      (sum, item) => sum + item.cantidad * item.precioUnit,
      0
    );

    // 6. CREAR PEDIDO
    const createdPedido = await this.pedidoService.create({
      userId: usuario.id,
      estado: 'PENDIENTE',
      total: totalPedido,
      direccion,
    });

    // 7. CREAR DETALLES DEL PEDIDO
    await Promise.all(
      items.map((item) =>
        this.detallePedidoService.create({
          pedidoId: createdPedido.id,
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnit: item.precioUnit,
        })
      )
    );

    // 8. CREAR PAGO (simulado con QR)
    await this.pagoService.create({
      pedidoId: createdPedido.id,
      monto: totalPedido,
      metodo: 'QR',
    });

    // 9. LIMPIAR CARRITO DEL USUARIO
    await this.itemsCarritoService.deleteByCarritoId(carrito.id);

    // 10. RETORNAR CONFIRMACIÓN DE COMPRA
    return {
      message: 'Pedido creado exitosamente',
      pedidoId: createdPedido.id,
      total: totalPedido,
    };
  }
}
