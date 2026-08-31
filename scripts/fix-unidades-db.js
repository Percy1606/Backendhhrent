const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixUnidades() {
  console.log('Corrigiendo unidades mal guardadas como USD o PEN...');
  
  const updatedUSD = await prisma.equipo.updateMany({
    where: { unidad: 'USD' },
    data: { unidad: 'UND' }
  });

  const updatedPEN = await prisma.equipo.updateMany({
    where: { unidad: 'PEN' },
    data: { unidad: 'UND' }
  });

  console.log(`Corregidos ${updatedUSD.count} equipos que tenían unidad 'USD' a 'UND'.`);
  console.log(`Corregidos ${updatedPEN.count} equipos que tenían unidad 'PEN' a 'UND'.`);
}

fixUnidades().finally(() => prisma.$disconnect());
