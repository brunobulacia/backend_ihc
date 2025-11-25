/*
  Warnings:

  - You are about to drop the column `pagoId` on the `MetodoPago` table. All the data in the column will be lost.
  - Added the required column `metodoPagoId` to the `Pago` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MetodoPago" DROP CONSTRAINT "MetodoPago_pagoId_fkey";

-- AlterTable
ALTER TABLE "MetodoPago" DROP COLUMN "pagoId";

-- AlterTable
ALTER TABLE "Pago" ADD COLUMN     "metodoPagoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_metodoPagoId_fkey" FOREIGN KEY ("metodoPagoId") REFERENCES "MetodoPago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
