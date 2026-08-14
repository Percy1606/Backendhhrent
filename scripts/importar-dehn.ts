import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTOS_DEHN = [
  // --- TIPO 1 (T1) ---
  {
    codigoInterno: '4017853',
    modelo: '961135',
    nombre: 'Supresor de Transitorios DPS Tipo 1 (T1) 1P 25kA Uc=320V FM (DEHNbloc)',
    marca: 'Dehn',
    precio: 573.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador de corriente de rayo y sobretensiones transitorias Tipo 1 (T1 / Clase I) unipolar 1P. Capacidad de descarga Iimp=25kA (10/350 µs), tensión máxima continua Uc=320V AC. Con contacto de señalización remota (FM). Tecnología de vía de chispas no exhaustiva.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4019890',
    modelo: '961175',
    nombre: 'Supresor de Transitorios DPS Tipo 1 (T1) 1P 25kA Uc=760V FM (DEHNbloc)',
    marca: 'Dehn',
    precio: 891.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador de sobretensión Tipo 1 (T1 / Clase I) unipolar 1P para tensiones elevadas. Capacidad Iimp=25kA (10/350 µs), tensión máxima continua Uc=760V AC. Incluye contacto libre de potencial FM para monitoreo remoto.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },

  // --- TIPO 2 (T2) ---
  {
    codigoInterno: '4017850',
    modelo: '952078',
    nombre: 'Supresor de Sobretensión DPS Tipo 2 (T2) 1P 25kA Uc=48V (DEHNguard)',
    marca: 'Dehn',
    precio: 162.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Dispositivo de protección contra sobretensiones transitorias Tipo 2 (T2 / Clase II) unipolar 1P para sistemas de baja tensión. Imax=25kA (8/20 µs), tensión máxima Uc=48V AC/DC. Módulo de protección enchufable con varistor de óxido metálico.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4017854',
    modelo: '952093',
    nombre: 'Supresor de Sobretensión DPS Tipo 2 (T2) 1P 40kA Uc=320V FM (DEHNguard)',
    marca: 'Dehn',
    precio: 188.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador de sobretensiones transitorias Tipo 2 (T2 / Clase II) 1P. Capacidad máxima Imax=40kA (8/20 µs), In=20kA, tensión Uc=320V AC. Con contacto de señalización remota (FM) y módulo enchufable con desconectador térmico.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4020044',
    modelo: '952096',
    nombre: 'Supresor de Sobretensión DPS Tipo 2 (T2) 1P 30kA Uc=600V FM (DEHNguard)',
    marca: 'Dehn',
    precio: 188.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador de sobretensiones transitorias Tipo 2 (T2 / Clase II) 1P para redes trifásicas de 480/600V. Imax=30kA, In=15kA, Uc=600V AC con contacto de estado remoto FM.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4020659',
    modelo: '950102',
    nombre: 'Supresor de Sobretensión DPS Tipo 2 (T2) 1P 30kA Uc=1000V (DEHNguard)',
    marca: 'Dehn',
    precio: 265.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador de sobretensión Tipo 2 unipolar de alta tensión para aplicaciones solares fotovoltaicas y de potencia. Imax=30kA, Uc=1000V DC/AC.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },

  // --- TIPO 3 (T3) ---
  {
    codigoInterno: '4019608',
    modelo: '953204',
    nombre: 'Supresor de Sobretensión Fina DPS Tipo 3 (T3) TN 2kA Uc=150V (DEHNrail)',
    marca: 'Dehn',
    precio: 185.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Protección fina para equipos terminales y electrónica sensible Tipo 3 (T3 / Clase III) para sistemas TN. Corriente nominal In=2kA, tensión máxima continua Uc=150V AC/DC. Montaje en Riel DIN.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4018811',
    modelo: '953209',
    nombre: 'Supresor de Sobretensión Fina DPS Tipo 3 (T3) TN 2kA Uc=150V FM (DEHNrail)',
    marca: 'Dehn',
    precio: 213.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Protección fina Tipo 3 (T3) para equipos electrónicos en sistemas TN. In=2kA, Uc=150V con contacto de señalización remota FM libre de potencial.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4019441',
    modelo: '953200',
    nombre: 'Supresor de Sobretensión Fina DPS Tipo 3 (T3) TN 3kA Uc=255V (DEHNrail)',
    marca: 'Dehn',
    precio: 185.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Protección fina Tipo 3 (T3 / Clase III) para 230V estándar. In=3kA, Uc=255V AC. Protección coordinada de 2 polos para sistemas de alimentación monofásicos.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4020882',
    modelo: '953205',
    nombre: 'Supresor de Sobretensión Fina DPS Tipo 3 (T3) TN 3kA Uc=255V FM (DEHNrail)',
    marca: 'Dehn',
    precio: 213.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Protección fina Tipo 3 (T3 / Clase III) para 230V estándar con contacto FM. In=3kA, Uc=255V AC. Módulo de 2 piezas enchufable.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },

  // --- COMBINADOS T1+T2 MODULARES (DEHNcombo / DEHNvap / DEHNguard) ---
  {
    codigoInterno: '4024530',
    modelo: '951115',
    nombre: 'Supresor Combinado DPS Tipo 1+2 (T1+T2) 2P TT 50kA Uc=255V FM (DEHNventil)',
    marca: 'Dehn',
    precio: 1490.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador combinado de corriente de rayo y sobretensión Tipo 1 + Tipo 2 (T1+T2 / Clase I+II) para sistemas monofásicos TT y TN (circuito 1+1). Iimp=50kA (10/350 µs), Uc=255V con contacto FM.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4024531',
    modelo: '951305',
    nombre: 'Supresor Combinado DPS Tipo 1+2 (T1+T2) 3P TN-C 75kA Uc=255V FM (DEHNventil)',
    marca: 'Dehn',
    precio: 2022.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador combinado de corriente de rayo y sobretensión Tipo 1 + Tipo 2 trifásico para redes TN-C (3P). Corriente de rayo total Itotal=75kA (10/350 µs), Iimp=25kA por polo, Uc=255V con contacto FM.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4021731',
    modelo: '951315',
    nombre: 'Supresor Combinado DPS Tipo 1+2 (T1+T2) 4P TT 100kA Uc=255V FM (DEHNventil)',
    marca: 'Dehn',
    precio: 2817.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador combinado de máxima capacidad Tipo 1 + Tipo 2 trifásico + neutro para redes TT y TN-S (circuito 3+1). Corriente de rayo total Itotal=100kA (10/350 µs), Uc=255V con contacto de señalización remota FM.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },

  // --- COMBINADOS COMPACTOS (DEHNcombo) ---
  {
    codigoInterno: '4024317',
    modelo: '941110',
    nombre: 'Supresor Combinado Compacto DPS Tipo 1+2 (T1+T2) 2P TT 25kA Uc=255V',
    marca: 'Dehn',
    precio: 653.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador compacto combinado Tipo 1 + Tipo 2 en un solo cuerpo. 2 Polos para redes TT monofásicas (1+1). Capacidad Iimp=25kA (10/350 µs), Uc=255V AC.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4021451',
    modelo: '941200',
    nombre: 'Supresor Combinado Compacto DPS Tipo 1+2 (T1+T2) 2P TN 25kA Uc=255V',
    marca: 'Dehn',
    precio: 580.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador compacto combinado Tipo 1 + Tipo 2 de 2 Polos para redes TN. Capacidad Iimp=25kA (10/350 µs), Uc=255V AC.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4020888',
    modelo: '941310',
    nombre: 'Supresor Combinado Compacto DPS Tipo 1+2 (T1+T2) 4P TT 50kA Uc=255V',
    marca: 'Dehn',
    precio: 1160.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador compacto combinado Tipo 1 + Tipo 2 trifásico + neutro (4P / 3+1) para redes TT de 230/400V. Itotal=50kA (10/350 µs), Uc=255V.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4022723',
    modelo: '941400',
    nombre: 'Supresor Combinado Compacto DPS Tipo 1+2 (T1+T2) 4P TN-S 50kA Uc=255V',
    marca: 'Dehn',
    precio: 1088.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador compacto combinado Tipo 1 + Tipo 2 de 4 polos para sistemas trifásicos TN-S de 230/400V. Itotal=50kA (10/350 µs), Uc=255V.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4024532',
    modelo: '941300',
    nombre: 'Supresor Combinado Compacto DPS Tipo 1+2 (T1+T2) 3P TN-C 37.5kA Uc=255V',
    marca: 'Dehn',
    precio: 839.00,
    categoria: 'Supresores de Transitorios',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador compacto combinado Tipo 1 + Tipo 2 trifásico de 3 polos para redes TN-C. Itotal=37.5kA (10/350 µs), Iimp=12.5kA por polo, Uc=255V.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
];

async function main() {
  console.log('🚀 Iniciando importación de 18 supresores de fuerza DEHN para Venta...');

  // 1. Obtener o crear la Familia "Equipos Especiales"
  let familia = await prisma.familia.findUnique({
    where: { nombre: 'Equipos Especiales' },
  });

  if (!familia) {
    familia = await prisma.familia.create({
      data: {
        nombre: 'Equipos Especiales',
        descripcion: 'Equipos especializados: supresores de sobretensión DPS, conmutadores, climatización, subestaciones, transformadores, celdas de MT.',
      },
    });
  }

  // 2. Subfamilia para DPS
  let subfamilia = await prisma.subfamilia.findUnique({
    where: {
      familiaId_nombre: {
        familiaId: familia.id,
        nombre: 'Supresores de Sobretensión (DPS)',
      },
    },
  });

  if (!subfamilia) {
    subfamilia = await prisma.subfamilia.create({
      data: {
        nombre: 'Supresores de Sobretensión (DPS)',
        familiaId: familia.id,
      },
    });
  }

  // 3. Upsert de cada producto Dehn
  let creados = 0;
  for (const prod of PRODUCTOS_DEHN) {
    await prisma.equipo.upsert({
      where: { codigoInterno: prod.codigoInterno },
      update: {
        nombre: prod.nombre,
        modelo: prod.modelo,
        marca: prod.marca,
        precio: prod.precio,
        tipo: TipoTransaccion.VENTA,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        categoria: prod.categoria,
        descripcion: prod.descripcion,
        imagenUrl: prod.imagenUrl,
        unidad: 'Unidad',
        ubicacion: 'Almacén Central',
        familiaId: familia.id,
        subfamiliaId: subfamilia.id,
      },
      create: {
        codigoInterno: prod.codigoInterno,
        nombre: prod.nombre,
        modelo: prod.modelo,
        marca: prod.marca,
        precio: prod.precio,
        tipo: TipoTransaccion.VENTA,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        categoria: prod.categoria,
        descripcion: prod.descripcion,
        imagenUrl: prod.imagenUrl,
        unidad: 'Unidad',
        ubicacion: 'Almacén Central',
        familiaId: familia.id,
        subfamiliaId: subfamilia.id,
      },
    });

    console.log(`  ✅ [${prod.codigoInterno}] ${prod.nombre} - USD $ ${prod.precio}`);
    creados++;
  }

  console.log(`\n🎉 Total de supresores Dehn importados con éxito: ${creados}`);
}

main()
  .catch((e) => {
    console.error('❌ Error en importación Dehn:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
