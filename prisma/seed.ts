import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Usuario de prueba
  const testUser = await prisma.user.upsert({
    where: { id: 'temp-user-id' },
    update: {},
    create: {
      id: 'temp-user-id',
      username: 'test_user',
      isActive: true,
    },
  });

  console.log('✅ Usuario de prueba creado:', testUser);

  // Productos de prueba
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
