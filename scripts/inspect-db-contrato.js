const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const c = await prisma.contratoAlquiler.findUnique({
    where: { id: '4ff8447c-0220-4aad-b5f8-affe46a777b3' },
    include: { items: { include: { equipo: true } } }
  });
  console.log('CONTRATO EN BD:');
  console.log(JSON.stringify(c, null, 2));
}

main().finally(() => prisma.$disconnect());
