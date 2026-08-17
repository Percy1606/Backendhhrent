import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE WEIFANG - TUBOS Y ACCESORIOS CON VARIANTES AGRUPADAS
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

const GRUPOS_WEIFANG: GrupoProductoPadre[] = [
  // 1. TUBOS RGS
  {
    codigoPadre: 'WEIFANG-TUBO-RGS',
    nombre: 'Tubo Conduit de Fierro Galvanizado Rígido RGS x 3M UL',
    marca: 'Weifang',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit de hierro galvanizado rígido (RGS) de 3 metros con certificación UL. Alta resistencia a corrosión e impactos en instalaciones industriales exigentes.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4013037', modelo: 'WRGS-1/2', varianteNombre: 'Diámetro 1/2" x 3M UL', precio: 14.00 },
      { codigoInterno: '4013038', modelo: 'WRGS-3/4', varianteNombre: 'Diámetro 3/4" x 3M UL', precio: 17.50 },
      { codigoInterno: '4013039', modelo: 'WRGS-1', varianteNombre: 'Diámetro 1" x 3M UL', precio: 27.50 },
      { codigoInterno: '4013041', modelo: 'WRGS-1 1/2', varianteNombre: 'Diámetro 1 1/2" x 3M UL', precio: 47.00 },
      { codigoInterno: '4013042', modelo: 'WRGS-2', varianteNombre: 'Diámetro 2" x 3M UL', precio: 58.00 },
      { codigoInterno: '4014423', modelo: 'WRGS-2 1/2', varianteNombre: 'Diámetro 2 1/2" x 3M UL', precio: 100.00 },
    ],
  },
  // 2. ACCESORIOS RGS (CURVAS 90°)
  {
    codigoPadre: 'WEIFANG-CURVA-RGS',
    nombre: 'Curva 90° Conduit Galvanizado RGS / IMC-UL',
    marca: 'Weifang',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Curva a 90° de acero galvanizado para tubos conduit RGS / IMC con certificación UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4013043', modelo: 'ERGS-1/2', varianteNombre: 'Diámetro 1/2" RGS/IMC-UL', precio: 2.30 },
      { codigoInterno: '4013044', modelo: 'ERGS-3/4', varianteNombre: 'Diámetro 3/4" RGS/IMC-UL', precio: 2.90 },
      { codigoInterno: '4013045', modelo: 'ERGS-1', varianteNombre: 'Diámetro 1" RGS/IMC-UL', precio: 4.30 },
      { codigoInterno: '4013046', modelo: 'ERGS-1 1/4', varianteNombre: 'Diámetro 1 1/4" RGS/IMC-UL', precio: 6.70 },
      { codigoInterno: '4013047', modelo: 'ERGS-1 1/2', varianteNombre: 'Diámetro 1 1/2" RGS/IMC-UL', precio: 9.40 },
      { codigoInterno: '4013048', modelo: 'ERGS-2', varianteNombre: 'Diámetro 2" RGS/IMC-UL', precio: 14.40 },
      { codigoInterno: '4017528', modelo: 'ERGS-4', varianteNombre: 'Diámetro 4" RGS/IMC-UL', precio: 68.00 },
      { codigoInterno: '4017529', modelo: 'ERGS-6', varianteNombre: 'Diámetro 6" RGS/IMC-UL', precio: 300.00 },
    ],
  },
  // 3. TUBOS IMC
  {
    codigoPadre: 'WEIFANG-TUBO-IMC',
    nombre: 'Tubo Conduit de Fierro Galvanizado IMC x 3M UL',
    marca: 'Weifang',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit de hierro galvanizado de peso intermedio (IMC) de 3 metros UL. Protección duradera contra impactos en instalaciones comerciales e industriales.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025452', modelo: 'IMC-075', varianteNombre: 'Diámetro 3/4" x 3M UL', precio: 12.90 },
      { codigoInterno: '4025453', modelo: 'IMC-100', varianteNombre: 'Diámetro 1" x 3M UL', precio: 18.00 },
      { codigoInterno: '4025454', modelo: 'IMC-150', varianteNombre: 'Diámetro 1 1/2" x 3M UL', precio: 28.40 },
      { codigoInterno: '4025455', modelo: 'IMC-200', varianteNombre: 'Diámetro 2" x 3M UL', precio: 37.70 },
    ],
  },
  // 4. ACCESORIOS IMC - CURVAS 90°
  {
    codigoPadre: 'WEIFANG-CURVA-IMC',
    nombre: 'Curva 90° Conduit Galvanizado IMC-UL',
    marca: 'Weifang',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Curva 90° de acero galvanizado IMC con certificación UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025456', modelo: 'EIMC-075', varianteNombre: 'Diámetro 3/4" IMC-UL', precio: 2.40 },
      { codigoInterno: '4025457', modelo: 'EIMC-100', varianteNombre: 'Diámetro 1" IMC-UL', precio: 3.60 },
      { codigoInterno: '4025458', modelo: 'EIMC-150', varianteNombre: 'Diámetro 1 1/2" IMC-UL', precio: 7.50 },
      { codigoInterno: '4025459', modelo: 'EIMC-200', varianteNombre: 'Diámetro 2" IMC-UL', precio: 11.40 },
    ],
  },
  // 5. ACCESORIOS IMC - UNIONES
  {
    codigoPadre: 'WEIFANG-UNION-IMC',
    nombre: 'Unión Conduit Galvanizado IMC-UL',
    marca: 'Weifang',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cople / Unión de acoplamiento roscado para tubería conduit IMC galvanizada UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025460', modelo: 'CIMC-075', varianteNombre: 'Diámetro 3/4" IMC-UL', precio: 0.80 },
      { codigoInterno: '4025461', modelo: 'CIMC-100', varianteNombre: 'Diámetro 1" IMC-UL', precio: 1.32 },
      { codigoInterno: '4025462', modelo: 'CIMC-150', varianteNombre: 'Diámetro 1 1/2" IMC-UL', precio: 2.20 },
      { codigoInterno: '4025463', modelo: 'CIMC-200', varianteNombre: 'Diámetro 2" IMC-UL', precio: 2.80 },
    ],
  },
  // 6. TUBOS EMT
  {
    codigoPadre: 'WEIFANG-TUBO-EMT',
    nombre: 'Tubo Conduit de Fierro Galvanizado EMT x 3M UL',
    marca: 'Weifang',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit metálico eléctrico liviano (EMT) de 3 metros UL. Ducto versátil y económico para cableado estructural interno.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4013028', modelo: 'WEMT-1 1/4', varianteNombre: 'Diámetro 1 1/4" x 3M UL', precio: 10.60 },
      { codigoInterno: '4013029', modelo: 'WEMT-1 1/2', varianteNombre: 'Diámetro 1 1/2" x 3M UL', precio: 14.00 },
      { codigoInterno: '4013030', modelo: 'WEMT-2', varianteNombre: 'Diámetro 2" x 3M UL', precio: 17.00 },
      { codigoInterno: '4013691', modelo: 'WEMT-21/2', varianteNombre: 'Diámetro 2 1/2" x 3M UL', precio: 24.20 },
      { codigoInterno: '4013692', modelo: 'WEMT-3', varianteNombre: 'Diámetro 3" x 3M UL', precio: 30.00 },
    ],
  },
  // 7. ACCESORIOS EMT - CURVAS 90°
  {
    codigoPadre: 'WEIFANG-CURVA-EMT',
    nombre: 'Curva 90° Conduit Fierro Galvanizado EMT-UL',
    marca: 'Weifang',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Curva 90° de acero galvanizado EMT con certificación UL para desvíos de tubería.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4013032', modelo: 'EEMT-3/4', varianteNombre: 'Diámetro 3/4" EMT-UL', precio: 1.06 },
      { codigoInterno: '4013033', modelo: 'EEMT-1', varianteNombre: 'Diámetro 1" EMT-UL', precio: 1.38 },
      { codigoInterno: '4013035', modelo: 'EEMT-1 1/2', varianteNombre: 'Diámetro 1 1/2" EMT-UL', precio: 3.10 },
      { codigoInterno: '4016694', modelo: 'EEMT-3"', varianteNombre: 'Diámetro 3" EMT-UL', precio: 14.50 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación y estructuración de productos Weifang con Variantes...');

  // 1. Obtener o crear la Familia "Canalizaciones y Bandejas"
  let familia = await prisma.familia.findUnique({
    where: { nombre: 'Canalizaciones y Bandejas' },
  });

  if (!familia) {
    familia = await prisma.familia.create({
      data: {
        nombre: 'Canalizaciones y Bandejas',
        descripcion: 'Bandejas de rejilla, tuberías conduit, accesorios de soporte y conexión.',
      },
    });
  }

  // 2. Subfamilia para Tubería y Accesorios Conduit
  let subfamilia = await prisma.subfamilia.findUnique({
    where: {
      familiaId_nombre: {
        familiaId: familia.id,
        nombre: 'Tubería y Accesorios Conduit',
      },
    },
  });

  if (!subfamilia) {
    subfamilia = await prisma.subfamilia.create({
      data: {
        nombre: 'Tubería y Accesorios Conduit',
        familiaId: familia.id,
      },
    });
  }

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_WEIFANG) {
    // A. Crear o actualizar el Producto Padre
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

    // B. Crear o actualizar las Variantes Hijas
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

  console.log(`\n🎉 Importación completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando productos Weifang:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
