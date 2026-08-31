const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const equipos = await prisma.equipo.findMany({
    select: { id: true, nombre: true, unidad: true }
  });
  console.log('Equipos con unidad:', equipos.map(e => ({ nombre: e.nombre, unidad: e.unidad })));
}

check().finally(() => prisma.$disconnect());
