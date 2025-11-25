/*
  Warnings:

  - Added the required column `updatedAt` to the `Carrito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ItemCarrito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carrito" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DetalleVenta" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ItemCarrito" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
