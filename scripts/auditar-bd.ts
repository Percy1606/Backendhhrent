import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const padres = await prisma.equipo.findMany({
    where: { padreId: null },
    include: {
      variantes: true,
    },
  });

  console.log(`=== AUDITORÍA DE PRODUCTOS PADRES Y VARIANTES ===`);
  console.log(`Total de Padres: ${padres.length}`);

  let totalVariantes = 0;
  for (const p of padres) {
    totalVariantes += p.variantes.length;
    console.log(`\n📌 [PADRE ID ${p.id}] ${p.codigoInterno} - ${p.nombre} (${p.marca})`);
    console.log(`   Categoría: ${p.categoria} | Variantes: ${p.variantes.length}`);
    if (p.variantes.length > 40) {
      console.log(`   ⚠️ ALERTA: Padre tiene demasiadas variantes (${p.variantes.length})! Conviene desglosarlo.`);
    }
  }

  console.log(`\n===================================`);
  console.log(`Total de Variantes registradas: ${totalVariantes}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
