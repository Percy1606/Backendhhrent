import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTOS_DEHN_SENAL = [
  {
    codigoInterno: '4017851',
    modelo: '920300',
    nombre: 'Base para Módulo DPS de Señal sin Desconexión BXT BAS (BLITZDUCTOR XT)',
    marca: 'Dehn',
    precio: 77.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo base pasivo universal de 4 polos para módulos de protección enchufables BLITZDUCTOR XT. Permite cambio de módulo sin interrupción de señal (LifeCheck integrado). Montaje en Riel DIN 35mm.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4018809',
    modelo: '920271',
    nombre: 'Cartucho DPS Señal Tipo 1+2 para Redes Profibus DP 2 Hilos (BXT ML2 BD HF 5)',
    marca: 'Dehn',
    precio: 280.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo enchufable de protección combinada contra rayos y sobretensiones Tipo 1 + Tipo 2 (D1/C2) para buses de campo de alta frecuencia Profibus DP y RS485. 2 hilos / 1 par, desacoplamiento galvánico óptimo.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4018654',
    modelo: '920222',
    nombre: 'Cartucho DPS Señal Tipo 1+2 2 Hilos Un=12V (BXT ML2 BE 12)',
    marca: 'Dehn',
    precio: 268.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo enchufable de protección combinada Tipo 1 + Tipo 2 para 2 señales analógicas o digitales con potencial de referencia común (BE). Tensión nominal Un=12V DC.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4018898',
    modelo: '920244',
    nombre: 'Cartucho DPS Señal Tipo 1+2 2 Hilos Un=24V Analógico (BXT ML2 BD 24)',
    marca: 'Dehn',
    precio: 250.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo de protección Tipo 1 + Tipo 2 para 1 par aislado galvánicamente (bucle de corriente 4-20mA, señales analógicas de 24V). Tensión nominal Un=24V DC.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4017852',
    modelo: '920224',
    nombre: 'Cartucho DPS Señal Tipo 1+2 2 Hilos Un=24V Digital (BXT ML2 BE 24)',
    marca: 'Dehn',
    precio: 264.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo enchufable Tipo 1 + Tipo 2 para 2 señales digitales con masa común (señales binarias 24V DC de control y PLC).',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4022072',
    modelo: '920320',
    nombre: 'Cartucho DPS Señal Tipo 1+2 4 Hilos Un=5V (BXT ML4 BE 5)',
    marca: 'Dehn',
    precio: 405.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo de protección combinada Tipo 1 + Tipo 2 para 4 señales de bajo voltaje TTL/CMOS de 5V DC con potencial de referencia común.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4017848',
    modelo: '920344',
    nombre: 'Cartucho DPS Señal Tipo 1+2 4 Hilos Un=24V Analógico (BXT ML4 BD 24)',
    marca: 'Dehn',
    precio: 376.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo enchufable Tipo 1 + Tipo 2 para 2 pares aislados galvánicamente (hasta 2 canales analógicos de 4-20mA / 0-10V en un solo módulo). Tensión nominal Un=24V DC.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4019598',
    modelo: '920324',
    nombre: 'Cartucho DPS Señal Tipo 1+2 4 Hilos Un=24V Digital (BXT ML4 BE 24)',
    marca: 'Dehn',
    precio: 397.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo enchufable Tipo 1 + Tipo 2 para 4 señales digitales de 24V con masa común (alta densidad de puntos de I/O de PLC en 1 módulo DIN).',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4017849',
    modelo: '920327',
    nombre: 'Cartucho DPS Señal Tipo 1+2 4 Hilos Un=180V (BXT ML4 BE 180)',
    marca: 'Dehn',
    precio: 405.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo enchufable Tipo 1 + Tipo 2 para 4 señales de alta impedancia o líneas de telecomunicaciones y control de hasta 180V.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4018897',
    modelo: '920389',
    nombre: 'Cartucho DPS Señal Tipo 1+2 4 Hilos Un=250V (BXT ML4 BD 250)',
    marca: 'Dehn',
    precio: 405.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Módulo enchufable Tipo 1 + Tipo 2 para 2 pares diferenciales en circuitos de control y señalización de hasta 250V AC/DC.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4019883',
    modelo: '929941',
    nombre: 'Supresor DPS de Campo para Transmisor 2 Hilos Un=24V Rosca M20 (DEHNpipe)',
    marca: 'Dehn',
    precio: 319.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador de sobretensiones en carcasa de acero inoxidable para montaje directo roscado (M20x1.5) en cabezales de transmisores de presión, flujo o temperatura de 2 hilos (4-20mA). Grado IP67.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4019732',
    modelo: '929970',
    nombre: 'Supresor DPS de Campo 4+1 Hilos Un=24V 120/250V Rosca NPT (DEHNpipe)',
    marca: 'Dehn',
    precio: 536.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador de campo para instrumentación multihilo con rosca 1/2" NPT. Protección combinada de alimentación (120/250V) y señales de 24V en envolvente robusta de acero inoxidable.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4020656',
    modelo: '929951',
    nombre: 'Supresor DPS de Campo 4+1 Hilos Un=24V / 24V Rosca NPT (DEHNpipe)',
    marca: 'Dehn',
    precio: 377.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Descargador de campo para sensores e instrumentos de 4 hilos (alimentación 24V + señal 24V) con conexión 1/2" NPT y protección IP67.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4017740',
    modelo: '929121',
    nombre: 'Supresor DPS Señal Ethernet RJ45 Cat 6 / Clase E PoE+ (DEHNpatch)',
    marca: 'Dehn',
    precio: 274.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Dispositivo de protección contra sobretensiones para redes de datos Gigabit Ethernet (1000Base-T), Cat 6 / Clase E y alimentación sobre Ethernet Power-over-Ethernet (PoE / PoE+). Conectores hembra RJ45 apantallados.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    codigoInterno: '4019884',
    modelo: '924017',
    nombre: 'Supresor DPS Señal Sub-D 9 Pines Profibus DP (DEHNconnect)',
    marca: 'Dehn',
    precio: 367.00,
    unidad: 'USD',
    categoria: 'Supresores de Señal y Datos',
    subfamiliaNombre: 'Supresores de Sobretensión (DPS)',
    descripcion: 'Adaptador de protección contra sobretensiones con conector Sub-D de 9 polos macho/hembra para interfaces de comunicación Profibus DP, RS485 o Modbus RTU en PLCs y paneles de control.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
];

async function main() {
  console.log('🚀 Iniciando importación de 15 supresores de señal y datos DEHN para Venta...');

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

  // 3. Upsert de cada producto Dehn Señal
  let creados = 0;
  for (const prod of PRODUCTOS_DEHN_SENAL) {
    await prisma.equipo.upsert({
      where: { codigoInterno: prod.codigoInterno },
      update: {
        nombre: prod.nombre,
        modelo: prod.modelo,
        marca: prod.marca,
        precio: prod.precio,
        unidad: prod.unidad,
        tipo: TipoTransaccion.VENTA,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        categoria: prod.categoria,
        descripcion: prod.descripcion,
        imagenUrl: prod.imagenUrl,
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
        unidad: prod.unidad,
        tipo: TipoTransaccion.VENTA,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        categoria: prod.categoria,
        descripcion: prod.descripcion,
        imagenUrl: prod.imagenUrl,
        ubicacion: 'Almacén Central',
        familiaId: familia.id,
        subfamiliaId: subfamilia.id,
      },
    });

    console.log(`  ✅ [${prod.codigoInterno}] ${prod.nombre} - USD $ ${prod.precio}`);
    creados++;
  }

  console.log(`\n🎉 Total de supresores de señal Dehn importados con éxito: ${creados}`);
}

main()
  .catch((e) => {
    console.error('❌ Error en importación Dehn Señal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
