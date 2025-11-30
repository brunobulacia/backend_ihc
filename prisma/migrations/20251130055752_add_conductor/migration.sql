-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "conductorId" TEXT,
ADD COLUMN     "conductoresRechazados" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "latitudDestino" DOUBLE PRECISION,
ADD COLUMN     "longitudDestino" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Conductor" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL DEFAULT -17.783300,
    "longitud" DOUBLE PRECISION NOT NULL DEFAULT -63.182140,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conductor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_conductorId_fkey" FOREIGN KEY ("conductorId") REFERENCES "Conductor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
