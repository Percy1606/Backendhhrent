import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const terms = ['analizador de redes', 'dron', 'termografica', 'pinza', 'amperimetrica', 'camion', 'herramienta', 'telurometro'];
  const equipos = await prisma.equipo.findMany({ where: { tipo: 'ALQUILER' } });
  let updated = 0;
  for (const eq of equipos) {
    const searchStr = (eq.nombre + ' ' + eq.descripcion).toLowerCase();
    if (terms.some(t => searchStr.includes(t))) {
      await prisma.equipo.update({ where: { id: eq.id }, data: { destacado: true } });
      console.log('Marcado como destacado:', eq.nombre);
      updated++;
    }
  }
  console.log('Total actualizados:', updated);
}

main().catch(console.error).finally(() => prisma.$disconnect());