import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE VALDINOX - BANDEJAS DE REJILLA Y ACCESORIOS CON VARIANTES
// =========================================================================

interface VarianteItem {
  codigoInterno: string;
  modelo: string;
  varianteNombre: string;
  precio: number;
}

interface GrupoProductoPadre {
  codigoPadre: string;
  nombre: string;
  marca: string;
  categoria: string;
  familia: string;
  subfamilia: string;
  tipo: TipoTransaccion;
  unidad: string;
  descripcion: string;
  imagenUrl: string;
  variantes: VarianteItem[];
}

const GRUPOS_VALDINOX: GrupoProductoPadre[] = [
  // 1. BANDEJAS EASYCONNECT
  {
    codigoPadre: 'VALDINOX-BANDEJA-EC',
    nombre: 'Bandeja de Rejilla EasyConnect (3M)',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Bandeja de rejilla metálica con sistema de rápida conexión EasyConnect (tramo de 3 metros). Excelente ventilación e instalación ágil para conducción de cables.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016912', modelo: 'EC60.400EZ', varianteNombre: 'Alto 60mm x Ancho 400mm (3m) EZ', precio: 102.69 },
      { codigoInterno: '4016913', modelo: 'EC100.200EZ', varianteNombre: 'Alto 100mm x Ancho 200mm (3m) EZ', precio: 90.06 },
      { codigoInterno: '4016915', modelo: 'EC100.400EZ', varianteNombre: 'Alto 100mm x Ancho 400mm (3m) EZ', precio: 149.00 },
      { codigoInterno: '4016916', modelo: 'EC100.500EZ', varianteNombre: 'Alto 100mm x Ancho 500mm (3m) EZ', precio: 166.80 },
    ],
  },
  // 2. SOPORTE OMEGA CLIC PARED SG
  {
    codigoPadre: 'VALDINOX-SOPORTE-OMEGA',
    nombre: 'Soporte Omega Clic a Pared SG',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Soporte tipo Omega con sistema de acople Clic para fijación de bandejas de rejilla a pared (acabado SG).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016917', modelo: 'SOC10SG', varianteNombre: 'Ancho 100 mm SG', precio: 10.98 },
      { codigoInterno: '4016918', modelo: 'SOC20SG', varianteNombre: 'Ancho 200 mm SG', precio: 13.95 },
      { codigoInterno: '4016919', modelo: 'SOC30SG', varianteNombre: 'Ancho 300 mm SG', precio: 16.27 },
      { codigoInterno: '4016920', modelo: 'SOC40SG', varianteNombre: 'Ancho 400 mm SG', precio: 18.38 },
    ],
  },
  // 3. SOPORTE A PARED REFORZADO CLIC SG
  {
    codigoPadre: 'VALDINOX-SOPORTE-REFORZADO',
    nombre: 'Soporte a Pared Reforzado Clic SG',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Soporte reforzado para cargas pesadas en pared con fijación rápida Clic para bandejas de rejilla Valdinox.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016921', modelo: 'SE100SG', varianteNombre: 'Ancho 100 mm SG', precio: 16.61 },
      { codigoInterno: '4016922', modelo: 'SE200SG', varianteNombre: 'Ancho 200 mm SG', precio: 21.27 },
      { codigoInterno: '4016923', modelo: 'SE300SG', varianteNombre: 'Ancho 300 mm SG', precio: 27.29 },
      { codigoInterno: '4016924', modelo: 'SE400SG', varianteNombre: 'Ancho 400 mm SG', precio: 35.61 },
      { codigoInterno: '4016925', modelo: 'SE500SG', varianteNombre: 'Ancho 500 mm SG', precio: 41.55 },
    ],
  },
  // 4. CONECTOR MCLIC ZF
  {
    codigoPadre: 'VALDINOX-CONECTOR-MCLIC',
    nombre: 'Conector MClic ZF para Bandeja de Rejilla',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conector de unión sin tornillos MClic con acabado Zinc-Flake (ZF) para varillas de rejilla.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016931', modelo: 'MCLIC-ZF - 3,9', varianteNombre: 'Para varilla Ø 3.90 mm ZF', precio: 1.63 },
      { codigoInterno: '4016932', modelo: 'MCLIC-ZF - 4,3', varianteNombre: 'Para varilla Ø 4.30 mm ZF', precio: 1.63 },
      { codigoInterno: '4016933', modelo: 'MCLIC-ZF - 4,8', varianteNombre: 'Para varilla Ø 4.80 mm ZF', precio: 1.63 },
    ],
  },
  // 5. PRODUCTOS INDIVIDUALES / ACCESORIOS
  {
    codigoPadre: 'VALDINOX-TAPA-100SG',
    nombre: 'Tapa para Bandeja de 100mm - Largo 2M SG',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Tapa de protección para bandeja de 100 mm de ancho, tramo de 2 metros (acabado SG).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016926', modelo: 'T100SG', varianteNombre: 'Tapa 100mm x 2m SG', precio: 29.61 },
    ],
  },
  {
    codigoPadre: 'VALDINOX-SALIDA-CABLES',
    nombre: 'Salida de Cables SC-SG',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Accesorio de protección y guiado para salida de cables en bandejas portacables de rejilla.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016928', modelo: 'SC-SG', varianteNombre: 'Salida de Cables SC-SG', precio: 17.93 },
    ],
  },
  {
    codigoPadre: 'VALDINOX-UNION-UNIVERSAL',
    nombre: 'Unión Universal 3 Piezas EZ',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conjunto de unión universal de 3 piezas electrozincado EZ para acoplamiento de bandejas de rejilla.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016929', modelo: 'UU-EZ', varianteNombre: 'Unión Universal 3 Piezas EZ', precio: 2.03 },
    ],
  },
  {
    codigoPadre: 'VALDINOX-SUSPENSION-CENTRAL',
    nombre: 'Suspensión Central Ø 8 EZ',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Pieza de suspensión central para varilla roscada Ø 8 mm EZ para suspensión de bandejas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016930', modelo: 'SC8EZ', varianteNombre: 'Suspensión Central Ø 8 EZ', precio: 2.18 },
    ],
  },
  {
    codigoPadre: 'VALDINOX-BORNE-TIERRA',
    nombre: 'Borne a Tierra MAT',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Borne de puesta a tierra MAT para derivación y continuidad eléctrica en bandejas de rejilla.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016934', modelo: 'MAT', varianteNombre: 'Borne a Tierra MAT', precio: 6.84 },
    ],
  },
  {
    codigoPadre: 'VALDINOX-TAG-ETIQUETA',
    nombre: 'Tag Etiqueta para Bandeja EC',
    marca: 'Valdinox',
    categoria: 'Bandejas Portacables',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Bandejas de Rejilla',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Placa / Tag de señalización e identificación plástica para bandejas de rejilla EasyConnect.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4016935', modelo: 'PLASTIC', varianteNombre: 'Tag Etiqueta Plástica EC', precio: 2.24 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación y estructuración de productos Valdinox con Variantes...');

  // 1. Obtener o crear la Familia "Canalizaciones y Bandejas"
  let familia = await prisma.familia.findUnique({
    where: { nombre: 'Canalizaciones y Bandejas' },
  });

  if (!familia) {
    familia = await prisma.familia.create({
      data: {
        nombre: 'Canalizaciones y Bandejas',
        descripcion: 'Bandejas de rejilla, bandejas portacables, soportes y accesorios de canalización.',
      },
    });
  }

  // 2. Subfamilia para Bandejas de Rejilla
  let subfamilia = await prisma.subfamilia.findUnique({
    where: {
      familiaId_nombre: {
        familiaId: familia.id,
        nombre: 'Bandejas de Rejilla',
      },
    },
  });

  if (!subfamilia) {
    subfamilia = await prisma.subfamilia.create({
      data: {
        nombre: 'Bandejas de Rejilla',
        familiaId: familia.id,
      },
    });
  }

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_VALDINOX) {
    // A. Crear o actualizar el Producto Padre (Modelo Principal)
    const padre = await prisma.equipo.upsert({
      where: { codigoInterno: grupo.codigoPadre },
      update: {
        nombre: grupo.nombre,
        marca: grupo.marca,
        categoria: grupo.categoria,
        descripcion: grupo.descripcion,
        imagenUrl: grupo.imagenUrl,
        unidad: grupo.unidad,
        tipo: grupo.tipo,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        familiaId: familia.id,
        subfamiliaId: subfamilia.id,
        padreId: null, // Garantiza que sea el Padre
      },
      create: {
        codigoInterno: grupo.codigoPadre,
        nombre: grupo.nombre,
        marca: grupo.marca,
        categoria: grupo.categoria,
        descripcion: grupo.descripcion,
        imagenUrl: grupo.imagenUrl,
        unidad: grupo.unidad,
        tipo: grupo.tipo,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        ubicacion: 'Almacén Central',
        familiaId: familia.id,
        subfamiliaId: subfamilia.id,
      },
    });

    console.log(`\n📦 [PADRE] ${padre.nombre} (${padre.codigoInterno})`);
    totalGrupos++;

    // B. Crear o actualizar las Variantes (Hijos)
    for (const varItem of grupo.variantes) {
      const hijo = await prisma.equipo.upsert({
        where: { codigoInterno: varItem.codigoInterno },
        update: {
          nombre: `${grupo.nombre} - ${varItem.varianteNombre}`,
          modelo: varItem.modelo,
          marca: grupo.marca,
          precio: varItem.precio,
          tipo: grupo.tipo,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          categoria: grupo.categoria,
          descripcion: grupo.descripcion,
          imagenUrl: grupo.imagenUrl,
          unidad: grupo.unidad,
          ubicacion: 'Almacén Central',
          familiaId: familia.id,
          subfamiliaId: subfamilia.id,
          padreId: padre.id, // Enlace con el Padre
          varianteNombre: varItem.varianteNombre,
        },
        create: {
          codigoInterno: varItem.codigoInterno,
          nombre: `${grupo.nombre} - ${varItem.varianteNombre}`,
          modelo: varItem.modelo,
          marca: grupo.marca,
          precio: varItem.precio,
          tipo: grupo.tipo,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          categoria: grupo.categoria,
          descripcion: grupo.descripcion,
          imagenUrl: grupo.imagenUrl,
          unidad: grupo.unidad,
          ubicacion: 'Almacén Central',
          familiaId: familia.id,
          subfamiliaId: subfamilia.id,
          padreId: padre.id, // Enlace con el Padre
          varianteNombre: varItem.varianteNombre,
        },
      });

      console.log(`   └─ 🔹 [HIJO] ${hijo.codigoInterno} | ${hijo.modelo} | ${hijo.varianteNombre} | PEN S/ ${hijo.precio}`);
      totalHijos++;
    }
  }

  console.log(`\n🎉 Importación completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando productos Valdinox:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
