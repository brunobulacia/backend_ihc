/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `Ventas` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Ventas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ventas" DROP CONSTRAINT "Ventas_chatId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ventas" DROP COLUMN "chatId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
