import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.equipo.updateMany({ data: { destacado: false } });
  const terms = ['analizador de redes', 'dron termográfico', 'pistola', 'pinza amperimétrica', 'unidad móvil de equipos eléctricos', 'telurómetro digital prasek'];
  const equipos = await prisma.equipo.findMany();
  for (const eq of equipos) {
    const searchStr = eq.nombre.toLowerCase();
    if (terms.some(t => searchStr.includes(t))) {
      await prisma.equipo.update({ where: { id: eq.id }, data: { destacado: true } });
      console.log('Marcado:', eq.nombre);
    }
  }
}
main().finally(() => prisma.$disconnect());