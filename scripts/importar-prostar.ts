import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE PROSTAR - CANALES, ABRAZADERAS Y CONDULETS DE ALUMINIO
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

const GRUPOS_PROSTAR: GrupoProductoPadre[] = [
  // 1. REDUCCIONES BUSHING
  {
    codigoPadre: 'PROSTAR-REDUCCION-BUSHING',
    nombre: 'Reducción Bushing para Tubo Rígido / IMC UL',
    marca: 'Prostar',
    categoria: 'Accesorios Conduit y Fitinería',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Reducción metálica tipo Bushing para adaptación de diámetros en tuberías conduit RGS / IMC roscadas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025470', modelo: 'RB-075050', varianteNombre: 'Medida 3/4" a 1/2" UL', precio: 0.29 },
      { codigoInterno: '4025471', modelo: 'RB-100075', varianteNombre: 'Medida 1" a 3/4" UL', precio: 0.44 },
      { codigoInterno: '4025472', modelo: 'RB-150100', varianteNombre: 'Medida 1 1/2" a 1" UL', precio: 1.12 },
      { codigoInterno: '4025473', modelo: 'RB-200150', varianteNombre: 'Medida 2" a 1 1/2" UL', precio: 1.72 },
    ],
  },
  // 2. CANALES STRUT DE 3 METROS (GALVANIZADO EN CALIENTE HDG)
  {
    codigoPadre: 'PROSTAR-CANAL-STRUT',
    nombre: 'Canal Strut Galvanizado en Caliente (HDG) x 3M (2mm)',
    marca: 'Prostar',
    categoria: 'Sistemas de Soportería Strut',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Canales y Soportería Strut',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Riel / Canal Strut de acero galvanizado por inmersión en caliente (HDG) espesor 2mm para estructuración y soporte de bandejas y tuberías.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025023', modelo: 'P1100HG', varianteNombre: 'Liso 1 5/8" x 1 5/8" x 3m (2mm) HDG', precio: 17.00 },
      { codigoInterno: '4025024', modelo: 'P1100HG-SL', varianteNombre: 'Ranurado 1 5/8" x 1 5/8" x 3m (2mm) HDG', precio: 17.00 },
      { codigoInterno: '4025026', modelo: 'P4100HG-SL', varianteNombre: 'Ranurado 1 5/8" x 13/16" x 3m (2mm) HDG', precio: 12.00 },
    ],
  },
  // 3. ABRAZADERAS STRUT (EG UL)
  {
    codigoPadre: 'PROSTAR-ABRAZADERA-STRUT',
    nombre: 'Abrazadera para Canal Strut EG UL',
    marca: 'Prostar',
    categoria: 'Sistemas de Soportería Strut',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Canales y Soportería Strut',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Abrazadera de 2 piezas para canal Strut en acero electrogalvanizado (EG) con certificación UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025027', modelo: 'SC-050', varianteNombre: 'Diámetro 1/2" EG - UL', precio: 0.18 },
      { codigoInterno: '4025028', modelo: 'SC-075', varianteNombre: 'Diámetro 3/4" EG - UL', precio: 0.20 },
      { codigoInterno: '4025029', modelo: 'SC-100', varianteNombre: 'Diámetro 1" EG - UL', precio: 0.23 },
      { codigoInterno: '4025030', modelo: 'SC-125', varianteNombre: 'Diámetro 1 1/4" EG - UL', precio: 0.32 },
      { codigoInterno: '4025031', modelo: 'SC-150', varianteNombre: 'Diámetro 1 1/2" EG - UL', precio: 0.40 },
      { codigoInterno: '4025032', modelo: 'SC-200', varianteNombre: 'Diámetro 2" EG - UL', precio: 0.43 },
      { codigoInterno: '4025033', modelo: 'SC-250', varianteNombre: 'Diámetro 2 1/2" EG - UL', precio: 0.60 },
      { codigoInterno: '4025034', modelo: 'SC-300', varianteNombre: 'Diámetro 3" EG - UL', precio: 0.70 },
      { codigoInterno: '4025035', modelo: 'SC-400', varianteNombre: 'Diámetro 4" EG - UL', precio: 1.00 },
    ],
  },
  // 4. CAJAS CONDULET ALUMINIO TIPO C
  {
    codigoPadre: 'PROSTAR-CONDULET-ALUM-C',
    nombre: 'Caja Condulet de Aluminio Tipo C UL',
    marca: 'Prostar',
    categoria: 'Cajas y Condulets de Aluminio',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets de Aluminio',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de caja condulet libre de cobre en aluminio fundido tipo C para tubos conduit roscados.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023350', modelo: 'C-050', varianteNombre: 'Diámetro 1/2" UL', precio: 2.20 },
      { codigoInterno: '4023351', modelo: 'C-075', varianteNombre: 'Diámetro 3/4" UL', precio: 3.00 },
      { codigoInterno: '4023352', modelo: 'C-100', varianteNombre: 'Diámetro 1" UL', precio: 3.20 },
      { codigoInterno: '4023353', modelo: 'C-125', varianteNombre: 'Diámetro 1 1/4" UL', precio: 5.40 },
      { codigoInterno: '4023354', modelo: 'C-150', varianteNombre: 'Diámetro 1 1/2" UL', precio: 6.80 },
      { codigoInterno: '4023355', modelo: 'C-200', varianteNombre: 'Diámetro 2" UL', precio: 12.50 },
    ],
  },
  // 5. CAJAS CONDULET ALUMINIO TIPO LB
  {
    codigoPadre: 'PROSTAR-CONDULET-ALUM-LB',
    nombre: 'Caja Condulet de Aluminio Tipo LB UL',
    marca: 'Prostar',
    categoria: 'Cajas y Condulets de Aluminio',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets de Aluminio',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Caja condulet de aluminio inyectado tipo LB para giros a 90° hacia la pared en tubería conduit.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023356', modelo: 'LB-050', varianteNombre: 'Diámetro 1/2" UL', precio: 2.20 },
      { codigoInterno: '4023357', modelo: 'LB-075', varianteNombre: 'Diámetro 3/4" UL', precio: 3.00 },
      { codigoInterno: '4023358', modelo: 'LB-100', varianteNombre: 'Diámetro 1" UL', precio: 3.20 },
      { codigoInterno: '4023359', modelo: 'LB-125', varianteNombre: 'Diámetro 1 1/4" UL', precio: 5.40 },
      { codigoInterno: '4023360', modelo: 'LB-150', varianteNombre: 'Diámetro 1 1/2" UL', precio: 6.80 },
      { codigoInterno: '4023361', modelo: 'LB-200', varianteNombre: 'Diámetro 2" UL', precio: 12.50 },
    ],
  },
  // 6. CAJAS CONDULET ALUMINIO TIPO LL
  {
    codigoPadre: 'PROSTAR-CONDULET-ALUM-LL',
    nombre: 'Caja Condulet de Aluminio Tipo LL UL',
    marca: 'Prostar',
    categoria: 'Cajas y Condulets de Aluminio',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets de Aluminio',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Caja condulet de aluminio tipo LL para desvíos a la izquierda.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023362', modelo: 'LL-050', varianteNombre: 'Diámetro 1/2" UL', precio: 2.20 },
      { codigoInterno: '4023366', modelo: 'LL-075', varianteNombre: 'Diámetro 3/4" UL', precio: 3.00 },
      { codigoInterno: '4023367', modelo: 'LL-100', varianteNombre: 'Diámetro 1" UL', precio: 3.20 },
      { codigoInterno: '4023368', modelo: 'LL-125', varianteNombre: 'Diámetro 1 1/4" UL', precio: 5.40 },
      { codigoInterno: '4023369', modelo: 'LL-150', varianteNombre: 'Diámetro 1 1/2" UL', precio: 6.80 },
      { codigoInterno: '4023373', modelo: 'LL-200', varianteNombre: 'Diámetro 2" UL', precio: 12.50 },
    ],
  },
  // 7. CAJAS CONDULET ALUMINIO TIPO LR
  {
    codigoPadre: 'PROSTAR-CONDULET-ALUM-LR',
    nombre: 'Caja Condulet de Aluminio Tipo LR UL',
    marca: 'Prostar',
    categoria: 'Cajas y Condulets de Aluminio',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets de Aluminio',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Caja condulet de aluminio tipo LR para desvíos a la derecha.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023374', modelo: 'LR-050', varianteNombre: 'Diámetro 1/2" UL', precio: 2.20 },
      { codigoInterno: '4023375', modelo: 'LR-075', varianteNombre: 'Diámetro 3/4" UL', precio: 3.00 },
      { codigoInterno: '4023376', modelo: 'LR-100', varianteNombre: 'Diámetro 1" UL', precio: 3.20 },
      { codigoInterno: '4023377', modelo: 'LR-125', varianteNombre: 'Diámetro 1 1/4" UL', precio: 5.40 },
      { codigoInterno: '4023378', modelo: 'LR-150', varianteNombre: 'Diámetro 1 1/2" UL', precio: 6.80 },
      { codigoInterno: '4023379', modelo: 'LR-200', varianteNombre: 'Diámetro 2" UL', precio: 12.50 },
    ],
  },
  // 8. CAJAS CONDULET ALUMINIO TIPO T
  {
    codigoPadre: 'PROSTAR-CONDULET-ALUM-T',
    nombre: 'Caja Condulet de Aluminio Tipo T UL',
    marca: 'Prostar',
    categoria: 'Cajas y Condulets de Aluminio',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets de Aluminio',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Caja condulet de aluminio tipo T para derivaciones de 3 vías.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023380', modelo: 'T-050', varianteNombre: 'Diámetro 1/2" UL', precio: 1.60 },
      { codigoInterno: '4023381', modelo: 'T-075', varianteNombre: 'Diámetro 3/4" UL', precio: 3.20 },
      { codigoInterno: '4023382', modelo: 'T-100', varianteNombre: 'Diámetro 1" UL', precio: 3.50 },
      { codigoInterno: '4023383', modelo: 'T-125', varianteNombre: 'Diámetro 1 1/4" UL', precio: 5.80 },
      { codigoInterno: '4023386', modelo: 'T-150', varianteNombre: 'Diámetro 1 1/2" UL', precio: 7.00 },
      { codigoInterno: '4023387', modelo: 'T-200', varianteNombre: 'Diámetro 2" UL', precio: 11.40 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación y estructuración de productos Prostar con Variantes...');

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_PROSTAR) {
    // 1. Obtener o crear la Familia
    let familia = await prisma.familia.findUnique({
      where: { nombre: grupo.familia },
    });

    if (!familia) {
      familia = await prisma.familia.create({
        data: {
          nombre: grupo.familia,
          descripcion: 'Canalizaciones, soporte strut, cajas y conectores electromecánicos.',
        },
      });
    }

    // 2. Obtener o crear la Subfamilia correspondiente
    let subfamilia = await prisma.subfamilia.findUnique({
      where: {
        familiaId_nombre: {
          familiaId: familia.id,
          nombre: grupo.subfamilia,
        },
      },
    });

    if (!subfamilia) {
      subfamilia = await prisma.subfamilia.create({
        data: {
          nombre: grupo.subfamilia,
          familiaId: familia.id,
        },
      });
    }

    // 3. Crear o actualizar el Producto Padre
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
        padreId: null,
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

    // 4. Crear o actualizar las Variantes Hijas
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
          padreId: padre.id,
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
          padreId: padre.id,
          varianteNombre: varItem.varianteNombre,
        },
      });

      console.log(`   └─ 🔹 [HIJO] ${hijo.codigoInterno} | ${hijo.modelo} | ${hijo.varianteNombre} | USD $ ${hijo.precio}`);
      totalHijos++;
    }
  }

  console.log(`\n🎉 Importación Prostar completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando productos Prostar:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
