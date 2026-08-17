import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE PROSTAR - CONECTORES SIMPLE, LIQUIDTIGHT Y TUERCAS RIGID
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

const GRUPOS_PROSTAR_2: GrupoProductoPadre[] = [
  // 1. CONECTOR SIMPLE PARA TUBO FLEXIBLE
  {
    codigoPadre: 'PROSTAR-CONECT-SIMPLE-FLEX',
    nombre: 'Conector Recto Simple de Zinc para Tubo Flexible (TFLEX)',
    marca: 'Prostar',
    categoria: 'Fitinería y Conectores Electromecánicos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Prensaestopas y Conectores Herméticos',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector recto de aleación de zinc para acoplamiento de tubo metálico flexible (TFLEX) a caja o tablero.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023332', modelo: 'SSC-050', varianteNombre: 'Diámetro 1/2"', precio: 0.22 },
      { codigoInterno: '4023333', modelo: 'SSC-075', varianteNombre: 'Diámetro 3/4"', precio: 0.36 },
      { codigoInterno: '4023334', modelo: 'SSC-100', varianteNombre: 'Diámetro 1"', precio: 0.86 },
      { codigoInterno: '4023335', modelo: 'SSC-125', varianteNombre: 'Diámetro 1 1/4"', precio: 0.92 },
      { codigoInterno: '4023339', modelo: 'SSC-150*', varianteNombre: 'Diámetro 1 1/2"', precio: 1.27 },
      { codigoInterno: '4023340', modelo: 'SSC-200*', varianteNombre: 'Diámetro 2"', precio: 1.78 },
    ],
  },
  // 2. CONECTOR LIQUID TIGHT RECTO ZINC UL
  {
    codigoPadre: 'PROSTAR-CONECT-RECTO-LT',
    nombre: 'Conector Recto Liquid Tight de Zinc UL',
    marca: 'Prostar',
    categoria: 'Fitinería y Conectores Electromecánicos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Liquidtight',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector recto hermético de zinc inyectado para tubo flexible Liquidtight con aislamiento térmico y sello hermético UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023341', modelo: 'SLT-050I', varianteNombre: 'Diámetro 1/2" - UL', precio: 0.77 },
      { codigoInterno: '4023342', modelo: 'SLT-075I', varianteNombre: 'Diámetro 3/4" - UL', precio: 0.96 },
      { codigoInterno: '4023002', modelo: 'SLT-100I', varianteNombre: 'Diámetro 1" - UL', precio: 1.42 },
      { codigoInterno: '4023003', modelo: 'SLT-150I', varianteNombre: 'Diámetro 1 1/2" - UL', precio: 3.10 },
      { codigoInterno: '4023004', modelo: 'SLT-200I', varianteNombre: 'Diámetro 2" - UL', precio: 4.20 },
    ],
  },
  // 3. CONECTOR LIQUID TIGHT CURVO ZINC UL
  {
    codigoPadre: 'PROSTAR-CONECT-CURVO-LT',
    nombre: 'Conector Curvo 90° Liquid Tight de Zinc UL',
    marca: 'Prostar',
    categoria: 'Fitinería y Conectores Electromecánicos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Liquidtight',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector angular 90° estanque Liquidtight de zinc inyectado aislante para tubo flexible conduit.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025018', modelo: 'ALT-050I', varianteNombre: 'Diámetro 1/2" - UL', precio: 1.00 },
      { codigoInterno: '4023005', modelo: 'ALT-075I', varianteNombre: 'Diámetro 3/4" - UL', precio: 1.40 },
      { codigoInterno: '4023006', modelo: 'ALT-100I', varianteNombre: 'Diámetro 1" - UL', precio: 2.40 },
      { codigoInterno: '4025019', modelo: 'ALT-150I', varianteNombre: 'Diámetro 1 1/2" - UL', precio: 4.80 },
      { codigoInterno: '4025020', modelo: 'ALT-200I', varianteNombre: 'Diámetro 2" - UL', precio: 6.60 },
    ],
  },
  // 4. TUERCA BUSHING ZDC (ZINC DIE-CAST)
  {
    codigoPadre: 'PROSTAR-TUERCA-BUSHING-ZDC',
    nombre: 'Tuerca Bushing de Zinc ZDC para Conduit Rígido / IMC',
    marca: 'Prostar',
    categoria: 'Accesorios y Tuercas Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Boquilla / Tuerca Bushing de aleación de zinc inyectado (ZDC) para protección de cables en bordes roscados.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025466', modelo: 'CB-075', varianteNombre: 'Diámetro 3/4"', precio: 0.22 },
      { codigoInterno: '4025467', modelo: 'CB-100', varianteNombre: 'Diámetro 1"', precio: 0.31 },
      { codigoInterno: '4025468', modelo: 'CB-150', varianteNombre: 'Diámetro 1 1/2"', precio: 0.66 },
      { codigoInterno: '4025469', modelo: 'CB-200', varianteNombre: 'Diámetro 2"', precio: 0.92 },
    ],
  },
  // 5. TUERCA HIERRO MALEABLE (MI) IMC RIGID
  {
    codigoPadre: 'PROSTAR-TUERCA-HIERRO-MI',
    nombre: 'Tuerca de Hierro Maleable (MI) para Conduit IMC / Rígido',
    marca: 'Prostar',
    categoria: 'Accesorios y Tuercas Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Boquilla / Tuerca robusta de hierro maleable (MI) para remate de tubería conduit IMC o rígida pesada.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024232', modelo: 'CB-050M', varianteNombre: 'Diámetro 1/2"', precio: 0.51 },
      { codigoInterno: '4024233', modelo: 'CB-075M', varianteNombre: 'Diámetro 3/4"', precio: 0.62 },
      { codigoInterno: '4024234', modelo: 'CB-100M', varianteNombre: 'Diámetro 1"', precio: 0.88 },
      { codigoInterno: '4024235', modelo: 'CB-125M', varianteNombre: 'Diámetro 1 1/4"', precio: 1.22 },
      { codigoInterno: '4024236', modelo: 'CB-150M', varianteNombre: 'Diámetro 1 1/2"', precio: 1.68 },
      { codigoInterno: '4024237', modelo: 'CB-200M', varianteNombre: 'Diámetro 2"', precio: 2.52 },
      { codigoInterno: '4024238', modelo: 'CB-250M', varianteNombre: 'Diámetro 2 1/2"', precio: 3.24 },
      { codigoInterno: '4024239', modelo: 'CB-300M', varianteNombre: 'Diámetro 3"', precio: 4.24 },
      { codigoInterno: '4024240', modelo: 'CB-400M', varianteNombre: 'Diámetro 4"', precio: 5.90 },
    ],
  },
  // 6. TUERCA BUSHING AISLADA CON PUESTA A TIERRA (MI UL)
  {
    codigoPadre: 'PROSTAR-TUERCA-AISL-GROUND',
    nombre: 'Tuerca Bushing Aislada de Hierro Maleable con Línea a Tierra UL',
    marca: 'Prostar',
    categoria: 'Accesorios y Tuercas Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Boquilla aislada de hierro maleable con lug / borne de puesta a tierra incorporado y aprobación UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025036', modelo: 'CB-075G', varianteNombre: 'Diámetro 3/4" UL', precio: 0.92 },
      { codigoInterno: '4025037', modelo: 'CB-100G', varianteNombre: 'Diámetro 1" UL', precio: 1.16 },
      { codigoInterno: '4025038', modelo: 'CB-150G', varianteNombre: 'Diámetro 1 1/2" UL', precio: 1.92 },
      { codigoInterno: '4025039', modelo: 'CB-200G', varianteNombre: 'Diámetro 2" UL', precio: 2.64 },
      { codigoInterno: '4025040', modelo: 'CB-300G', varianteNombre: 'Diámetro 3" UL', precio: 4.80 },
      { codigoInterno: '4025041', modelo: 'CB-400G', varianteNombre: 'Diámetro 4" UL', precio: 6.30 },
    ],
  },
  // 7. CONTRATUERCA DE ACERO IMC / RIGID
  {
    codigoPadre: 'PROSTAR-CONTRATUERCA-ACERO',
    nombre: 'Contratuerca de Acero para Conduit IMC / Rígido',
    marca: 'Prostar',
    categoria: 'Accesorios y Tuercas Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Contratuerca dentada de acero galvanizado para sujeción firme de tuberías IMC o rígidas en cajas de paso.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024244', modelo: 'LN-050', varianteNombre: 'Diámetro 1/2"', precio: 0.10 },
      { codigoInterno: '4024245', modelo: 'LN-075', varianteNombre: 'Diámetro 3/4"', precio: 0.12 },
      { codigoInterno: '4024246', modelo: 'LN-100', varianteNombre: 'Diámetro 1"', precio: 0.15 },
      { codigoInterno: '4024247', modelo: 'LN-125', varianteNombre: 'Diámetro 1 1/4"', precio: 0.22 },
      { codigoInterno: '4024248', modelo: 'LN-150', varianteNombre: 'Diámetro 1 1/2"', precio: 0.26 },
      { codigoInterno: '4024249', modelo: 'LN-200', varianteNombre: 'Diámetro 2"', precio: 0.40 },
      { codigoInterno: '4024250', modelo: 'LN-250', varianteNombre: 'Diámetro 2 1/2"', precio: 0.80 },
      { codigoInterno: '4024251', modelo: 'LN-300', varianteNombre: 'Diámetro 3"', precio: 1.00 },
      { codigoInterno: '4024252', modelo: 'LN-400', varianteNombre: 'Diámetro 4"', precio: 1.50 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación Lote 2 de productos Prostar con Variantes...');

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_PROSTAR_2) {
    // 1. Obtener o crear la Familia
    let familia = await prisma.familia.findUnique({
      where: { nombre: grupo.familia },
    });

    if (!familia) {
      familia = await prisma.familia.create({
        data: {
          nombre: grupo.familia,
          descripcion: 'Conectores Teck, prensaestopas, tuercas, contratuercas y accesorios conduit.',
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

  console.log(`\n🎉 Importación Lote 2 Prostar completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando Lote 2 de Prostar:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
