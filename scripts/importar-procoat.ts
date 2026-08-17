import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE PROCOAT - TUBERÍAS, ACCESORIOS Y CONDULETS CON RECUBRIMIENTO PVC
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

const GRUPOS_PROCOAT: GrupoProductoPadre[] = [
  // 1. TUBOS CONDUIT RGS CON RECUBRIMIENTO EN PVC X 3M
  {
    codigoPadre: 'PROCOAT-TUBO-PVC',
    nombre: 'Tubo Conduit de Fierro Galvanizado con Recubrimiento exterior de PVC x 3M',
    marca: 'Procoat',
    categoria: 'Sistemas Conduit Recubiertos en PVC',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit de acero galvanizado revestido exteriormente con capa gruesa de PVC de 40 mils anticorrosión para ambiente marino o industrial altamente agresivo.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025169', modelo: 'RSC15P', varianteNombre: 'Diámetro 1/2" x 3M c/PVC', precio: 69.80 },
      { codigoInterno: '4025170', modelo: 'RSC20P', varianteNombre: 'Diámetro 3/4" x 3M c/PVC', precio: 91.00 },
      { codigoInterno: '4025171', modelo: 'RSC25P', varianteNombre: 'Diámetro 1" x 3M c/PVC', precio: 130.00 },
      { codigoInterno: '4025172', modelo: 'RSC40P', varianteNombre: 'Diámetro 1 1/2" x 3M c/PVC', precio: 213.00 },
      { codigoInterno: '4025173', modelo: 'RSC50P', varianteNombre: 'Diámetro 2" x 3M c/PVC', precio: 283.00 },
      { codigoInterno: '4105904', modelo: 'RSC80P', varianteNombre: 'Diámetro 3" x 3M c/PVC', precio: 562.00 },
      { codigoInterno: '4105905', modelo: 'RSC100P', varianteNombre: 'Diámetro 4" x 3M c/PVC', precio: 766.00 },
    ],
  },
  // 2. CANALES STRUT CON RECUBRIMIENTO DE PVC
  {
    codigoPadre: 'PROCOAT-CANAL-STRUT-PVC',
    nombre: 'Canal Strut 1 5/8" x 1 5/8" con Recubrimiento de PVC',
    marca: 'Procoat',
    categoria: 'Sistemas de Soportería Strut',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Riel / Canal Strut de soporte de 1 5/8" x 1 5/8" con forro de aislamiento y protección en PVC anticorrosivo.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025174', modelo: 'A12P', varianteNombre: 'Liso 1 5/8" x 1 5/8" c/PVC', precio: 205.00 },
      { codigoInterno: '4025180', modelo: 'A12PP', varianteNombre: 'Ranurado 1 5/8" x 1 5/8" c/PVC', precio: 205.00 },
    ],
  },
  // 3. ABRAZADERAS STRUT CON FORRO PVC
  {
    codigoPadre: 'PROCOAT-ABRAZADERA-STRUT-PVC',
    nombre: 'Abrazadera para Canal Strut con Forro de PVC',
    marca: 'Procoat',
    categoria: 'Sistemas de Soportería Strut',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Abrazadera metálica de 2 piezas recubierta con capa plastificada de PVC para montaje de tubos sobre canal Strut en ambientes severos.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025181', modelo: 'CL20P', varianteNombre: 'Diámetro 3/4" c/Forro PVC', precio: 6.80 },
      { codigoInterno: '4025182', modelo: 'CL25P', varianteNombre: 'Diámetro 1" c/Forro PVC', precio: 7.30 },
      { codigoInterno: '4025183', modelo: 'CL40P', varianteNombre: 'Diámetro 1 1/2" c/Forro PVC', precio: 10.90 },
      { codigoInterno: '4105906', modelo: 'CL50P', varianteNombre: 'Diámetro 2" c/Forro PVC', precio: 14.20 },
    ],
  },
  // 4. CONECTOR RECTO LIQUID TIGHT CON RECUBRIMIENTO PVC
  {
    codigoPadre: 'PROCOAT-CONECTOR-LT-PVC',
    nombre: 'Conector Recto Liquidtight con Recubrimiento en PVC',
    marca: 'Procoat',
    categoria: 'Fitinería y Conectores Electromecánicos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector estanque recto para tubo flexible Liquidtight con cubierta protectora exterior de PVC anticorrosiva.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025184', modelo: 'LTC0020P', varianteNombre: 'Diámetro 3/4" c/PVC', precio: 24.00 },
      { codigoInterno: '4025185', modelo: 'LTC0025P', varianteNombre: 'Diámetro 1" c/PVC', precio: 29.00 },
      { codigoInterno: '4025186', modelo: 'LTC0040P', varianteNombre: 'Diámetro 1 1/2" c/PVC', precio: 54.30 },
    ],
  },
  // 5. UNIÓN CONDUIT CON FORRO PVC
  {
    codigoPadre: 'PROCOAT-UNION-CONDUIT-PVC',
    nombre: 'Unión Roscada Conduit Galvanizada con Forro de PVC',
    marca: 'Procoat',
    categoria: 'Accesorios Conduit y Fitinería',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cople de unión roscado de acero recubierto exteriormente en PVC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025187', modelo: 'GC20P', varianteNombre: 'Diámetro 3/4" c/Forro PVC', precio: 5.60 },
      { codigoInterno: '4025188', modelo: 'GC25P', varianteNombre: 'Diámetro 1" c/Forro PVC', precio: 8.30 },
      { codigoInterno: '4025189', modelo: 'GC40P', varianteNombre: 'Diámetro 1 1/2" c/Forro PVC', precio: 14.10 },
      { codigoInterno: '4025190', modelo: 'GC50P', varianteNombre: 'Diámetro 2" c/Forro PVC', precio: 18.20 },
    ],
  },
  // 6. CURVA 90° CONDUIT CON PVC
  {
    codigoPadre: 'PROCOAT-CURVA-CONDUIT-PVC',
    nombre: 'Curva 90° Conduit Galvanizada con Recubrimiento de PVC',
    marca: 'Procoat',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Curva a 90° de acero galvanizado revestida en su totalidad con película de PVC anticorrosiva.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4105909', modelo: 'RSCE9020P', varianteNombre: 'Diámetro 3/4" c/PVC', precio: 15.50 },
      { codigoInterno: '4105910', modelo: 'RSCE9025P', varianteNombre: 'Diámetro 1" c/PVC', precio: 23.20 },
    ],
  },
  // 7. UNIÓN DOBLE H/H CON PVC
  {
    codigoPadre: 'PROCOAT-UNION-DOBLE-PVC',
    nombre: 'Unión Doble Hembra/Hembra Zincada con PVC',
    marca: 'Procoat',
    categoria: 'Fitinería y Conectores Electromecánicos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Unión universal triple pieza H/H para desacople de tubería con recubrimiento de PVC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4105907', modelo: 'UNF20P', varianteNombre: 'Diámetro 3/4" c/PVC', precio: 59.10 },
      { codigoInterno: '4105908', modelo: 'UNF25P', varianteNombre: 'Diámetro 1" c/PVC', precio: 79.50 },
    ],
  },
  // 8. CAJAS CONDULET TIPO C CON FORRO PVC
  {
    codigoPadre: 'PROCOAT-CONDULET-C-PVC',
    nombre: 'Caja Condulet Tipo C con Forro de PVC',
    marca: 'Procoat',
    categoria: 'Cajas y Condulets Recubiertos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet paso recto tipo C con recubrimiento exterior de PVC plastificado.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025191', modelo: 'C17P', varianteNombre: 'Diámetro 1/2" c/Forro PVC', precio: 63.00 },
      { codigoInterno: '4025192', modelo: 'C27P', varianteNombre: 'Diámetro 3/4" c/Forro PVC', precio: 65.00 },
      { codigoInterno: '4025193', modelo: 'C37P', varianteNombre: 'Diámetro 1" c/Forro PVC', precio: 87.00 },
      { codigoInterno: '4025194', modelo: 'C57P', varianteNombre: 'Diámetro 1 1/2" c/Forro PVC', precio: 145.00 },
      { codigoInterno: '4025195', modelo: 'C67P', varianteNombre: 'Diámetro 2" c/Forro PVC', precio: 208.00 },
    ],
  },
  // 9. CAJAS CONDULET TIPO LB CON FORRO PVC
  {
    codigoPadre: 'PROCOAT-CONDULET-LB-PVC',
    nombre: 'Caja Condulet Tipo LB con Forro de PVC',
    marca: 'Procoat',
    categoria: 'Cajas y Condulets Recubiertos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo LB con recubrimiento exterior anticorrosivo de PVC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025196', modelo: 'LB17P', varianteNombre: 'Diámetro 1/2" c/Forro PVC', precio: 63.00 },
      { codigoInterno: '4025198', modelo: 'LB27P', varianteNombre: 'Diámetro 3/4" c/Forro PVC', precio: 65.00 },
      { codigoInterno: '4025199', modelo: 'LB37P', varianteNombre: 'Diámetro 1" c/Forro PVC', precio: 87.00 },
      { codigoInterno: '4025200', modelo: 'LB57P', varianteNombre: 'Diámetro 1 1/2" c/Forro PVC', precio: 145.00 },
      { codigoInterno: '4025201', modelo: 'LB67P', varianteNombre: 'Diámetro 2" c/Forro PVC', precio: 208.00 },
    ],
  },
  // 10. CAJAS CONDULET TIPO LL CON FORRO PVC
  {
    codigoPadre: 'PROCOAT-CONDULET-LL-PVC',
    nombre: 'Caja Condulet Tipo LL con Forro de PVC',
    marca: 'Procoat',
    categoria: 'Cajas y Condulets Recubiertos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet desvío a la izquierda tipo LL con recubrimiento de PVC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025202', modelo: 'LL17P', varianteNombre: 'Diámetro 1/2" c/Forro PVC', precio: 63.00 },
      { codigoInterno: '4025203', modelo: 'LL27P', varianteNombre: 'Diámetro 3/4" c/Forro PVC', precio: 65.00 },
      { codigoInterno: '4025204', modelo: 'LL37P', varianteNombre: 'Diámetro 1" c/Forro PVC', precio: 87.00 },
      { codigoInterno: '4025205', modelo: 'LL57P', varianteNombre: 'Diámetro 1 1/2" c/Forro PVC', precio: 145.00 },
      { codigoInterno: '4025206', modelo: 'LL67P', varianteNombre: 'Diámetro 2" c/Forro PVC', precio: 208.00 },
    ],
  },
  // 11. CAJAS CONDULET TIPO LR CON FORRO PVC
  {
    codigoPadre: 'PROCOAT-CONDULET-LR-PVC',
    nombre: 'Caja Condulet Tipo LR con Forro de PVC',
    marca: 'Procoat',
    categoria: 'Cajas y Condulets Recubiertos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet desvío a la derecha tipo LR con recubrimiento exterior de PVC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025207', modelo: 'LR17P', varianteNombre: 'Diámetro 1/2" c/Forro PVC', precio: 63.00 },
      { codigoInterno: '4025208', modelo: 'LR27P', varianteNombre: 'Diámetro 3/4" c/Forro PVC', precio: 65.00 },
      { codigoInterno: '4025209', modelo: 'LR37P', varianteNombre: 'Diámetro 1" c/Forro PVC', precio: 87.00 },
      { codigoInterno: '4025210', modelo: 'LR57P', varianteNombre: 'Diámetro 1 1/2" c/Forro PVC', precio: 145.00 },
      { codigoInterno: '4025211', modelo: 'LR67P', varianteNombre: 'Diámetro 2" c/Forro PVC', precio: 208.00 },
    ],
  },
  // 12. CAJAS CONDULET TIPO T CON FORRO PVC
  {
    codigoPadre: 'PROCOAT-CONDULET-T-PVC',
    nombre: 'Caja Condulet Tipo T con Forro de PVC',
    marca: 'Procoat',
    categoria: 'Cajas y Condulets Recubiertos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Sistemas Recubiertos en PVC',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet en T de 3 vías con forro exterior protector de PVC plastificado.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025212', modelo: 'T17P', varianteNombre: 'Diámetro 1/2" c/Forro PVC', precio: 63.00 },
      { codigoInterno: '4025213', modelo: 'T27P', varianteNombre: 'Diámetro 3/4" c/Forro PVC', precio: 65.00 },
      { codigoInterno: '4025214', modelo: 'T37P', varianteNombre: 'Diámetro 1" c/Forro PVC', precio: 87.00 },
      { codigoInterno: '4025215', modelo: 'T57P', varianteNombre: 'Diámetro 1 1/2" c/Forro PVC', precio: 145.00 },
      { codigoInterno: '4025216', modelo: 'T67P', varianteNombre: 'Diámetro 2" c/Forro PVC', precio: 208.00 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación de productos Procoat con Variantes...');

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_PROCOAT) {
    // 1. Obtener o crear la Familia
    let familia = await prisma.familia.findUnique({
      where: { nombre: grupo.familia },
    });

    if (!familia) {
      familia = await prisma.familia.create({
        data: {
          nombre: grupo.familia,
          descripcion: 'Canalizaciones, soporte, tuberías y accesorios conduit.',
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

  console.log(`\n🎉 Importación Procoat completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando productos Procoat:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
