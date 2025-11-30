import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // Productos de prueba (solo si no existen)
  const productosCount = await prisma.producto.count();
  
  if (productosCount === 0) {
    const productos = [
      {
        nombre: 'Hamburguesa Clásica',
        descripcion: 'Hamburguesa con carne, lechuga, tomate y queso',
        precio: 25.0,
        isActive: true,
      },
      {
        nombre: 'Pizza Margarita',
        descripcion: 'Pizza con salsa de tomate, mozzarella y albahaca',
        precio: 35.0,
        isActive: true,
      },
      {
        nombre: 'Papas Fritas',
        descripcion: 'Papas fritas crujientes',
        precio: 10.0,
        isActive: true,
      },
      {
        nombre: 'Refresco Cola',
        descripcion: 'Bebida gaseosa 500ml',
        precio: 5.0,
        isActive: true,
      },
    ];

    for (const producto of productos) {
      await prisma.producto.create({
        data: producto,
      });
    }

    console.log('✅ Productos de prueba creados');
  } else {
    console.log('⏭️  Productos ya existen, saltando...');
  }

  // Conductores hardcodeados (tachero-1 y tachero-2)
  // Ubicaciones iniciales cerca de la Catedral de Santa Cruz
  const conductor1 = await prisma.conductor.upsert({
    where: { id: 'tachero-1' },
    update: {},
    create: {
      id: 'tachero-1',
      nombre: 'Tachero 1',
      latitud: -17.783300,
      longitud: -63.182140,
      disponible: true,
    },
  });

  const conductor2 = await prisma.conductor.upsert({
    where: { id: 'tachero-2' },
    update: {},
    create: {
      id: 'tachero-2',
      nombre: 'Tachero 2',
      latitud: -17.783300,
      longitud: -63.182140,
      disponible: true,
    },
  });

  console.log('✅ Conductores creados:', conductor1.nombre, conductor2.nombre);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
