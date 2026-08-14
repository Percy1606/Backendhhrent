import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Actualizando unidades monetarias en la base de datos...');

  const rDehn = await prisma.equipo.updateMany({
    where: { marca: 'Dehn' },
    data: { unidad: 'USD' },
  });
  console.log(`✅ ${rDehn.count} productos DEHN actualizados a USD`);

  const rAlfa = await prisma.equipo.updateMany({
    where: { marca: 'Alfa' },
    data: { unidad: 'PEN' },
  });
  console.log(`✅ ${rAlfa.count} productos ALFA actualizados a PEN (Soles)`);

  const rBremas = await prisma.equipo.updateMany({
    where: { marca: 'Bremas' },
    data: { unidad: 'PEN' },
  });
  console.log(`✅ ${rBremas.count} productos BREMAS actualizados a PEN (Soles)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
