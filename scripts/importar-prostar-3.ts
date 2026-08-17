import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE PROSTAR - TUBERÍAS, CURVAS, UNIONES Y HUBS (EMT & IMC)
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

const GRUPOS_PROSTAR_3: GrupoProductoPadre[] = [
  // 1. TUBERÍA CONDUIT EMT X 3M
  {
    codigoPadre: 'PROSTAR-TUBO-EMT',
    nombre: 'Tubo Conduit de Fierro Galvanizado EMT x 3M',
    marca: 'Prostar',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit metálico eléctrico liviano (EMT) de 3 metros galvanizado para protección de conductores eléctricos.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023297', modelo: 'EMT-50', varianteNombre: 'Diámetro 1/2" x 3M', precio: 3.20 },
      { codigoInterno: '4023298', modelo: 'EMT-75', varianteNombre: 'Diámetro 3/4" x 3M', precio: 4.10 },
      { codigoInterno: '4023307', modelo: 'EMT-100', varianteNombre: 'Diámetro 1" x 3M', precio: 6.00 },
      { codigoInterno: '4023308', modelo: 'EMT-125', varianteNombre: 'Diámetro 1 1/4" x 3M', precio: 8.80 },
      { codigoInterno: '4023309', modelo: 'EMT-150', varianteNombre: 'Diámetro 1 1/2" x 3M', precio: 10.40 },
      { codigoInterno: '4023310', modelo: 'EMT-200', varianteNombre: 'Diámetro 2" x 3M', precio: 14.00 },
      { codigoInterno: '4023311', modelo: 'EMT-250', varianteNombre: 'Diámetro 2 1/2" x 3M', precio: 22.00 },
      { codigoInterno: '4022985', modelo: 'EMT-300', varianteNombre: 'Diámetro 3" x 3M', precio: 28.00 },
      { codigoInterno: '4022986', modelo: 'EMT-400', varianteNombre: 'Diámetro 4" x 3M', precio: 38.00 },
    ],
  },
  // 2. CURVAS 90° EMT
  {
    codigoPadre: 'PROSTAR-CURVA-EMT',
    nombre: 'Curva 90° Conduit de Fierro Galvanizado EMT',
    marca: 'Prostar',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Curva a 90° de acero galvanizado para cambio de dirección en canalización de tubería EMT.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4014338', modelo: '8301', varianteNombre: 'Diámetro 3/4"', precio: 0.53 },
      { codigoInterno: '4014339', modelo: '8302', varianteNombre: 'Diámetro 1"', precio: 0.92 },
      { codigoInterno: '4014340', modelo: '8303', varianteNombre: 'Diámetro 1 1/4"', precio: 1.52 },
      { codigoInterno: '4014341', modelo: '8304', varianteNombre: 'Diámetro 1 1/2"', precio: 2.40 },
      { codigoInterno: '4014342', modelo: '8305', varianteNombre: 'Diámetro 2"', precio: 2.90 },
      { codigoInterno: '4022987', modelo: '8306', varianteNombre: 'Diámetro 2 1/2"', precio: 9.00 },
      { codigoInterno: '4022988', modelo: '8307', varianteNombre: 'Diámetro 3"', precio: 12.80 },
      { codigoInterno: '4022989', modelo: '8309', varianteNombre: 'Diámetro 4"', precio: 19.60 },
    ],
  },
  // 3. UNIÓN EMT ACERO GALVANIZADO UL
  {
    codigoPadre: 'PROSTAR-UNION-EMT',
    nombre: 'Unión EMT de Acero Galvanizado UL',
    marca: 'Prostar',
    categoria: 'Accesorios Conduit y Fitinería',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cople / Unión de acoplamiento de acero galvanizado con tornillos de fijación para tubo EMT UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023312', modelo: 'Z-50S*', varianteNombre: 'Diámetro 1/2" - UL', precio: 0.30 },
      { codigoInterno: '4023313', modelo: 'Z-75S*', varianteNombre: 'Diámetro 3/4" - UL', precio: 0.30 },
      { codigoInterno: '4023314', modelo: 'Z-100S*', varianteNombre: 'Diámetro 1" - UL', precio: 0.45 },
      { codigoInterno: '4023315', modelo: 'Z-125S*', varianteNombre: 'Diámetro 1 1/4" - UL', precio: 0.80 },
      { codigoInterno: '4023316', modelo: 'Z-150S*', varianteNombre: 'Diámetro 1 1/2" - UL', precio: 0.90 },
      { codigoInterno: '4023317', modelo: 'Z-200S*', varianteNombre: 'Diámetro 2" - UL', precio: 1.30 },
      { codigoInterno: '4023318', modelo: 'Z-250S', varianteNombre: 'Diámetro 2 1/2" - UL', precio: 3.40 },
      { codigoInterno: '4023319', modelo: 'Z-300S', varianteNombre: 'Diámetro 3" - UL', precio: 4.40 },
      { codigoInterno: '4023320', modelo: 'Z-400S', varianteNombre: 'Diámetro 4" - UL', precio: 6.00 },
    ],
  },
  // 4. CONECTOR EMT ACERO GALVANIZADO UL
  {
    codigoPadre: 'PROSTAR-CONECTOR-EMT',
    nombre: 'Conector EMT de Acero Galvanizado UL',
    marca: 'Prostar',
    categoria: 'Accesorios Conduit y Fitinería',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector terminal recto a caja de acero galvanizado para tubo EMT con certificación UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4023321', modelo: 'H-50S*', varianteNombre: 'Diámetro 1/2" - UL', precio: 0.31 },
      { codigoInterno: '4023322', modelo: 'H-75S*', varianteNombre: 'Diámetro 3/4" - UL', precio: 0.31 },
      { codigoInterno: '4023323', modelo: 'H-100S*', varianteNombre: 'Diámetro 1" - UL', precio: 0.49 },
      { codigoInterno: '4023324', modelo: 'H-125S*', varianteNombre: 'Diámetro 1 1/4" - UL', precio: 0.82 },
      { codigoInterno: '4023325', modelo: 'H-150S*', varianteNombre: 'Diámetro 1 1/2" - UL', precio: 1.16 },
      { codigoInterno: '4023326', modelo: 'H-200S*', varianteNombre: 'Diámetro 2" - UL', precio: 1.32 },
      { codigoInterno: '4023327', modelo: 'H-250S', varianteNombre: 'Diámetro 2 1/2" - UL', precio: 3.60 },
      { codigoInterno: '4023328', modelo: 'H-300S', varianteNombre: 'Diámetro 3" - UL', precio: 5.40 },
      { codigoInterno: '4023330', modelo: 'H-400S', varianteNombre: 'Diámetro 4" - UL', precio: 8.40 },
    ],
  },
  // 5. TUBERÍA CONDUIT IMC X 3M
  {
    codigoPadre: 'PROSTAR-TUBO-IMC',
    nombre: 'Tubo Conduit de Fierro Galvanizado IMC x 3M',
    marca: 'Prostar',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit de hierro galvanizado de espesor intermedio (IMC) de 3 metros roscado en ambos extremos.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025022', modelo: 'IMC-050', varianteNombre: 'Diámetro 1/2" x 3M', precio: 5.50 },
      { codigoInterno: '4022974', modelo: 'IMC-075', varianteNombre: 'Diámetro 3/4" x 3M', precio: 6.80 },
      { codigoInterno: '4022975', modelo: 'IMC-100', varianteNombre: 'Diámetro 1" x 3M', precio: 9.80 },
      { codigoInterno: '4022976', modelo: 'IMC-150', varianteNombre: 'Diámetro 1 1/2" x 3M', precio: 17.00 },
      { codigoInterno: '4022978', modelo: 'IMC-200', varianteNombre: 'Diámetro 2" x 3M', precio: 21.60 },
      { codigoInterno: '4022979', modelo: 'IMC-250H', varianteNombre: 'Diámetro 2 1/2" x 3M Pesado', precio: 64.00 },
      { codigoInterno: '4022980', modelo: 'IMC-300H', varianteNombre: 'Diámetro 3" x 3M Pesado', precio: 70.00 },
      { codigoInterno: '4022981', modelo: 'IMC-400H', varianteNombre: 'Diámetro 4" x 3M Pesado', precio: 92.00 },
    ],
  },
  // 6. CURVAS 90° IMC
  {
    codigoPadre: 'PROSTAR-CURVA-IMC',
    nombre: 'Curva 90° Conduit Galvanizado IMC',
    marca: 'Prostar',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Curva 90° roscada de acero galvanizado IMC para giros en instalaciones mecánicamente protegidas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4022982', modelo: '8321', varianteNombre: 'Diámetro 3/4"', precio: 1.12 },
      { codigoInterno: '4022983', modelo: '8322', varianteNombre: 'Diámetro 1"', precio: 1.96 },
      { codigoInterno: '4022984', modelo: '8324', varianteNombre: 'Diámetro 1 1/2"', precio: 3.80 },
      { codigoInterno: '4025021', modelo: '8325', varianteNombre: 'Diámetro 2"', precio: 5.40 },
    ],
  },
  // 7. UNIONES IMC
  {
    codigoPadre: 'PROSTAR-UNION-IMC',
    nombre: 'Unión Roscada IMC de Fierro Galvanizado',
    marca: 'Prostar',
    categoria: 'Accesorios Conduit y Fitinería',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cople / Unión de acoplamiento roscado hembra para unión de tramos de tubo conduit IMC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4022990', modelo: 'IC-075', varianteNombre: 'Diámetro 3/4"', precio: 0.34 },
      { codigoInterno: '4022991', modelo: 'IC-100', varianteNombre: 'Diámetro 1"', precio: 0.44 },
      { codigoInterno: '4022992', modelo: 'IC-150', varianteNombre: 'Diámetro 1 1/2"', precio: 0.80 },
      { codigoInterno: '4022993', modelo: 'IC-200', varianteNombre: 'Diámetro 2"', precio: 1.20 },
      { codigoInterno: '4022995', modelo: 'IC-250', varianteNombre: 'Diámetro 2 1/2"', precio: 2.80 },
      { codigoInterno: '4022996', modelo: 'IC-300', varianteNombre: 'Diámetro 3"', precio: 3.60 },
      { codigoInterno: '4022997', modelo: 'IC-400', varianteNombre: 'Diámetro 4"', precio: 5.00 },
    ],
  },
  // 8. CONECTOR HUB IMC / RIGID
  {
    codigoPadre: 'PROSTAR-CONECTOR-HUB-IMC',
    nombre: 'Conector Recto HUB Hermético de Zinc (LT) UL',
    marca: 'Prostar',
    categoria: 'Fitinería y Conectores Electromecánicos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Hubs y Conexiones a Caja',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector HUB estanque hermético al agua y al polvo en aleación de zinc para entrada de tubo roscado IMC / Rígido a tablero con sello o-ring y certificación UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4022998', modelo: 'H-075*', varianteNombre: 'Diámetro 3/4" UL', precio: 1.48 },
      { codigoInterno: '4022999', modelo: 'H-100*', varianteNombre: 'Diámetro 1" UL', precio: 2.10 },
      { codigoInterno: '4023000', modelo: 'H-150*', varianteNombre: 'Diámetro 1 1/2" UL', precio: 3.64 },
      { codigoInterno: '4023001', modelo: 'H-200*', varianteNombre: 'Diámetro 2" UL', precio: 5.80 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación Lote 3 de productos Prostar con Variantes...');

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_PROSTAR_3) {
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

  console.log(`\n🎉 Importación Lote 3 Prostar completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando Lote 3 de Prostar:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
