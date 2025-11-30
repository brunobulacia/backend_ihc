/*
  Warnings:

  - You are about to drop the column `estado` on the `Pago` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Pago` table. All the data in the column will be lost.
  - You are about to drop the column `metodoPagoId` on the `Pago` table. All the data in the column will be lost.
  - You are about to drop the column `ventaId` on the `Pago` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleVenta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MetodoPago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductoCategoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ventas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pedidoId]` on the table `Pago` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pedidoId` to the `Pago` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('PENDIENTE', 'ACEPTADO', 'RECOGIDO', 'EN_CAMINO', 'ENTREGADO', 'CANCELADO');

-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "DetalleVenta_productoId_fkey";

-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "DetalleVenta_ventaId_fkey";

-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_metodoPagoId_fkey";

-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_ventaId_fkey";

-- DropForeignKey
ALTER TABLE "ProductoCategoria" DROP CONSTRAINT "ProductoCategoria_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "ProductoCategoria" DROP CONSTRAINT "ProductoCategoria_productoId_fkey";

-- DropForeignKey
ALTER TABLE "Ventas" DROP CONSTRAINT "Ventas_userId_fkey";

-- DropIndex
DROP INDEX "Pago_ventaId_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Pago" DROP COLUMN "estado",
DROP COLUMN "isActive",
DROP COLUMN "metodoPagoId",
DROP COLUMN "ventaId",
ADD COLUMN     "metodo" TEXT NOT NULL DEFAULT 'QR',
ADD COLUMN     "pedidoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- DropTable
DROP TABLE "Categoria";

-- DropTable
DROP TABLE "DetalleVenta";

-- DropTable
DROP TABLE "MetodoPago";

-- DropTable
DROP TABLE "ProductoCategoria";

-- DropTable
DROP TABLE "Ventas";

-- DropEnum
DROP TYPE "EstadoPago";

-- DropEnum
DROP TYPE "EstadoVenta";

-- DropEnum
DROP TYPE "Metodo";

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "estado" "EstadoPedido" NOT NULL DEFAULT 'PENDIENTE',
    "total" DOUBLE PRECISION NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetallePedido" (
    "id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnit" DOUBLE PRECISION NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetallePedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pago_pedidoId_key" ON "Pago"("pedidoId");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
