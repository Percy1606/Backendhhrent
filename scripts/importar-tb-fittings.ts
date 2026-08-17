import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE T&B FITTINGS CON VARIANTES AGRUPADAS
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

const GRUPOS_TB: GrupoProductoPadre[] = [
  // 1. CONECTOR STARTECK XP AL CL1 DIV1
  {
    codigoPadre: 'TB-CONECT-STARTECK-XP',
    nombre: 'Conector Starteck XP de Aluminio CL1 DIV1',
    marca: 'T&B Fittings',
    categoria: 'Conectores y Fitinería Antiexplosiva',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Teck y Starteck',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector antiexplosivo Starteck XP de aluminio para cable armado Teck / MC en áreas clasificadas Clase I División 1.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003715', modelo: 'STX050-464', varianteNombre: 'Diámetro 1/2" CL1 DIV1', precio: 65.69 },
      { codigoInterno: '4003716', modelo: 'STX075-466', varianteNombre: 'Diámetro 3/4" CL1 DIV1', precio: 81.00 },
      { codigoInterno: '4005025', modelo: 'STEX075', varianteNombre: 'Diámetro 3/4" CL1 DIV1 STEX', precio: 51.07 },
      { codigoInterno: '4003717', modelo: 'STX100-468', varianteNombre: 'Diámetro 1" CL1 DIV1', precio: 117.93 },
      { codigoInterno: '4005026', modelo: 'STEX100', varianteNombre: 'Diámetro 1" CL1 DIV1 STEX', precio: 67.98 },
      { codigoInterno: '4003718', modelo: 'STX125-469', varianteNombre: 'Diámetro 1 1/4" CL1 DIV1', precio: 108.69 },
      { codigoInterno: '4003719', modelo: 'STX150-471', varianteNombre: 'Diámetro 1 1/2" CL1 DIV1', precio: 212.50 },
      { codigoInterno: '4003720', modelo: 'STX200-474', varianteNombre: 'Diámetro 2" CL1 DIV1', precio: 296.71 },
    ],
  },
  // 2. COMPUESTO SELLADOR P/ STARTECK XP
  {
    codigoPadre: 'TB-SELLADOR-STARTECK',
    nombre: 'Compuesto Sellador para Conector Starteck XP',
    marca: 'T&B Fittings',
    categoria: 'Conectores y Fitinería Antiexplosiva',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Teck y Starteck',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Compuesto sellador especial (tipo masilla o líquido) para relleno de barrera de explosión en conectores Starteck XP.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003729', modelo: 'SC65', varianteNombre: 'Putty Type (Masilla)', precio: 25.00 },
      { codigoInterno: '4003730', modelo: 'SC4-KIT', varianteNombre: 'Liquid Type (Kit Líquido)', precio: 37.91 },
    ],
  },
  // 3. CONECTOR TECK ALUMINIO (ST)
  {
    codigoPadre: 'TB-CONECT-TECK-AL',
    nombre: 'Conector Teck de Aluminio ST',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Teck y Starteck',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector hermético de aluminio serie ST para cable armado Teck / armadura interbloqueada.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003728', modelo: 'STED075', varianteNombre: '3/4" (0.86"-1.205") Director AL', precio: 83.00 },
      { codigoInterno: '4003692', modelo: 'ST050-464', varianteNombre: '1/2" (0.60"-0.76")', precio: 19.41 },
      { codigoInterno: '4003693', modelo: 'ST050-465', varianteNombre: '1/2" (0.725"-0.885")', precio: 26.17 },
      { codigoInterno: '4003694', modelo: 'ST050-466', varianteNombre: '1/2" (0.825"-0.985")', precio: 25.34 },
      { codigoInterno: '4003695', modelo: 'ST075-467', varianteNombre: '3/4" (0.88"-1.065")', precio: 47.85 },
      { codigoInterno: '4003696', modelo: 'ST075-468', varianteNombre: '3/4" (1.025"-1.205")', precio: 30.97 },
      { codigoInterno: '4003697', modelo: 'ST100-469', varianteNombre: '1" (1.187"-1.375")', precio: 62.03 },
      { codigoInterno: '4003698', modelo: 'ST125-470', varianteNombre: '1 1/4" (1.36"-1.63")', precio: 141.20 },
      { codigoInterno: '4003699', modelo: 'ST125-550', varianteNombre: '1 1/4" (1.50"-1.63")', precio: 135.61 },
      { codigoInterno: '4003700', modelo: 'ST125-471', varianteNombre: '1 1/4" (1.60"-1.88")', precio: 108.00 },
      { codigoInterno: '4003701', modelo: 'ST150-472', varianteNombre: '1 1/2" (1.70"-1.97")', precio: 141.12 },
      { codigoInterno: '4003702', modelo: 'ST150-473', varianteNombre: '1 1/2" (1.90"-2.19")', precio: 168.29 },
      { codigoInterno: '4003703', modelo: 'ST200-551', varianteNombre: '2" (1.90"-2.187")', precio: 198.51 },
      { codigoInterno: '4003704', modelo: 'ST200-474', varianteNombre: '2" (2.10"-2.375")', precio: 92.42 },
      { codigoInterno: '4003705', modelo: 'ST200-475', varianteNombre: '2" (2.30"-2.565")', precio: 219.58 },
      { codigoInterno: '4003706', modelo: 'ST200-476', varianteNombre: '2" (2.50"-2.75")', precio: 166.31 },
      { codigoInterno: '4003707', modelo: 'ST250-477', varianteNombre: '2 1/2" (2.38"-2.64")', precio: 116.81 },
      { codigoInterno: '4003708', modelo: 'ST250-478', varianteNombre: '2 1/2" (2.58"-2.84")', precio: 357.04 },
      { codigoInterno: '4003709', modelo: 'ST300-479', varianteNombre: '3" (2.79"-3.06")', precio: 382.42 },
      { codigoInterno: '4003710', modelo: 'ST300-480', varianteNombre: '3" (3.00"-3.27")', precio: 439.44 },
      { codigoInterno: '4003711', modelo: 'ST300-481', varianteNombre: '3" (3.21"-3.48")', precio: 236.47 },
      { codigoInterno: '4003712', modelo: 'ST400-484', varianteNombre: '4" (3.81"-4.03")', precio: 206.09 },
      { codigoInterno: '4003713', modelo: 'ST400-485', varianteNombre: '4" (3.965"-4.185")', precio: 195.11 },
      { codigoInterno: '4003714', modelo: 'ST400-486', varianteNombre: '4" (3.965"-4.185") ST400-486', precio: 198.04 },
    ],
  },
  // 4. CONECTOR HERMÉTICO TECK
  {
    codigoPadre: 'TB-CONECT-HERM-TECK',
    nombre: 'Conector Hermético Teck para Cable',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Prensaestopas y Conectores Herméticos',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector hermético de precisión serie 104xx para cables Teck.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4010329', modelo: '10465-TB', varianteNombre: '1/2" OD (0.75"-0.885")', precio: 24.35 },
      { codigoInterno: '4007185', modelo: '10467', varianteNombre: '3/4" OD (0.88"-1.065")', precio: 44.81 },
    ],
  },
  // 5. PRENSAESTOPAS DE ALUMINIO UL
  {
    codigoPadre: 'TB-PRENSAESTOPA-AL',
    nombre: 'Prensaestopa de Aluminio para Cable UL',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Prensaestopas y Conectores Herméticos',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Prensaestopa hermética de aluminio con certificación UL para sujeción y sellado de cables.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003721', modelo: '2921AL', varianteNombre: '1/2" (Rango 0.31"-0.56")', precio: 6.56 },
      { codigoInterno: '4003722', modelo: '2922AL', varianteNombre: '1/2" (Rango 0.50"-0.75")', precio: 6.56 },
      { codigoInterno: '4003723', modelo: '2930AL', varianteNombre: '3/4" (Rango 0.125"-0.375")', precio: 6.87 },
      { codigoInterno: '4003724', modelo: '2931AL', varianteNombre: '3/4" (Rango 0.31"-0.56")', precio: 13.55 },
      { codigoInterno: '4003725', modelo: '2932AL', varianteNombre: '3/4" (Rango 0.50"-0.75")', precio: 13.31 },
      { codigoInterno: '4003726', modelo: '2942AL', varianteNombre: '1" (Rango 0.70"-0.95")', precio: 5.55 },
    ],
  },
  // 6. CONTRATUERCA ACERO INOXIDABLE SST
  {
    codigoPadre: 'TB-CONTRATUERCA-SST',
    nombre: 'Contratuerca de Acero Inoxidable SST UL',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Contratuerca metálica de acero inoxidable serie SST de alta resistencia a la corrosión.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007187', modelo: '143SST', varianteNombre: 'Diámetro 1" SST UL', precio: 3.46 },
      { codigoInterno: '4007188', modelo: '146SST', varianteNombre: 'Diámetro 2" SST UL', precio: 4.83 },
    ],
  },
  // 7. CONECTOR HERMÉTICO LIQUIDTIGHT RECTO
  {
    codigoPadre: 'TB-CONECT-RECTO-LT',
    nombre: 'Conector Recto Hermético Liquidtight (LT) UL',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Liquidtight',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector recto estanque / hermético para tubo flexible Liquidtight.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4013365', modelo: '5332', varianteNombre: '1/2" ST Liquidtight UL', precio: 6.82 },
      { codigoInterno: '4003734', modelo: '5235', varianteNombre: '1 1/4" ST Liquidtight UL', precio: 11.43 },
      { codigoInterno: '4003735', modelo: '5236', varianteNombre: '1 1/2" ST Liquidtight UL', precio: 15.00 },
      { codigoInterno: '4003736', modelo: '5237', varianteNombre: '2" ST Liquidtight UL', precio: 26.50 },
      { codigoInterno: '4005486', modelo: '5238', varianteNombre: '2 1/2" FE Liquidtight UL', precio: 27.05 },
      { codigoInterno: '4005487', modelo: '5239', varianteNombre: '3" FE Liquidtight UL', precio: 134.29 },
      { codigoInterno: '4005488', modelo: '5240', varianteNombre: '4" FE Liquidtight UL', precio: 181.69 },
      { codigoInterno: '4006470', modelo: '5336GR', varianteNombre: '1 1/2" ST Liquidtight con Tierra UL', precio: 45.78 },
      { codigoInterno: '4006472', modelo: '5337GR', varianteNombre: '2" ST Liquidtight con Tierra UL', precio: 66.02 },
      { codigoInterno: '4006473', modelo: '5339GR', varianteNombre: '3" ST Liquidtight con Tierra UL', precio: 352.17 },
      { codigoInterno: '4006474', modelo: '5340GR', varianteNombre: '4" ST Liquidtight con Tierra UL', precio: 345.72 },
    ],
  },
  // 8. CONECTOR HERMÉTICO LIQUIDTIGHT 45°
  {
    codigoPadre: 'TB-CONECT-45-LT',
    nombre: 'Conector 45° Hermético Liquidtight (LT) UL',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Liquidtight',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector angular a 45° hermético para conducto flexible Liquidtight.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4013370', modelo: '5342', varianteNombre: '1/2" ST 5342 UL', precio: 15.43 },
      { codigoInterno: '4003737', modelo: '5242', varianteNombre: '1/2" ST 5242 UL', precio: 4.42 },
      { codigoInterno: '4003738', modelo: '5243', varianteNombre: '3/4" ST 5243 UL', precio: 8.47 },
      { codigoInterno: '4013443', modelo: '5344', varianteNombre: '1" ST 5344 UL', precio: 17.60 },
      { codigoInterno: '4003739', modelo: '5244', varianteNombre: '1" ST 5244 UL', precio: 14.36 },
    ],
  },
  // 9. CONECTOR HERMÉTICO LIQUIDTIGHT 90°
  {
    codigoPadre: 'TB-CONECT-90-LT',
    nombre: 'Conector 90° Hermético Liquidtight (LT) UL',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Liquidtight',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector en ángulo recto a 90° estanque / hermético para tubo flexible Liquidtight.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003740', modelo: '5252', varianteNombre: '1/2" ST 5252 UL', precio: 8.00 },
      { codigoInterno: '4003742', modelo: '5254', varianteNombre: '1" ST 5254 UL', precio: 12.36 },
      { codigoInterno: '4005489', modelo: '5255', varianteNombre: '1 1/4" FE 5255 UL', precio: 20.42 },
      { codigoInterno: '4005490', modelo: '5256', varianteNombre: '1 1/2" FE 5256 UL', precio: 30.00 },
    ],
  },
  // 10. CONECTOR HUB BULLET Y HUB ZINC / GROUND
  {
    codigoPadre: 'TB-CONECT-HUB',
    nombre: 'Conector HUB Hermético para Caja / Tablero UL',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Hubs y Conexiones a Caja',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector HUB tipo Bullet / Zinc fundido hermético al agua y al aceite para entradas a tableros y cajas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003441', modelo: '371', varianteNombre: '3/4" ST Bullet UL', precio: 9.43 },
      { codigoInterno: '4003442', modelo: '372', varianteNombre: '1" ST Bullet UL', precio: 12.00 },
      { codigoInterno: '4003443', modelo: '374', varianteNombre: '1 1/2" MI Bullet UL', precio: 16.05 },
      { codigoInterno: '4003445', modelo: 'H075-TB', varianteNombre: '3/4" Zinc UL', precio: 5.07 },
      { codigoInterno: '4003446', modelo: 'H100-TB', varianteNombre: '1" Zinc UL', precio: 6.05 },
      { codigoInterno: '4003449', modelo: 'H075GR-TB', varianteNombre: '3/4" Zinc con Tierra UL', precio: 7.89 },
      { codigoInterno: '4003450', modelo: 'H100GR-TB', varianteNombre: '1" Zinc con Tierra UL', precio: 8.79 },
      { codigoInterno: '4003451', modelo: 'H150GR-TB', varianteNombre: '1 1/2" Zinc con Tierra UL', precio: 16.88 },
    ],
  },
  // 11. CONTRATUERCAS ESTÁNDAR
  {
    codigoPadre: 'TB-CONTRATUERCA-STD',
    nombre: 'Contratuerca Metálica Conduit ST / MI UL',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Contratuerca de acero / hierro maleable galvanizado para tubería conduit roscada.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003402', modelo: '141', varianteNombre: '1/2" ST UL', precio: 0.80 },
      { codigoInterno: '4003403', modelo: '142-TB', varianteNombre: '3/4" ST UL', precio: 1.09 },
      { codigoInterno: '4003404', modelo: '143', varianteNombre: '1" ST UL', precio: 3.33 },
      { codigoInterno: '4003405', modelo: '144', varianteNombre: '1 1/4" ST UL', precio: 4.04 },
      { codigoInterno: '4003406', modelo: '145', varianteNombre: '1 1/2" ST UL', precio: 4.50 },
      { codigoInterno: '4003407', modelo: '146-TB', varianteNombre: '2" ST UL', precio: 4.84 },
      { codigoInterno: '4003408', modelo: '147', varianteNombre: '2 1/2" MI UL', precio: 6.72 },
      { codigoInterno: '4003409', modelo: '148', varianteNombre: '3" MI UL', precio: 17.93 },
      { codigoInterno: '4003410', modelo: '150', varianteNombre: '4" MI UL', precio: 22.00 },
    ],
  },
  // 12. TUERCAS Y BOQUILLAS DE PROTECCIÓN
  {
    codigoPadre: 'TB-TUERCA-STD',
    nombre: 'Tuerca / Boquilla Terminal Conduit ST / MI UL',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tuerca / boquilla metálica para extremo de tubo conduit roscado.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003432', modelo: '122', varianteNombre: '1/2" ST UL', precio: 0.37 },
      { codigoInterno: '4003433', modelo: '123', varianteNombre: '3/4" ST UL', precio: 0.49 },
      { codigoInterno: '4003434', modelo: '124', varianteNombre: '1" ST UL', precio: 0.84 },
      { codigoInterno: '4003435', modelo: '125-TB', varianteNombre: '1 1/4" ST UL', precio: 1.21 },
      { codigoInterno: '4003436', modelo: '126', varianteNombre: '1 1/2" ST UL', precio: 1.80 },
      { codigoInterno: '4003438', modelo: '128', varianteNombre: '2 1/2" MI UL', precio: 28.46 },
      { codigoInterno: '4003439', modelo: '129', varianteNombre: '3" MI UL', precio: 7.39 },
      { codigoInterno: '4003440', modelo: '131-TB', varianteNombre: '4" MI UL', precio: 18.43 },
    ],
  },
  // 13. TUERCA AISLADA CON PUESTA A TIERRA (GROUNDING BUSHING)
  {
    codigoPadre: 'TB-TUERCA-AISL-GROUND',
    nombre: 'Tuerca Aislada de Hierro Maleable con Puesta a Tierra',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Boquilla / tuerca aislada con borne para puesta a tierra de protección en tubos conduit.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003411', modelo: '3870-TB', varianteNombre: '1/2" MI (AL 14-4 AWG)', precio: 5.70 },
      { codigoInterno: '4003412', modelo: '3871-TB', varianteNombre: '3/4" MI (AL 14-4 AWG)', precio: 15.20 },
      { codigoInterno: '4003414', modelo: '3882', varianteNombre: '1" MI (AL 8-2/0 AWG)', precio: 12.58 },
      { codigoInterno: '4003415', modelo: '3873', varianteNombre: '1 1/4" MI (AL 14-4 AWG)', precio: 7.76 },
      { codigoInterno: '4003416', modelo: '3883', varianteNombre: '1 1/4" MI (AL 8-2/0 AWG)', precio: 10.86 },
      { codigoInterno: '4003417', modelo: '3874', varianteNombre: '1 1/2" MI (AL 14-4 AWG)', precio: 8.06 },
      { codigoInterno: '4003418', modelo: '3884', varianteNombre: '1 1/2" MI (AL 8-2/0 AWG)', precio: 12.30 },
      { codigoInterno: '4003420', modelo: '3886', varianteNombre: '2 1/2" MI (AL 8-2/0 AWG)', precio: 17.02 },
      { codigoInterno: '4003421', modelo: '3887', varianteNombre: '3" MI (AL 8-2/0 AWG)', precio: 22.03 },
      { codigoInterno: '4003422', modelo: '3864', varianteNombre: '4" MI (AL 8-2/0 AWG)', precio: 28.12 },
    ],
  },
  // 14. TUERCA BLACKJACK CON TIERRA
  {
    codigoPadre: 'TB-TUERCA-BLACKJACK',
    nombre: 'Tuerca Blackjack Aislada con Puesta a Tierra',
    marca: 'T&B Fittings',
    categoria: 'Fitinería Electromecánica',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Tuercas y Contratuercas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Boquilla de puesta a tierra tipo Blackjack de rápida instalación y protección aislante.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003423', modelo: 'BG050-14-20', varianteNombre: '1/2" MI (14-2/0 AWG)', precio: 5.32 },
      { codigoInterno: '4003424', modelo: 'BG075-14-20', varianteNombre: '3/4" MI (14-2/0 AWG)', precio: 16.87 },
      { codigoInterno: '4003425', modelo: 'BG100-14-20', varianteNombre: '1" MI (14-2/0 AWG)', precio: 11.89 },
      { codigoInterno: '4003426', modelo: 'BG125-14-20', varianteNombre: '1 1/4" MI (14-2/0 AWG)', precio: 12.71 },
      { codigoInterno: '4003427', modelo: 'BG150-14-20', varianteNombre: '1 1/2" MI (14-2/0 AWG)', precio: 15.00 },
      { codigoInterno: '4003428', modelo: 'BG200-14-20', varianteNombre: '2" MI (14-2/0 AWG)', precio: 18.76 },
      { codigoInterno: '4003429', modelo: 'BG250-14-20', varianteNombre: '2 1/2" MI (14-2/0 AWG)', precio: 20.07 },
    ],
  },
  // 15. CONDULET BLUEKOTE TIPO C
  {
    codigoPadre: 'TB-CONDULET-C',
    nombre: 'Condulet BlueKote Hierro Maleable Tipo C UL',
    marca: 'T&B Fittings',
    categoria: 'Cajas y Condulets Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets BlueKote',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo C con recubrimiento protector anticorrosivo BlueKote.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003457', modelo: 'C17', varianteNombre: '1/2" MI Tipo C UL', precio: 8.06 },
      { codigoInterno: '4003458', modelo: 'C27', varianteNombre: '3/4" MI Tipo C UL', precio: 18.33 },
      { codigoInterno: '4003460', modelo: 'C47', varianteNombre: '1 1/4" MI Tipo C UL', precio: 22.85 },
      { codigoInterno: '4003461', modelo: 'C57', varianteNombre: '1 1/2" MI Tipo C UL', precio: 45.80 },
      { codigoInterno: '4003462', modelo: 'C67', varianteNombre: '2" MI Tipo C UL', precio: 46.14 },
      { codigoInterno: '4003463', modelo: 'C77-TB', varianteNombre: '2 1/2" MI Tipo C UL', precio: 109.56 },
    ],
  },
  // 16. CONDULET BLUEKOTE TIPO LB
  {
    codigoPadre: 'TB-CONDULET-LB',
    nombre: 'Condulet BlueKote Hierro Maleable Tipo LB UL',
    marca: 'T&B Fittings',
    categoria: 'Cajas y Condulets Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets BlueKote',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo LB con recubrimiento BlueKote para curvas de 90° hacia atrás.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003465', modelo: 'LB17', varianteNombre: '1/2" MI Tipo LB UL', precio: 10.79 },
      { codigoInterno: '4003466', modelo: 'LB27', varianteNombre: '3/4" MI Tipo LB UL', precio: 17.63 },
      { codigoInterno: '4003467', modelo: 'LB37', varianteNombre: '1" MI Tipo LB UL', precio: 36.26 },
      { codigoInterno: '4003468', modelo: 'LB47', varianteNombre: '1 1/4" MI Tipo LB UL', precio: 40.00 },
      { codigoInterno: '4003469', modelo: 'LB57', varianteNombre: '1 1/2" MI Tipo LB UL', precio: 53.99 },
      { codigoInterno: '4003470', modelo: 'LB67', varianteNombre: '2" MI Tipo LB UL', precio: 76.62 },
      { codigoInterno: '4003471', modelo: 'LB77', varianteNombre: '2 1/2" MI Tipo LB UL', precio: 112.39 },
      { codigoInterno: '4003472', modelo: 'LB87', varianteNombre: '3" MI Tipo LB UL', precio: 138.92 },
    ],
  },
  // 17. CONDULET BLUEKOTE TIPO LL
  {
    codigoPadre: 'TB-CONDULET-LL',
    nombre: 'Condulet BlueKote Hierro Maleable Tipo LL UL',
    marca: 'T&B Fittings',
    categoria: 'Cajas y Condulets Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets BlueKote',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo LL con recubrimiento BlueKote para desvíos hacia la izquierda.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003474', modelo: 'LL17', varianteNombre: '1/2" MI Tipo LL UL', precio: 10.29 },
      { codigoInterno: '4003475', modelo: 'LL27', varianteNombre: '3/4" MI Tipo LL UL', precio: 25.00 },
      { codigoInterno: '4003476', modelo: 'LL37', varianteNombre: '1" MI Tipo LL UL', precio: 27.00 },
      { codigoInterno: '4003477', modelo: 'LL47', varianteNombre: '1 1/4" MI Tipo LL UL', precio: 29.00 },
      { codigoInterno: '4003478', modelo: 'LL57', varianteNombre: '1 1/2" MI Tipo LL UL', precio: 46.17 },
      { codigoInterno: '4003479', modelo: 'LL67', varianteNombre: '2" MI Tipo LL UL', precio: 72.96 },
      { codigoInterno: '4003480', modelo: 'LL77', varianteNombre: '2 1/2" MI Tipo LL UL', precio: 171.80 },
    ],
  },
  // 18. CONDULET BLUEKOTE TIPO LR
  {
    codigoPadre: 'TB-CONDULET-LR',
    nombre: 'Condulet BlueKote Hierro Maleable Tipo LR UL',
    marca: 'T&B Fittings',
    categoria: 'Cajas y Condulets Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets BlueKote',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo LR con recubrimiento BlueKote para desvíos hacia la derecha.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003483', modelo: 'LR17', varianteNombre: '1/2" MI Tipo LR UL', precio: 11.75 },
      { codigoInterno: '4003484', modelo: 'LR27', varianteNombre: '3/4" MI Tipo LR UL', precio: 24.88 },
      { codigoInterno: '4003485', modelo: 'LR37', varianteNombre: '1" MI Tipo LR UL', precio: 25.77 },
      { codigoInterno: '4003486', modelo: 'LR47', varianteNombre: '1 1/4" MI Tipo LR UL', precio: 28.00 },
      { codigoInterno: '4003487', modelo: 'LR57', varianteNombre: '1 1/2" MI Tipo LR UL', precio: 35.70 },
      { codigoInterno: '4003488', modelo: 'LR67', varianteNombre: '2" MI Tipo LR UL', precio: 54.94 },
      { codigoInterno: '4003489', modelo: 'LR77', varianteNombre: '2 1/2" MI Tipo LR UL', precio: 126.30 },
    ],
  },
  // 19. CONDULET BLUEKOTE TIPO T (ESTÁNDAR Y FORM 8)
  {
    codigoPadre: 'TB-CONDULET-T',
    nombre: 'Condulet BlueKote Hierro Maleable Tipo T UL',
    marca: 'T&B Fittings',
    categoria: 'Cajas y Condulets Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets BlueKote',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de condulet tipo T de 3 salidas para derivaciones de tubería conduit.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003492', modelo: 'T17', varianteNombre: '1/2" MI Tipo T UL', precio: 25.00 },
      { codigoInterno: '4003496', modelo: 'T27', varianteNombre: '3/4" MI Tipo T UL', precio: 43.19 },
      { codigoInterno: '4006466', modelo: 'T28', varianteNombre: '3/4" MI Tipo T Form 8 UL', precio: 18.37 },
      { codigoInterno: '4003497', modelo: 'T37', varianteNombre: '1" MI Tipo T UL', precio: 44.89 },
      { codigoInterno: '4003498', modelo: 'T47', varianteNombre: '1 1/4" MI Tipo T UL', precio: 46.00 },
      { codigoInterno: '4003499', modelo: 'T57', varianteNombre: '1 1/2" MI Tipo T UL', precio: 50.00 },
      { codigoInterno: '4003500', modelo: 'T67', varianteNombre: '2" MI Tipo T UL', precio: 68.29 },
      { codigoInterno: '4006468', modelo: 'T68', varianteNombre: '2" MI Tipo T Form 8 UL', precio: 71.91 },
      { codigoInterno: '4003501', modelo: 'T77', varianteNombre: '2 1/2" MI Tipo T UL', precio: 114.60 },
    ],
  },
  // 20. CONDULET UNIVERSAL LU
  {
    codigoPadre: 'TB-CONDULET-LU',
    nombre: 'Condulet BlueKote Universal LU UL',
    marca: 'T&B Fittings',
    categoria: 'Cajas y Condulets Conduit',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets BlueKote',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Condulet multi-orientación universal modelo LU para fácil paso de cables.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4010560', modelo: 'LU17', varianteNombre: '1/2" Universal LU UL', precio: 9.10 },
      { codigoInterno: '4003453', modelo: 'LU27', varianteNombre: '3/4" Universal LU UL', precio: 17.35 },
      { codigoInterno: '4003454', modelo: 'LU37', varianteNombre: '1" Universal LU UL', precio: 22.27 },
      { codigoInterno: '4003456', modelo: 'LU67', varianteNombre: '2" Universal LU UL', precio: 55.19 },
    ],
  },
  // 21. TAPAS PARA CONDULET (ACERO Y HIERRO CON EMPAQUE)
  {
    codigoPadre: 'TB-TAPA-CONDULET',
    nombre: 'Tapa para Condulet con Empaque UL',
    marca: 'T&B Fittings',
    categoria: 'Accesorios para Condulets',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets BlueKote',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tapa protectora metálica con empaque hermético incluido para cuerpos de condulet.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003504', modelo: '170S', varianteNombre: '1/2" ST con Empaque UL', precio: 3.22 },
      { codigoInterno: '4003505', modelo: '270S', varianteNombre: '3/4" ST con Empaque UL', precio: 9.00 },
      { codigoInterno: '4006475', modelo: '280', varianteNombre: '3/4" ST con Empaque Form 8 UL', precio: 3.52 },
      { codigoInterno: '4003506', modelo: '370S', varianteNombre: '1" ST con Empaque UL', precio: 9.50 },
      { codigoInterno: '4003507', modelo: '470S', varianteNombre: '1 1/4" ST con Empaque UL', precio: 10.00 },
      { codigoInterno: '4003508', modelo: '570S', varianteNombre: '1 1/2" ST con Empaque UL', precio: 10.50 },
      { codigoInterno: '4003509', modelo: '670S', varianteNombre: '2" ST con Empaque UL', precio: 16.24 },
      { codigoInterno: '4006477', modelo: '680STB', varianteNombre: '2" ST con Empaque Form 8 UL', precio: 10.83 },
      { codigoInterno: '4003510', modelo: '870S', varianteNombre: '2 1/2" - 3" ST con Empaque UL', precio: 19.85 },
      { codigoInterno: '4006130', modelo: '870F', varianteNombre: '2 1/2" - 3" FE Hierro con Empaque', precio: 38.27 },
      { codigoInterno: '4003511', modelo: '970S', varianteNombre: '3 1/2" - 4" ST con Empaque UL', precio: 35.50 },
    ],
  },
  // 22. EMPAQUETADURA DE NEOPRENO
  {
    codigoPadre: 'TB-EMPAQUETADURA-NEOPRENO',
    nombre: 'Empaquetadura de Neopreno para Condulet',
    marca: 'T&B Fittings',
    categoria: 'Accesorios para Condulets',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets BlueKote',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Empaque de goma/neopreno de estanqueidad para tapas de condulet.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003512', modelo: 'GASK 571', varianteNombre: 'Tamaño 1/2"', precio: 1.99 },
      { codigoInterno: '4003513', modelo: 'GASK 572', varianteNombre: 'Tamaño 3/4"', precio: 1.85 },
      { codigoInterno: '4003514', modelo: 'GASK 573', varianteNombre: 'Tamaño 1"', precio: 2.46 },
      { codigoInterno: '4003515', modelo: 'GASK 574', varianteNombre: 'Tamaño 1 1/4"', precio: 3.29 },
      { codigoInterno: '4003680', modelo: 'GASK 575', varianteNombre: 'Tamaño 1 1/2"', precio: 4.50 },
      { codigoInterno: '4003681', modelo: 'GASK 576', varianteNombre: 'Tamaño 2"', precio: 5.54 },
    ],
  },
  // 23. CAJAS FS RECTANGULARES (1 Y 2 ENTRADAS)
  {
    codigoPadre: 'TB-CAJA-FS',
    nombre: 'Caja FS Rectangular de Hierro Maleable UL',
    marca: 'T&B Fittings',
    categoria: 'Cajas de Paso y Conexión FS',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Cajas FS y FD',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Caja FS pesada de hierro para instalaciones expuestas e intemperie en plantas industriales.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4003685', modelo: 'FS1-TB', varianteNombre: '1 Entrada de 1/2" UL', precio: 60.00 },
      { codigoInterno: '4003686', modelo: 'FS2-TB', varianteNombre: '1 Entrada de 3/4" UL', precio: 26.03 },
      { codigoInterno: '4003687', modelo: 'FS3-TB', varianteNombre: '1 Entrada de 1" UL', precio: 33.66 },
      { codigoInterno: '4003688', modelo: 'FSC1-TB', varianteNombre: '2 Entradas de 1/2" FSC UL', precio: 33.58 },
      { codigoInterno: '4003689', modelo: 'FSC2-TB', varianteNombre: '2 Entradas de 3/4" FSC UL', precio: 35.00 },
      { codigoInterno: '4003690', modelo: 'FSC3-TB', varianteNombre: '2 Entradas de 1" FSC UL', precio: 39.17 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación y estructuración de productos T&B Fittings con Variantes...');

  // 1. Obtener o crear la Familia "Fitinería y Conectores"
  let familia = await prisma.familia.findUnique({
    where: { nombre: 'Fitinería y Conectores' },
  });

  if (!familia) {
    familia = await prisma.familia.create({
      data: {
        nombre: 'Fitinería y Conectores',
        descripcion: 'Conectores Teck, Starteck, prensaestopas, condulets, tuercas, cajas FS y accesorios T&B Fittings.',
      },
    });
  }

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_TB) {
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

  console.log(`\n🎉 Importación T&B completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando productos T&B Fittings:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
