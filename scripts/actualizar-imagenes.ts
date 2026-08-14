import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🖼️ Asignando imágenes de alta definición por marca/familia...');

  // Bremas
  await prisma.equipo.updateMany({
    where: { marca: 'Bremas' },
    data: { imagenUrl: '/uploads/bremas_conmutador.jpg' },
  });

  // Alfa
  await prisma.equipo.updateMany({
    where: { marca: 'Alfa' },
    data: { imagenUrl: '/uploads/alfa_ventilador.jpg' },
  });

  // Eaton
  await prisma.equipo.updateMany({
    where: { marca: 'Eaton' },
    data: { imagenUrl: '/uploads/eaton_breaker.jpg' },
  });

  // Dehn
  await prisma.equipo.updateMany({
    where: { marca: 'Dehn' },
    data: { imagenUrl: '/uploads/dehn_dps.jpg' },
  });

  // E-safe
  await prisma.equipo.updateMany({
    where: { marca: 'E-safe Tableros PVC' },
    data: { imagenUrl: '/uploads/esafe_caja.jpg' },
  });

  console.log('✅ Imágenes actualizadas limpiamente en la base de datos.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
