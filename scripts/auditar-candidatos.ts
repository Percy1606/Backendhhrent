import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Auditando inconsistencias en la Base de Datos...');

  const padres = await prisma.equipo.findMany({
    where: { padreId: null },
    include: { variantes: true },
  });

  const candidatosDesglose = padres.filter((p) => p.variantes.length > 30);

  console.log(`\n⚠️  Encontrados ${candidatosDesglose.length} productos Padres con más de 30 variantes:`);
  for (const p of candidatosDesglose) {
    console.log(` - [${p.codigoInterno}] ${p.nombre} (${p.variantes.length} variantes)`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
