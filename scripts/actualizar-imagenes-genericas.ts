import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🖼️ Actualizando imágenes con nombres genéricos específicos por producto...');

  // Interruptores 0-1
  await prisma.equipo.updateMany({
    where: { codigoInterno: { in: ['BREMAS-INT-01-1P2P', 'BREMAS-INT-01-3P4P'] } },
    data: { imagenUrl: '/uploads/selector_rotativo.jpg' },
  });

  // Hijos de interruptores 0-1
  await prisma.equipo.updateMany({
    where: {
      padre: {
        codigoInterno: { in: ['BREMAS-INT-01-1P2P', 'BREMAS-INT-01-3P4P'] },
      },
    },
    data: { imagenUrl: '/uploads/selector_rotativo.jpg' },
  });

  // Inversores de marcha
  await prisma.equipo.updateMany({
    where: { codigoInterno: 'BREMAS-INV-MARCHA' },
    data: { imagenUrl: '/uploads/inversor_marcha.jpg' },
  });

  // Hijos de inversores de marcha
  await prisma.equipo.updateMany({
    where: {
      padre: {
        codigoInterno: 'BREMAS-INV-MARCHA',
      },
    },
    data: { imagenUrl: '/uploads/inversor_marcha.jpg' },
  });

  console.log('✅ Imágenes genéricas de interruptores e inversores actualizadas.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
