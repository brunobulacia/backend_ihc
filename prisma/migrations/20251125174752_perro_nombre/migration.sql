/*
  Warnings:

  - You are about to drop the column `userId` on the `Ventas` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Ventas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ventas" DROP CONSTRAINT "Ventas_userId_fkey";

-- AlterTable
ALTER TABLE "Ventas" DROP COLUMN "userId",
ADD COLUMN     "chatId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
