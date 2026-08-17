import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA COMPLETA DE BURNDY - TERMINALES, CONECTORES, PERNERÍA Y PASTAS
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

const GRUPOS_BURNDY: GrupoProductoPadre[] = [
  // 1. TRENZAS FLEXIBLES DE COBRE BD
  {
    codigoPadre: 'BURNDY-TRENZA-BD',
    nombre: 'Trenza Flexible de Cobre Estañado con 2 Huecos de Fijación Serie BD',
    marca: 'Burndy',
    categoria: 'Conectores y Accesorios de Tierra',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Terminales y Conectores de Compresión',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Puente flexible / Trenza de puesta a tierra en cobre estañado multifilar con 2 orificios de fijación para absorción de dilataciones y vibraciones.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007727', modelo: 'BD12N', varianteNombre: 'TRENZA CU/ES 2H/FIJACIÓN, 12"/LARGO', precio: 44.00 },
      { codigoInterno: '4007721', modelo: 'BD18N', varianteNombre: 'TRENZA CU/ES 2H/FIJACIÓN, 18"/LARGO', precio: 47.00 },
    ],
  },

  // 2. CONECTOR DE TIERRA A TUBERÍA / ESTRUCTURA SERIE GAR
  {
    codigoPadre: 'BURNDY-CONECTOR-GAR',
    nombre: 'Conector Mecánico de Tierra a Tubo / Estructura Serie GAR',
    marca: 'Burndy',
    categoria: 'Conectores y Accesorios de Tierra',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Varillas de Tierra y Conectores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector de aleación de bronce de alta resistencia para conexión de cables de puesta a tierra a tubería o varilla.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007738', modelo: 'GAR3902BU', varianteNombre: 'CONEC TIER P/CA 4-4/0AWG VAR:1/2"-1"', precio: 20.00 },
      { codigoInterno: '4007743', modelo: 'GAR3903BU', varianteNombre: 'CONEC TIER P/CA 4-4/0AWG VAR:1 1/4"-2"', precio: 27.00 },
      { codigoInterno: '4007716', modelo: 'GAR6426', varianteNombre: 'CONEC TIERRA P/CA 4-2/0AWG VAR:5/8"-3/4"', precio: 36.00 },
      { codigoInterno: '4007709', modelo: 'GAR6429', varianteNombre: 'CONEC TIER P/CA 2/0-250MCM VAR:5/8"-3/4"', precio: 38.00 },
      { codigoInterno: '4007742', modelo: 'GAR1726', varianteNombre: 'CONEC TIER P/CA 4-2/0AWG VAR:15/8"-17/8"', precio: 40.00 },
      { codigoInterno: '4007740', modelo: 'GAR1426', varianteNombre: 'CONEC TIERRA P/CA 4-2/0AWG VAR:7/8"-1"', precio: 42.00 },
      { codigoInterno: '4007744', modelo: 'GAR1526', varianteNombre: 'CONEC TIER P/CA 4-2/0AWG VAR:11/8"-11/4"', precio: 46.00 },
      { codigoInterno: '4007741', modelo: 'GAR1429', varianteNombre: 'CONEC TIER P/CA 2/0-250MCM VAR:7/8"-1"', precio: 48.00 },
      { codigoInterno: '4007725', modelo: 'GAR1826', varianteNombre: 'CONEC TIER P/CA 4-2/0AWG VAR: 2"-2 3/8"', precio: 70.00 },
      { codigoInterno: '4007737', modelo: 'GAR3904BU', varianteNombre: 'CONEC TIER P/CA 4-4/0AWG VAR:21/2"-31/2"', precio: 70.00 },
      { codigoInterno: '4007739', modelo: 'GAR1829', varianteNombre: 'CONEC TIER P/CA 2/0-250MCM VAR:2"-2 3/8"', precio: 94.00 },
    ],
  },

  // 3. CONECTOR DE TIERRA A PLANCHA / ESTRUCTURA SERIE GB / GBM
  {
    codigoPadre: 'BURNDY-CONECTOR-GB-GBM',
    nombre: 'Conector de Tierra a Plancha / Barra Serie GB / GBM',
    marca: 'Burndy',
    categoria: 'Conectores y Accesorios de Tierra',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Varillas de Tierra y Conectores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector de bronce para fijación de 1 cable de puesta a tierra sobre superficie plana o pletina metálica.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007714', modelo: 'GBM26', varianteNombre: 'CONEC TIERRA CU 4AWG-2/0AWG 1T-1V', precio: 17.00 },
      { codigoInterno: '4007708', modelo: 'GB26', varianteNombre: 'CONEC TIERRA CU 4AWG-2/0AWG 2T-1V', precio: 26.00 },
      { codigoInterno: '4007690', modelo: 'GB29', varianteNombre: 'CONEC TIERRA CU 2/0AWG-250KCMIL 2T-1V', precio: 30.00 },
      { codigoInterno: '4007710', modelo: 'GBM29', varianteNombre: 'CONEC TIERRA CU 2/0AWG-250KCMIL 1T-1V', precio: 30.00 },
    ],
  },

  // 4. CONECTOR DE TIERRA PARA 2 CABLES SERIE GC / GCM / GC-CT
  {
    codigoPadre: 'BURNDY-CONECTOR-GC-GCM',
    nombre: 'Conector de Tierra para 2 Cables Paralelos Serie GC / GCM',
    marca: 'Burndy',
    categoria: 'Conectores y Accesorios de Tierra',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Varillas de Tierra y Conectores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector de bronce para amarrar 2 conductores de puesta a tierra en paralelo sobre superficie metálica.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4018460', modelo: 'GC2525CT', varianteNombre: 'CONEC TIERRA CU EST. 6AWG-1/0AWG 2T-2V', precio: 25.00 },
      { codigoInterno: '4007712', modelo: 'GCM26', varianteNombre: 'CONEC TIERRA CU 4AWG-2/0AWG 1T-2V', precio: 25.00 },
      { codigoInterno: '4020868', modelo: 'GC2626CT', varianteNombre: 'CONEC TIERRA CU EST. 2AWG-2/0AWG 2T-2V', precio: 26.00 },
      { codigoInterno: '4007707', modelo: 'GC2626', varianteNombre: 'CONEC TIERRA CU 4AWG-2/0AWG 2T-2V', precio: 31.00 },
      { codigoInterno: '4006518', modelo: 'GC2929CT', varianteNombre: 'CONEC TIERRA CU EST.2/0Str-250KCMIL. 2T-2V', precio: 32.00 },
      { codigoInterno: '4007711', modelo: 'GCM29', varianteNombre: 'CONEC TIERRA CU 2/0AWG-250KCMIL 1T-2V', precio: 35.00 },
      { codigoInterno: '4007715', modelo: 'GC2929', varianteNombre: 'CONEC TIERRA CU 2/0AWG-250KCMIL 2T-2V', precio: 38.00 },
    ],
  },

  // 5. CONECTORES DE TIERRA MULTICABLE SERIE GD / GK / GP
  {
    codigoPadre: 'BURNDY-CONECTOR-GD-GK-GP',
    nombre: 'Conector de Tierra Especial para Múltiples Cables (GD / GK / GP)',
    marca: 'Burndy',
    categoria: 'Conectores y Accesorios de Tierra',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Varillas de Tierra y Conectores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conectores especiales de aleación de cobre para derivación de 2 ó 3 cables a tuberías o estructuras.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007749', modelo: 'GP1426', varianteNombre: 'CONEC TIER P/2CA 4-2/0AWG TUBO 1/2"-3/4"', precio: 41.00 },
      { codigoInterno: '4012150', modelo: 'GD184C', varianteNombre: 'CONEC TIER P/2CA 8-4AWG TUBO 2"-2 3/8"', precio: 45.00 },
      { codigoInterno: '4007747', modelo: 'GK1426', varianteNombre: 'CONEC TIER P/3CA 4-2/0AWG TUBO 1/2"-3/4"', precio: 60.00 },
      { codigoInterno: '4007748', modelo: 'GP1429', varianteNombre: 'CONEC TIER P/2CA 3/0-250MCM TUBO1/2-3/4"', precio: 84.00 },
      { codigoInterno: '4106144', modelo: 'GK6429', varianteNombre: 'CONEC TIER P/3CA 2/0AWG-250MCM TUBO 3/8"', precio: 95.00 },
      { codigoInterno: '4007746', modelo: 'GK1429', varianteNombre: 'CONEC TIER P/3CA 2-250MCM TUBO1/2"-3/4"', precio: 130.00 },
    ],
  },

  // 6. CONECTORES COMPRESIÓN TIPO C (YC / YGHC / YGL / YGLR / YGHP)
  {
    codigoPadre: 'BURNDY-CONECTOR-TIPO-C',
    nombre: 'Conector de Compresión Tipo C de Cobre para Tierra (YC / YGHC / YGL / YGHP)',
    marca: 'Burndy',
    categoria: 'Terminales y Conectores de Compresión',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Terminales y Conectores de Compresión',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conector de cobre electrolítico de alta conductividad forma de C para empalmes y derivaciones irreversibles por compresión.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007750', modelo: 'YCHC2TC2', varianteNombre: 'CONECTOR TIPO C, P/CABLES 6 – 2 AWG', precio: 8.00 },
      { codigoInterno: '4007736', modelo: 'YC26C2', varianteNombre: 'CONECTOR TIPO C, P/CABLES 2/0 – 2 AWG', precio: 9.00 },
      { codigoInterno: '4007730', modelo: 'YC26C26', varianteNombre: 'CONECTOR TIPO C, P/CABLES 1/0 – 2/0 AWG', precio: 11.00 },
      { codigoInterno: '4007728', modelo: 'YC28C28', varianteNombre: 'CONECTOR TIPO C, P/CABLES 4/0 – 4/0 AWG', precio: 15.00 },
      { codigoInterno: '4007733', modelo: 'YGHC26C26', varianteNombre: 'CONECTOR TIPO C, P/CABLES 1 – 2/0 AWG', precio: 17.40 },
      { codigoInterno: '4007726', modelo: 'YGHC29C26', varianteNombre: 'CONECTOR TIPO C, P/CABLES 3/0–250MCM / 6-2/0AWG', precio: 19.40 },
      { codigoInterno: '4007720', modelo: 'YGHC29C29', varianteNombre: 'CONECTOR TIPO C, P/CABLES 3/0 – 250 MCM', precio: 19.40 },
      { codigoInterno: '4007735', modelo: 'YC28C26', varianteNombre: 'CONECTOR TIPO C, P/CABLES 4/0 – 2/0 AWG', precio: 20.00 },
      { codigoInterno: '4007724', modelo: 'YGHP34C29', varianteNombre: 'CON D/CU A COMP T/¨6¨ P/D:3/0AWG/250MCM', precio: 34.00 },
      { codigoInterno: '4007723', modelo: 'YGLR29C34', varianteNombre: 'CONEC TIER CRUZADO CAB:2-250MCM VAR:3/4¨', precio: 78.00 },
      { codigoInterno: '4007734', modelo: 'YGL29C29', varianteNombre: 'CONEC TIER CRUZADO CAB:2-250MCM VAR:5/8¨', precio: 100.00 },
    ],
  },

  // 7. CONECTORES MECÁNICOS SPLIT BOLT Y ESTRUCTURALES (KC / KSU / KVSU / UC / CP / AMS)
  {
    codigoPadre: 'BURNDY-CONECTOR-MECANICO-SPLITBOLT',
    nombre: 'Conector Mecánico / Split Bolt / Empalme Bimetálico (KC / KSU / KVSU / UC / CP / AMS)',
    marca: 'Burndy',
    categoria: 'Terminales y Conectores de Compresión',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Terminales y Conectores de Compresión',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conectores mecánicos Split Bolt y manguitos mecánicos de empalme bimetálicos para conexión Cu-Cu o Cu-Al.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007869', modelo: 'AMS2', varianteNombre: 'CONEC REDUC EMPAL BIMETÁLICO 14–2AWG', precio: 3.10 },
      { codigoInterno: '4007722', modelo: 'KSU23', varianteNombre: 'CONE SPLITBOLT CU-AL P/D:8-2/8-2AWG', precio: 5.70 },
      { codigoInterno: '4007731', modelo: 'KSU25', varianteNombre: 'CONE SPLITBOLT CU-AL P/D:2-1/0/10-1/0AWG', precio: 9.20 },
      { codigoInterno: '4007868', modelo: 'AMS250', varianteNombre: 'CONEC REDUC EMPAL BIMETÁLICO 6AWG–250MCM', precio: 12.00 },
      { codigoInterno: '4007732', modelo: 'KSU26', varianteNombre: 'CON SPLITBOLT CU-AL P/D:2-2/0/8-2/0AWG', precio: 15.00 },
      { codigoInterno: '4007820', modelo: 'UC2W28L', varianteNombre: 'CONECTOR PARALELO UNIV P/CU-AL CAB:2-4/0AWG', precio: 20.00 },
      { codigoInterno: '4007745', modelo: 'KVSU28', varianteNombre: 'CON TIER UNIV CU-AL P/D:1/0-4/0/6-4/0AWG', precio: 25.00 },
      { codigoInterno: '4007713', modelo: 'KC26', varianteNombre: 'CONEC TIER 1CAB2-2/0AWG ESTRUC PER 1/2"', precio: 34.00 },
      { codigoInterno: '4007819', modelo: 'UC4W28', varianteNombre: 'CONECTOR PARALELO UNIV P/CU-AL CAB:4-4/0AWG', precio: 40.00 },
      { codigoInterno: '4007818', modelo: 'CP34A34A', varianteNombre: 'CONECTOR PARAL UNIV P/CU-AL CAB:500MCM', precio: 120.00 },
    ],
  },

  // 8. TERMINALES Y MANGUITOS DE COMPRESIÓN DE COBRE SERIE YA / YAV / YGA / YS
  {
    codigoPadre: 'BURNDY-TERMINAL-COMPRESION-YA',
    nombre: 'Terminal y Manguito de Compresión de Cobre Serie YA / YAV / YGA / YS (hasta 35kV)',
    marca: 'Burndy',
    categoria: 'Terminales y Conectores de Compresión',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Terminales y Conectores de Compresión',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Terminal y cople de compresión tubular en cobre electrolítico estañado de alta conductividad.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007772', modelo: 'YAV10-BOX', varianteNombre: 'TER COM BAR STD CU/ES12-10AWG1H8-10 35KV', precio: 1.00 },
      { codigoInterno: '4007771', modelo: 'YAV10T2BOX', varianteNombre: 'TER COM BAR STD CU/ES12-10AWG1H5/16”35KV', precio: 1.00 },
      { codigoInterno: '4007769', modelo: 'YS6CLBOX', varianteNombre: 'CONEC TUB COMP CU/ES BAR STD 6AWG 35KV', precio: 1.20 },
      { codigoInterno: '4011651', modelo: 'YA8CL1BOX', varianteNombre: 'TER COM BAR STD CU/ES8AWG 1H1/4"35KV', precio: 1.54 },
      { codigoInterno: '4007770', modelo: 'YAV10R3-BOX', varianteNombre: 'TER COM BAR STD CU/ES12-10AWG1H1/4”35KV', precio: 1.60 },
      { codigoInterno: '4007754', modelo: 'YA6CLBOX', varianteNombre: 'TER COM BAR STD CU/ES6AWG 1H1/4¨35KV', precio: 1.80 },
      { codigoInterno: '4007773', modelo: 'YA4CLBOX', varianteNombre: 'TER COM BAR STD CU/ES4AWG 1H1/4¨35KV', precio: 2.30 },
      { codigoInterno: '4007775', modelo: 'YA4CL4BOX', varianteNombre: 'TER COM BAR STD CU/ES4AWG 1H3/8¨35KV', precio: 2.60 },
      { codigoInterno: '4007762', modelo: 'YA1CL4BOX', varianteNombre: 'TER COM BAR STD CU/ES1AWG 1H3/8¨35KV', precio: 2.80 },
      { codigoInterno: '4012955', modelo: 'YA2CL2BOX', varianteNombre: 'TER COM BAR STD CU/ES2AWG1H1/4”35KV', precio: 2.80 },
      { codigoInterno: '4007760', modelo: 'YA8CL3BOX', varianteNombre: 'TER COM BAR STD CU/ES8AWG 1H3/8¨35KV', precio: 2.80 },
      { codigoInterno: '4020635', modelo: 'YS4CLBOX', varianteNombre: 'CONEC TUB.COMP.CU/ES BAR STD 4AWG 35KV', precio: 2.80 },
      { codigoInterno: '4007752', modelo: 'YA6CL4BOX', varianteNombre: 'TER COM BAR STD CU/ES6AWG 1H3/8¨35KV', precio: 3.20 },
      { codigoInterno: '4007755', modelo: 'YA2CL4BOX', varianteNombre: 'TER COM BAR STD CU/ES2AWG 1H3/8¨35KV', precio: 3.40 },
      { codigoInterno: '4012956', modelo: 'YA2CLBOX', varianteNombre: 'TER COM BAR STD CU/ES2AWG 1H5/16”35KV', precio: 3.40 },
      { codigoInterno: '4007759', modelo: 'YA4CL3BOX', varianteNombre: 'TER COM BAR STD CU/ES4AWG 1H5/16¨35KV', precio: 3.50 },
      { codigoInterno: '4020636', modelo: 'YS2CLBOX', varianteNombre: 'CONEC TUB.COMP.CU/ES BAR STD 2AWG 35KV', precio: 3.60 },
      { codigoInterno: '4020637', modelo: 'YS1CLBOX', varianteNombre: 'CONEC TUB.COMP.CU/ES BAR STD 1AWG 35KV', precio: 4.30 },
      { codigoInterno: '4007751', modelo: 'YA26L6BOX', varianteNombre: 'TER COM BAR STD CU/ES2/0AWG 1H1/2¨35KV', precio: 5.00 },
      { codigoInterno: '4007812', modelo: 'YS26', varianteNombre: 'CONEC TUB COMP CU/ES BAR LAR 2/0AWG 35KV', precio: 5.00 },
      { codigoInterno: '4020638', modelo: 'YS26LBOX', varianteNombre: 'CONEC TUB.COMP.CU/ES BAR STD 2/0AWG 35KV', precio: 5.00 },
      { codigoInterno: '4007761', modelo: 'YA2CL6BOX', varianteNombre: 'TER COM BAR STD CU/ES2AWG 1H1/2¨35KV', precio: 5.20 },
      { codigoInterno: '4007753', modelo: 'YA25L6BOX', varianteNombre: 'TER COM BAR STD CU/ES1/0AWG 1H1/2¨35KV', precio: 5.50 },
      { codigoInterno: '4007767', modelo: 'YA26LBOX', varianteNombre: 'TER COM BAR STD CU/ES2/0AWG 1H3/8¨35KV', precio: 5.70 },
      { codigoInterno: '4007784', modelo: 'YA2C', varianteNombre: 'TER COM BAR LAR CU/ES2AWG 1H5/16¨35KV', precio: 7.10 },
      { codigoInterno: '4007798', modelo: 'YA252TC38', varianteNombre: 'TER COM BAR LAR CU/ES1/0AWG 2H3/8¨35KV', precio: 7.40 },
      { codigoInterno: '4007766', modelo: 'YA25L4BOX', varianteNombre: 'TER COM BAR STD CU/ES1/0AWG 1H3/8¨35KV', precio: 7.40 },
      { codigoInterno: '4007785', modelo: 'YA27', varianteNombre: 'TER COM BAR LAR CU/ES3/0AWG 1H1/2¨35KV', precio: 7.60 },
      { codigoInterno: '4007791', modelo: 'YA262TC38', varianteNombre: 'TER COM BAR LAR CU/ES2/0AWG 2H3/8¨35KV', precio: 7.80 },
      { codigoInterno: '4007801', modelo: 'YA26L2TC38', varianteNombre: 'TER COM BAR STD CU/ES2/0AWG 2H3/8¨35KV', precio: 8.00 },
      { codigoInterno: '4007782', modelo: 'YA2CN', varianteNombre: 'TER COM BAR LAR CU/ES2AWG 1H1/2¨35KV', precio: 8.00 },
      { codigoInterno: '4007783', modelo: 'YA28TC38', varianteNombre: 'TER COM BAR LAR CU/ES4AWG 1H3/8¨35KV', precio: 8.00 },
      { codigoInterno: '4007777', modelo: 'YA26', varianteNombre: 'TER COM BAR LAR CU/ES2/0AWG 1H3/8¨35KV', precio: 8.80 },
      { codigoInterno: '4007779', modelo: 'YA25N', varianteNombre: 'TER COM BAR LAR CU/ES1/0AWG 1H1/2¨35KV', precio: 9.40 },
      { codigoInterno: '4007794', modelo: 'YA2C2TC38', varianteNombre: 'TER COM BAR LAR CU/ES2AWG 2H3/8¨35KV', precio: 9.60 },
      { codigoInterno: '4007811', modelo: 'YS28', varianteNombre: 'CONEC TUB COMP CU/ES BAR LAR 4/0AWG 35KV', precio: 9.70 },
      { codigoInterno: '4007810', modelo: 'YS29', varianteNombre: 'CONEC TUB COMP CU/ES BAR LAR 250MCM 35KV', precio: 9.80 },
      { codigoInterno: '4007776', modelo: 'YA26N', varianteNombre: 'TER COM BAR LAR CU/ES2/0AWG 1H1/2¨35KV', precio: 10.00 },
      { codigoInterno: '4007756', modelo: 'YA27L4BOX', varianteNombre: 'TER COM BAR STD CU/ES3/0AWG 1H3/8"35KV', precio: 10.00 },
      { codigoInterno: '4007768', modelo: 'YA29L4', varianteNombre: 'TER COM BAR STD CU/ES250MCM 1H3/8¨35KV', precio: 10.00 },
      { codigoInterno: '4007758', modelo: 'YA29LBOX', varianteNombre: 'TER COM BAR STD CU/ES250MCM 1H1/2¨35KV', precio: 10.00 },
      { codigoInterno: '4007793', modelo: 'YA4C2N', varianteNombre: 'TER COM BAR LAR CU/ES4AWG 2H1/2¨35KV', precio: 10.00 },
      { codigoInterno: '4007795', modelo: 'YA252N', varianteNombre: 'TER COM BAR LAR CU/ES1/0AWG 2H1/2¨35KV', precio: 11.00 },
      { codigoInterno: '4007790', modelo: 'YA262N', varianteNombre: 'TER COM BAR LAR CU/ES2/0AWG 2H1/2¨35KV', precio: 11.00 },
      { codigoInterno: '4007765', modelo: 'YA31L', varianteNombre: 'TER COM BAR STD CU/ES350MCM 1H1/2¨35KV', precio: 11.40 },
      { codigoInterno: '4007788', modelo: 'YA28', varianteNombre: 'TER COM BAR LAR CU/ES4AWG 1H1/2¨35KV', precio: 11.80 },
      { codigoInterno: '4007757', modelo: 'YA28L4BOX', varianteNombre: 'TER COM BAR STD CU/ES4AWG 1H3/8¨35KV', precio: 12.00 },
      { codigoInterno: '4007797', modelo: 'YA2C2N', varianteNombre: 'TER COM BAR LAR CU/ES2AWG 2H1/2¨35KV', precio: 14.40 },
      { codigoInterno: '4007786', modelo: 'YA29', varianteNombre: 'TER COM BAR LAR CU/ES250MCM 1H1/2¨35KV', precio: 15.00 },
      { codigoInterno: '4007787', modelo: 'YA31', varianteNombre: 'TER COM BAR LAR CU/ES350MCM 1H1/2¨35KV', precio: 18.00 },
      { codigoInterno: '4007780', modelo: 'YA34', varianteNombre: 'TER COM BAR LAR CU/ES500MCM 1H5/8¨35KV', precio: 19.00 },
      { codigoInterno: '4007774', modelo: 'YA34L6', varianteNombre: 'TER COM BAR STD CU/ES500MCM 1H1/2¨35KV', precio: 19.00 },
      { codigoInterno: '4007799', modelo: 'YA282N', varianteNombre: 'TER COM BAR LAR CU/ES4AWG 2H1/2¨35KV', precio: 21.00 },
      { codigoInterno: '4024770', modelo: 'YGA262N', varianteNombre: 'TER COM BAR LAR CU 2/0AWG 2H1/2¨35KV', precio: 22.00 },
      { codigoInterno: '4007796', modelo: 'YA292N', varianteNombre: 'TER COM BAR LAR CU/ES250MCM 2H1/2¨35KV', precio: 26.00 },
      { codigoInterno: '4012957', modelo: 'YA34N', varianteNombre: 'TER COM BAR LAR CU/ES500MCM 1H1/2¨35KV', precio: 26.00 },
      { codigoInterno: '4007781', modelo: 'YA39', varianteNombre: 'TER COM BAR LAR CU/ES750MCM 1H5/8¨35KV', precio: 32.00 },
      { codigoInterno: '4007802', modelo: 'YA312N', varianteNombre: 'TER COM BAR LAR CU/ES350MCM 2H1/2¨35KV', precio: 35.00 },
      { codigoInterno: '4007789', modelo: 'YA342N', varianteNombre: 'TER COM BAR LAR CU/ES500MCM 2H1/2¨35KV', precio: 36.00 },
      { codigoInterno: '4007800', modelo: 'YA392N', varianteNombre: 'TER COM BAR LAR CU/ES750MCM 2H1/2¨35KV', precio: 50.00 },
      { codigoInterno: '4007778', modelo: 'YA44', varianteNombre: 'TER COM BAR LAR CU/ES1000MCM 1H5/8¨35KV', precio: 50.00 },
      { codigoInterno: '4007792', modelo: 'YA442N', varianteNombre: 'TER COM BAR LAR CU/ES1000MCM 2H1/2¨35KV', precio: 60.00 },
    ],
  },

  // 9. TERMINALES UNIVERSALES DE ALUMINIO BIMETÁLICOS SERIE KA / K2A / Q2A
  {
    codigoPadre: 'BURNDY-TERMINAL-ALUMINIO-BIMETAL',
    nombre: 'Terminal Universal de Aluminio Bimetálico Serie KA / K2A / Q2A',
    marca: 'Burndy',
    categoria: 'Terminales y Conectores de Compresión',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Terminales y Conectores de Compresión',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Terminal de presión en aleación de aluminio estañado bimetálico apto para conductores Cu y Al.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007809', modelo: 'KA2U', varianteNombre: 'TERMINAL UNIV AL,BIMETÁL 14–2AWG 1H¼”', precio: 1.40 },
      { codigoInterno: '4007803', modelo: 'KA26U', varianteNombre: 'TERMINAL UNIV AL,BIMETÁL 6–2/0AWG 1H ¼”', precio: 1.80 },
      { codigoInterno: '4007805', modelo: 'K2A29U', varianteNombre: 'TERM UNIV AL,BIMETÁ P/2CAB6–250MCM1H3/8”', precio: 6.00 },
      { codigoInterno: '4007808', modelo: 'KA36U2N', varianteNombre: 'TERMINAL UNIV AL,BIMETÁL 2AWG–600MCM2H½”', precio: 7.40 },
      { codigoInterno: '4007807', modelo: 'K2A36U2N', varianteNombre: 'TERM UNIV AL,BIMETÁ P/2CAB2–600MCM 2H ½”', precio: 12.00 },
      { codigoInterno: '4007804', modelo: 'Q2A342N', varianteNombre: 'TERM D/PRESION 2H9/16" P/CAB:400-500MCM', precio: 80.00 },
    ],
  },

  // 10. CONECTORES DERIVACIÓN COMPRIMIDA ALUMINIO (YHD / YHN / YHO)
  {
    codigoPadre: 'BURNDY-CONECTOR-DERIVACION-AL',
    nombre: 'Conector de Derivación H / O de Aluminio (YHD / YHN / YHO)',
    marca: 'Burndy',
    categoria: 'Terminales y Conectores de Compresión',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Terminales y Conectores de Compresión',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Conectores tipo H y O de compresión para ramales de líneas de distribución aéreas o subterráneas en Cu-Al.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007817', modelo: 'YHO150', varianteNombre: 'CONEC DERIV COMP AL P/D:3-1/0/6-2AWG', precio: 1.00 },
      { codigoInterno: '4007816', modelo: 'YHD200', varianteNombre: 'CONEC DERIV COMP AL P/D:1/0-2/0/6-2AWG', precio: 2.10 },
      { codigoInterno: '4007815', modelo: 'YHD300', varianteNombre: 'CONEC DERIV COMP AL P/D:1-2/0/1-2/0AWG', precio: 2.60 },
      { codigoInterno: '4007814', modelo: 'YHN500', varianteNombre: 'CONEC DERIV COMP AL P/D:4/0-500/6-2/0AWG', precio: 3.20 },
    ],
  },

  // 11. PERNERÍA EN BRONCE DE SILICIO DURIUM
  {
    codigoPadre: 'BURNDY-PERNERIA-BRONCE-SILICIO',
    nombre: 'Pernería, Tuercas y Arandelas en Bronce de Silicio Durium',
    marca: 'Burndy',
    categoria: 'Accesorios y Herrajes Eléctricos',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Pernería y Herrajes de Bronce Durium',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Pernería y arandelas de aleación Durium (Bronce de Silicio) no magnéticas de alta resistencia a la corrosión para subestaciones.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024759', modelo: '38FWBOX', varianteNombre: 'WASHERS FLAT SILICON BRONZE 3/8 IN ROUND', precio: 1.16 },
      { codigoInterno: '4024748', modelo: '38CHENBOX', varianteNombre: 'NUTS HEX SILICON BRONZE 3/8 IN-13', precio: 2.10 },
      { codigoInterno: '4024746', modelo: '38X150HEBBOX', varianteNombre: 'BOLTS HEX HEAD SILICON BRONZE 3/8 IN-16 1-1/2 IN', precio: 2.60 },
      { codigoInterno: '4024740', modelo: '50X150HEBBOX', varianteNombre: 'BOLTS HEX HEAD SILICON BRONZE 1/2 IN-13 1-1/2 IN', precio: 6.00 },
      { codigoInterno: '4024742', modelo: '50X125HEBBOX', varianteNombre: 'BOLTS HEX HEAD SILICON BRONZE 1/2 IN-13 1-1/4 IN', precio: 6.20 },
    ],
  },

  // 12. PASTAS ANTIOXIDANTES PENETROX
  {
    codigoPadre: 'BURNDY-PASTA-PENETROX',
    nombre: 'Pasta Antioxidante Penetrox (A / A-13 / E)',
    marca: 'Burndy',
    categoria: 'Compuestos y Pastas Conductivas',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Selladores y Masillas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Compuesto inhibidor de óxido y mejorador de conductividad para conexiones Al-Al, Al-Cu y Cu-Cu.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007911', modelo: 'P8A', varianteNombre: 'PASTA ANTIOXIDANTE AL/CU " A " 8 ONZAS', precio: 14.80 },
      { codigoInterno: '4007867', modelo: 'PENA 13-8', varianteNombre: 'PASTA ANTIOXIDANTE AL/CU ¨A-13¨ 8 ONZAS', precio: 43.50 },
      { codigoInterno: '4007866', modelo: 'PENE8', varianteNombre: 'PASTA ANTIOXIDANTE CU/CU ¨ E¨ 8 ONZAS', precio: 44.00 },
      { codigoInterno: '4007864', modelo: 'PENA-QT', varianteNombre: 'PASTA ANTIOXIDANTE PENETROX ¨A¨ 1/4 GLN.', precio: 97.00 },
      { codigoInterno: '4007862', modelo: 'PENA 13-QT', varianteNombre: 'PASTA ANTIOXIDANTE PENETROX¨A-13¨1/4GLN', precio: 120.00 },
      { codigoInterno: '4007863', modelo: 'PENE-QT', varianteNombre: 'PASTA ANTIOXIDANTE PENETROX ¨E¨ 1/4 GLN.', precio: 156.00 },
    ],
  },

  // 13. PRENSA TERMINALES Y ACCESORIOS
  {
    codigoPadre: 'BURNDY-PRENSAS-TERMINALES',
    nombre: 'Prensa / Ponchadora de Terminales Manual e Hidráulica',
    marca: 'Burndy',
    categoria: 'Herramientas y Ponchadoras',
    familia: 'Herramientas y Equipos',
    subfamilia: 'Herramientas de Prensado',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Herramienta de ponchado mecánico e hidráulico manual o a batería para compresión de terminales y conectores.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007821', modelo: 'Y10-22', varianteNombre: 'PRENSA TERMINAL MANUAL 22-10AWG', precio: 18.20 },
      { codigoInterno: '4007822', modelo: 'Y1MRTC', varianteNombre: 'PRENSA TERMINAL MANUAL C/RATCHET 8–1AWG', precio: 180.00 },
      { codigoInterno: '4007823', modelo: 'MRC840', varianteNombre: 'PRENSA TERMINAL MANUAL 8-4/0AWG', precio: 300.00 },
      { codigoInterno: '4007846', modelo: 'Y500CTHS', varianteNombre: 'PRENSA TERMINAL HIDRAU 8AWG-500MCM 6TN', precio: 3200.00 },
      { codigoInterno: '4007845', modelo: 'Y35', varianteNombre: 'PRENSA TERMINAL HIDRAU 8AWG-750MCM 12TN', precio: 4400.00 },
      { codigoInterno: '4007844', modelo: 'Y35-2', varianteNombre: 'PRENSA TERMINAL HIDRAU 8AWG-750MCM AISLADO', precio: 4400.00 },
      { codigoInterno: '4007847', modelo: 'Y644HSXT', varianteNombre: 'PRENSA TERMINAL HIDRAU 6AWG-1000MCM 11T', precio: 5500.00 },
      { codigoInterno: '4012220', modelo: 'PAT750T3U03A2', varianteNombre: 'PRENSA TERM.HIDRAU.BAT.#14sol-750kcmil 12TN', precio: 8600.00 },
    ],
  },

  // 14. DADOS DE PRENSADO TIPO U Y KITS DE DADOS SERIE U
  {
    codigoPadre: 'BURNDY-DADOS-PRENSADO-U',
    nombre: 'Dado de Prensado Tipo U y Kits de Dados para Prensa Y35 / Y750 / PAT750',
    marca: 'Burndy',
    categoria: 'Herramientas y Accesorios de Prensado',
    familia: 'Herramientas y Equipos',
    subfamilia: 'Herramientas de Prensado',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Matriz / Dado de compresión tipo U intercambiable de acero para ponchadoras hidráulicas Burndy.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007825', modelo: 'U25RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 50MM2(1/0AWG)', precio: 175.00 },
      { codigoInterno: '4007826', modelo: 'U26RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 70MM2(2/0AWG)', precio: 175.00 },
      { codigoInterno: '4007827', modelo: 'U27RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 85MM2(3/0AWG)', precio: 175.00 },
      { codigoInterno: '4007828', modelo: 'U28RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 95MM2(4/0AWG)', precio: 175.00 },
      { codigoInterno: '4007829', modelo: 'U29RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 120MM2(250MCM)', precio: 175.00 },
      { codigoInterno: '4007830', modelo: 'U2CRT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 35MM2(2AWG)', precio: 175.00 },
      { codigoInterno: '4007831', modelo: 'U30RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 150MM2(300MCM)', precio: 175.00 },
      { codigoInterno: '4007832', modelo: 'U31RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 175MM2(350MCM)', precio: 175.00 },
      { codigoInterno: '4007833', modelo: 'U32RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 185MM2(400MCM)', precio: 175.00 },
      { codigoInterno: '4007834', modelo: 'U34RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 240MM2(500MCM)', precio: 175.00 },
      { codigoInterno: '4007835', modelo: 'U36RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 300MM2(600MCM)', precio: 175.00 },
      { codigoInterno: '4007836', modelo: 'U38RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 350MM2(700MCM)', precio: 175.00 },
      { codigoInterno: '4007837', modelo: 'U39RT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 400MM2(750MCM)', precio: 175.00 },
      { codigoInterno: '4007838', modelo: 'U4CRT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 25MM2(4AWG)', precio: 175.00 },
      { codigoInterno: '4007839', modelo: 'U5CRT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 16MM2(6AWG)', precio: 175.00 },
      { codigoInterno: '4007840', modelo: 'U8CRT', varianteNombre: 'DADO U P/PRENSA Y35/Y750 10MM2(8AWG)', precio: 175.00 },
      { codigoInterno: '4007841', modelo: 'UD3', varianteNombre: 'DADO TIPO U PARA PRENSA Y-35/Y-750', precio: 220.00 },
      { codigoInterno: '4007843', modelo: 'UN', varianteNombre: 'DADO TIPO U PARA PRENSA Y-35/Y-750', precio: 220.00 },
      { codigoInterno: '4007842', modelo: 'UO', varianteNombre: 'DADO TIPO U PARA PRENSA Y-35/Y-750', precio: 220.00 },
      { codigoInterno: '4007861', modelo: 'CASEUDIES15', varianteNombre: 'CAJA PARA 15 PARES DE DADOS TIPO U', precio: 174.00 },
      { codigoInterno: '4007851', modelo: 'UIBEAMKIT', varianteNombre: 'SET DE DADOS PARA YGIB SET X 4 PARES', precio: 500.00 },
      { codigoInterno: '4007850', modelo: 'UDIEKITHYGRD', varianteNombre: 'SET DE DADOS P/HYGROUND, SET X 8 PARES', precio: 1800.00 },
      { codigoInterno: '4007849', modelo: 'UDIEKITCU', varianteNombre: 'SET DE DADOS TIPO “U” , SET X 15 PARES', precio: 2500.00 },
    ],
  },

  // 15. DADOS DE PRENSADO SERIE W PARA HERRAMIENTAS Y500 / MD7
  {
    codigoPadre: 'BURNDY-DADOS-PRENSADO-W',
    nombre: 'Dado de Prensado Serie W para Prensa Burndy MD7 / Y500',
    marca: 'Burndy',
    categoria: 'Herramientas y Accesorios de Prensado',
    familia: 'Herramientas y Equipos',
    subfamilia: 'Herramientas de Prensado',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Matriz / Dado de compresión intercambiable serie W de acero de alta dureza para ponchadoras hidráulicas y mecánicas Burndy.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007853', modelo: 'W25VT', varianteNombre: 'DADO W P/PRENSA Y500/MD7 50MM2(1/0AWG)', precio: 112.00 },
      { codigoInterno: '4007854', modelo: 'W26VT', varianteNombre: 'DADO W P/PRENSA Y500/MD7 70MM2(2/0AWG)', precio: 112.00 },
      { codigoInterno: '4007855', modelo: 'W28VT', varianteNombre: 'DADO W P/PRENSA Y500/MD7 95MM2(4/0AWG)', precio: 112.00 },
      { codigoInterno: '4007856', modelo: 'W29VT', varianteNombre: 'DADO W P/PRENSA Y500/MD7 120MM2(250MCM)', precio: 112.00 },
      { codigoInterno: '4007852', modelo: 'W2CVT', varianteNombre: 'DADO W P/PRENSA Y500/MD7 35MM2(2AWG)', precio: 112.00 },
      { codigoInterno: '4007857', modelo: 'W30VT', varianteNombre: 'DADO W P/PRENSA Y500/MD7 152MM2(300MCM)', precio: 112.00 },
      { codigoInterno: '4007858', modelo: 'W31VT', varianteNombre: 'DADO W P/PRENSA Y500/MD7 185MM2(350MCM)', precio: 112.00 },
      { codigoInterno: '4007859', modelo: 'W34VT', varianteNombre: 'DADO W P/PRENSA Y500CT 240MM2(500MCM)', precio: 112.00 },
      { codigoInterno: '4007860', modelo: 'W4CVT', varianteNombre: 'DADO W P/PRENSA Y500/MD7 25MM2(4AWG)', precio: 112.00 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación de productos Burndy con Variantes...');

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_BURNDY) {
    // 1. Obtener o crear la Familia
    let familia = await prisma.familia.findUnique({
      where: { nombre: grupo.familia },
    });

    if (!familia) {
      familia = await prisma.familia.create({
        data: {
          nombre: grupo.familia,
          descripcion: 'Productos de protección eléctrica, pozo a tierra y fitinería.',
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

  console.log(`\n🎉 Importación Burndy completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando productos Burndy:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
