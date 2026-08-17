import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE PRODUIT - TUBOS RGS, ACCESORIOS, CONDULETS MI & STRUT
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

const GRUPOS_PRODUIT: GrupoProductoPadre[] = [
  // 1. TUBOS CONDUIT RGS UL
  {
    codigoPadre: 'PRODUIT-TUBO-RGS',
    nombre: 'Tubo Conduit de Fierro Galvanizado Rígido RGS x 3M UL',
    marca: 'Produit',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit de hierro galvanizado rígido (RGS) de 3 metros con certificación UL para máxima protección mecánica en áreas clasificadas e industriales.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025217', modelo: 'RSC15U', varianteNombre: 'Diámetro 1/2" x 3M UL', precio: 12.90 },
      { codigoInterno: '4025218', modelo: 'RSC20U', varianteNombre: 'Diámetro 3/4" x 3M UL', precio: 16.50 },
      { codigoInterno: '4025219', modelo: 'RSC25U', varianteNombre: 'Diámetro 1" x 3M UL', precio: 25.00 },
      { codigoInterno: '4025220', modelo: 'RSC32U', varianteNombre: 'Diámetro 1 1/4" x 3M UL', precio: 33.50 },
      { codigoInterno: '4025221', modelo: 'RSC40U', varianteNombre: 'Diámetro 1 1/2" x 3M UL', precio: 40.00 },
      { codigoInterno: '4025222', modelo: 'RSC50U', varianteNombre: 'Diámetro 2" x 3M UL', precio: 53.30 },
      { codigoInterno: '4025223', modelo: 'RSC65U', varianteNombre: 'Diámetro 2 1/2" x 3M UL', precio: 92.00 },
      { codigoInterno: '4025224', modelo: 'RSC80U', varianteNombre: 'Diámetro 3" x 3M UL', precio: 113.00 },
      { codigoInterno: '4025225', modelo: 'RSC100U', varianteNombre: 'Diámetro 4" x 3M UL', precio: 164.00 },
      { codigoInterno: '4025226', modelo: 'RSC150U', varianteNombre: 'Diámetro 6" x 3M UL', precio: 295.00 },
    ],
  },
  // 2. CURVAS 90° RGS/IMC UL
  {
    codigoPadre: 'PRODUIT-CURVA-RGS',
    nombre: 'Curva 90° Conduit Galvanizado RGS / IMC-UL',
    marca: 'Produit',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Curva a 90° de acero galvanizado para tubería conduit RGS / IMC con certificación UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025227', modelo: 'RSCE9015U', varianteNombre: 'Diámetro 1/2" RGS/IMC-UL', precio: 2.30 },
      { codigoInterno: '4025228', modelo: 'RSCE9020U', varianteNombre: 'Diámetro 3/4" RGS/IMC-UL', precio: 2.90 },
      { codigoInterno: '4025229', modelo: 'RSCE9025U', varianteNombre: 'Diámetro 1" RGS/IMC-UL', precio: 4.30 },
      { codigoInterno: '4025230', modelo: 'RSCE9032U', varianteNombre: 'Diámetro 1 1/4" RGS/IMC-UL', precio: 6.70 },
      { codigoInterno: '4025231', modelo: 'RSCE9040U', varianteNombre: 'Diámetro 1 1/2" RGS/IMC-UL', precio: 9.40 },
      { codigoInterno: '4025232', modelo: 'RSCE9050U', varianteNombre: 'Diámetro 2" RGS/IMC-UL', precio: 14.40 },
      { codigoInterno: '4025233', modelo: 'RSCE9065U', varianteNombre: 'Diámetro 2 1/2" RGS/IMC-UL', precio: 28.00 },
      { codigoInterno: '4025234', modelo: 'RSCE9080U', varianteNombre: 'Diámetro 3" RGS/IMC-UL', precio: 41.00 },
      { codigoInterno: '4025235', modelo: 'RSCE90100U', varianteNombre: 'Diámetro 4" RGS/IMC-UL', precio: 70.00 },
      { codigoInterno: '4025236', modelo: 'RSCE90150U', varianteNombre: 'Diámetro 6" RGS/IMC-UL', precio: 250.00 },
    ],
  },
  // 3. UNIÓN CONDUIT GALVANIZADO RGS/IMC UL
  {
    codigoPadre: 'PRODUIT-UNION-RGS',
    nombre: 'Unión Roscada Conduit Galvanizado RGS / IMC-UL',
    marca: 'Produit',
    categoria: 'Accesorios Conduit y Fitinería',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cople / Unión de acoplamiento roscado de acero galvanizado para tubería conduit RGS / IMC con sello UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025237', modelo: 'GC15U', varianteNombre: 'Diámetro 1/2" RGS/IMC-UL', precio: 0.63 },
      { codigoInterno: '4025238', modelo: 'GC20U', varianteNombre: 'Diámetro 3/4" RGS/IMC-UL', precio: 0.76 },
      { codigoInterno: '4025239', modelo: 'GC25U', varianteNombre: 'Diámetro 1" RGS/IMC-UL', precio: 1.34 },
      { codigoInterno: '4025240', modelo: 'GC32U', varianteNombre: 'Diámetro 1 1/4" RGS/IMC-UL', precio: 1.80 },
      { codigoInterno: '4025241', modelo: 'GC40U', varianteNombre: 'Diámetro 1 1/2" RGS/IMC-UL', precio: 2.22 },
      { codigoInterno: '4025242', modelo: 'GC50U', varianteNombre: 'Diámetro 2" RGS/IMC-UL', precio: 3.10 },
      { codigoInterno: '4025243', modelo: 'GC65U', varianteNombre: 'Diámetro 2 1/2" RGS/IMC-UL', precio: 6.80 },
      { codigoInterno: '4025244', modelo: 'GC80U', varianteNombre: 'Diámetro 3" RGS/IMC-UL', precio: 8.80 },
      { codigoInterno: '4025245', modelo: 'GC100U', varianteNombre: 'Diámetro 4" RGS/IMC-UL', precio: 13.40 },
      { codigoInterno: '4025246', modelo: 'GC150U', varianteNombre: 'Diámetro 6" RGS/IMC-UL', precio: 38.40 },
    ],
  },
  // 4. TUERCA BUSHING HIERRO MALEABLE (MI UL)
  {
    codigoPadre: 'PRODUIT-TUERCA-BUSHING-MI',
    nombre: 'Tuerca Bushing de Hierro Maleable (MI) UL',
    marca: 'Produit',
    categoria: 'Accesorios y Tuercas Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Boquilla / Tuerca Bushing de hierro maleable (MI) para remate protector de cables en extremos roscados de tubería.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025247', modelo: 'RBU15M', varianteNombre: 'Diámetro 1/2" MI UL', precio: 0.74 },
      { codigoInterno: '4025248', modelo: 'RBU20M', varianteNombre: 'Diámetro 3/4" MI UL', precio: 0.84 },
      { codigoInterno: '4025249', modelo: 'RBU25M', varianteNombre: 'Diámetro 1" MI UL', precio: 1.11 },
      { codigoInterno: '4025250', modelo: 'RBU40M', varianteNombre: 'Diámetro 1 1/2" MI UL', precio: 1.92 },
      { codigoInterno: '4025251', modelo: 'RBU50M', varianteNombre: 'Diámetro 2" MI UL', precio: 3.60 },
    ],
  },
  // 5. TUERCA AISLADA CON PUESTA A TIERRA (MI GROUND)
  {
    codigoPadre: 'PRODUIT-TUERCA-AISL-GROUND',
    nombre: 'Tuerca Bushing Aislada de Hierro Maleable con Tierra',
    marca: 'Produit',
    categoria: 'Accesorios y Tuercas Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Boquilla aislada de hierro maleable con lug de conexión a tierra de aluminio (14-4 AWG).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025252', modelo: 'RGB15M', varianteNombre: 'Diámetro 1/2" MI Ground', precio: 1.36 },
      { codigoInterno: '4025253', modelo: 'RGB20M', varianteNombre: 'Diámetro 3/4" MI Ground', precio: 1.38 },
      { codigoInterno: '4025254', modelo: 'RGB25M', varianteNombre: 'Diámetro 1" MI Ground', precio: 1.64 },
      { codigoInterno: '4025255', modelo: 'RGB40M', varianteNombre: 'Diámetro 1 1/2" MI Ground', precio: 2.70 },
      { codigoInterno: '4025256', modelo: 'RGB50M', varianteNombre: 'Diámetro 2" MI Ground', precio: 4.90 },
    ],
  },
  // 6. CONECTOR RECTO HUB MI UL
  {
    codigoPadre: 'PRODUIT-CONECTOR-HUB-MI',
    nombre: 'Conector Recto HUB de Hierro Maleable UL',
    marca: 'Produit',
    categoria: 'Fitinería y Conectores Electromecánicos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Hubs y Conexiones a Caja',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector HUB hermético resistente de hierro maleable para ingreso seguro a tableros y cajas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025262', modelo: 'STG20M', varianteNombre: 'Diámetro 3/4" MI UL', precio: 2.86 },
      { codigoInterno: '4025263', modelo: 'STG25M', varianteNombre: 'Diámetro 1" MI UL', precio: 3.80 },
      { codigoInterno: '4025264', modelo: 'STG40M', varianteNombre: 'Diámetro 1 1/2" MI UL', precio: 6.80 },
      { codigoInterno: '4025265', modelo: 'STG50M', varianteNombre: 'Diámetro 2" MI UL', precio: 9.00 },
    ],
  },
  // 7. CAJAS CONDULET HIERRO MALEABLE TIPO C (CON TAPA Y EMPAQUE HDG UL)
  {
    codigoPadre: 'PRODUIT-CONDULET-MI-C',
    nombre: 'Caja Condulet de Hierro Maleable Tipo C con Tapa + Empaque HDG UL',
    marca: 'Produit',
    categoria: 'Cajas y Condulets Heavy Duty',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets Heavy Duty HDG',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo C en hierro maleable con acabado de galvanizado por inmersión en caliente (HDG), incluye tapa metálica y empaque de neopreno UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025266', modelo: 'C17', varianteNombre: 'Diámetro 1/2" HDG UL', precio: 7.00 },
      { codigoInterno: '4025267', modelo: 'C27', varianteNombre: 'Diámetro 3/4" HDG UL', precio: 8.50 },
      { codigoInterno: '4025268', modelo: 'C37', varianteNombre: 'Diámetro 1" HDG UL', precio: 11.60 },
      { codigoInterno: '4025269', modelo: 'C57', varianteNombre: 'Diámetro 1 1/2" HDG UL', precio: 20.00 },
      { codigoInterno: '4025270', modelo: 'C67', varianteNombre: 'Diámetro 2" HDG UL', precio: 29.00 },
      { codigoInterno: '4025271', modelo: 'C77', varianteNombre: 'Diámetro 2 1/2" HDG UL', precio: 74.00 },
      { codigoInterno: '4025272', modelo: 'C87', varianteNombre: 'Diámetro 3" HDG UL', precio: 90.00 },
    ],
  },
  // 8. CAJAS CONDULET HIERRO MALEABLE TIPO LB (CON TAPA Y EMPAQUE HDG UL)
  {
    codigoPadre: 'PRODUIT-CONDULET-MI-LB',
    nombre: 'Caja Condulet de Hierro Maleable Tipo LB con Tapa + Empaque HDG UL',
    marca: 'Produit',
    categoria: 'Cajas y Condulets Heavy Duty',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets Heavy Duty HDG',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo LB en hierro maleable galvanizado en caliente HDG con tapa y empaque incluidos UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025273', modelo: 'LB17', varianteNombre: 'Diámetro 1/2" HDG UL', precio: 7.00 },
      { codigoInterno: '4025274', modelo: 'LB27', varianteNombre: 'Diámetro 3/4" HDG UL', precio: 8.50 },
      { codigoInterno: '4025275', modelo: 'LB37', varianteNombre: 'Diámetro 1" HDG UL', precio: 11.60 },
      { codigoInterno: '4025276', modelo: 'LB57', varianteNombre: 'Diámetro 1 1/2" HDG UL', precio: 20.00 },
      { codigoInterno: '4025277', modelo: 'LB67', varianteNombre: 'Diámetro 2" HDG UL', precio: 29.00 },
      { codigoInterno: '4025278', modelo: 'LB77', varianteNombre: 'Diámetro 2 1/2" HDG UL', precio: 74.00 },
      { codigoInterno: '4025279', modelo: 'LB87', varianteNombre: 'Diámetro 3" HDG UL', precio: 90.00 },
    ],
  },
  // 9. CAJAS CONDULET HIERRO MALEABLE TIPO LL (CON TAPA Y EMPAQUE HDG UL)
  {
    codigoPadre: 'PRODUIT-CONDULET-MI-LL',
    nombre: 'Caja Condulet de Hierro Maleable Tipo LL con Tapa + Empaque HDG UL',
    marca: 'Produit',
    categoria: 'Cajas y Condulets Heavy Duty',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets Heavy Duty HDG',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo LL en hierro maleable galvanizado en caliente HDG con tapa y empaque incluidos UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025280', modelo: 'LL17', varianteNombre: 'Diámetro 1/2" HDG UL', precio: 7.00 },
      { codigoInterno: '4025281', modelo: 'LL27', varianteNombre: 'Diámetro 3/4" HDG UL', precio: 8.50 },
      { codigoInterno: '4025282', modelo: 'LL37', varianteNombre: 'Diámetro 1" HDG UL', precio: 11.60 },
      { codigoInterno: '4025283', modelo: 'LL57', varianteNombre: 'Diámetro 1 1/2" HDG UL', precio: 20.00 },
      { codigoInterno: '4025284', modelo: 'LL67', varianteNombre: 'Diámetro 2" HDG UL', precio: 29.00 },
      { codigoInterno: '4025285', modelo: 'LL77', varianteNombre: 'Diámetro 2 1/2" HDG UL', precio: 74.00 },
      { codigoInterno: '4025286', modelo: 'LL87', varianteNombre: 'Diámetro 3" HDG UL', precio: 90.00 },
    ],
  },
  // 10. CAJAS CONDULET HIERRO MALEABLE TIPO LR (CON TAPA Y EMPAQUE HDG UL)
  {
    codigoPadre: 'PRODUIT-CONDULET-MI-LR',
    nombre: 'Caja Condulet de Hierro Maleable Tipo LR con Tapa + Empaque HDG UL',
    marca: 'Produit',
    categoria: 'Cajas y Condulets Heavy Duty',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets Heavy Duty HDG',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo LR en hierro maleable galvanizado en caliente HDG con tapa y empaque incluidos UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025287', modelo: 'LR17', varianteNombre: 'Diámetro 1/2" HDG UL', precio: 7.00 },
      { codigoInterno: '4025288', modelo: 'LR27', varianteNombre: 'Diámetro 3/4" HDG UL', precio: 8.50 },
      { codigoInterno: '4025289', modelo: 'LR37', varianteNombre: 'Diámetro 1" HDG UL', precio: 11.60 },
      { codigoInterno: '4025290', modelo: 'LR57', varianteNombre: 'Diámetro 1 1/2" HDG UL', precio: 20.00 },
      { codigoInterno: '4025291', modelo: 'LR67', varianteNombre: 'Diámetro 2" HDG UL', precio: 29.00 },
      { codigoInterno: '4025292', modelo: 'LR77', varianteNombre: 'Diámetro 2 1/2" HDG UL', precio: 74.00 },
      { codigoInterno: '4025293', modelo: 'LR87', varianteNombre: 'Diámetro 3" HDG UL', precio: 90.00 },
    ],
  },
  // 11. CAJAS CONDULET HIERRO MALEABLE TIPO T (CON TAPA Y EMPAQUE HDG UL)
  {
    codigoPadre: 'PRODUIT-CONDULET-MI-T',
    nombre: 'Caja Condulet de Hierro Maleable Tipo T con Tapa + Empaque HDG UL',
    marca: 'Produit',
    categoria: 'Cajas y Condulets Heavy Duty',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets Heavy Duty HDG',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo T en hierro maleable galvanizado en caliente HDG con tapa y empaque incluidos UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025294', modelo: 'T17', varianteNombre: 'Diámetro 1/2" HDG UL', precio: 10.00 },
      { codigoInterno: '4025295', modelo: 'T27', varianteNombre: 'Diámetro 3/4" HDG UL', precio: 12.00 },
      { codigoInterno: '4025296', modelo: 'T37', varianteNombre: 'Diámetro 1" HDG UL', precio: 15.00 },
      { codigoInterno: '4025297', modelo: 'T57', varianteNombre: 'Diámetro 1 1/2" HDG UL', precio: 21.00 },
      { codigoInterno: '4025298', modelo: 'T67', varianteNombre: 'Diámetro 2" HDG UL', precio: 31.00 },
      { codigoInterno: '4025299', modelo: 'T77', varianteNombre: 'Diámetro 2 1/2" HDG UL', precio: 78.00 },
      { codigoInterno: '4025300', modelo: 'T87', varianteNombre: 'Diámetro 3" HDG UL', precio: 102.00 },
    ],
  },
  // 12. CANAL STRUT HEAVY DUTY 2.5MM
  {
    codigoPadre: 'PRODUIT-CANAL-STRUT-25MM',
    nombre: 'Canal Strut Heavy Duty 1 5/8" x 1 5/8" x 3M (Espesor 2.5mm)',
    marca: 'Produit',
    categoria: 'Sistemas de Soportería Strut',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Canales y Soportería Strut',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Riel / Canal Strut reforzado de 2.5 mm de espesor para soporte de cargas extrapesadas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025301', modelo: 'A12', varianteNombre: 'Liso 1 5/8" x 1 5/8" x 3m (2.5mm)', precio: 26.00 },
      { codigoInterno: '4025302', modelo: 'A12S', varianteNombre: 'Ranurado 1 5/8" x 1 5/8" x 3m (2.5mm)', precio: 26.00 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación de productos Produit con Variantes...');

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_PRODUIT) {
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

  console.log(`\n🎉 Importación Produit completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando productos Produit:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
