import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

interface VarianteItem {
  codigoInterno: string;
  modelo: string;
  varianteNombre: string;
  precio: number;
  unidad: string;
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

const GRUPOS_PADRES: GrupoProductoPadre[] = [
  // 1. LS - INTERRUPTORES DE RIEL BKJ (6kA)
  {
    codigoPadre: 'LS-RIEL-BKJ-6KA',
    nombre: 'Interruptores Termomagnéticos de Riel LS BKJ 6kA (1P, 2P, 3P, 4P)',
    marca: 'LS Protección y Control',
    categoria: 'INTERRUPTORES DE RIEL (1 POLO) BKJ',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores termomagnéticos en miniatura para riel DIN serie BKJ curva C poder de corte 6kA/415V en 1P, 2P, 3P y 4P desde 1A hasta 63A.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4021967', modelo: 'BKJ 1P C1', varianteNombre: '1X1A 6KA/415V', precio: 32.94, unidad: 'PEN' },
      { codigoInterno: '4021968', modelo: 'BKJ 1P C2', varianteNombre: '1X2A 6KA/415V', precio: 32.94, unidad: 'PEN' },
      { codigoInterno: '4021969', modelo: 'BKJ 1P C4', varianteNombre: '1X4A 6KA/415V', precio: 32.94, unidad: 'PEN' },
      { codigoInterno: '4021970', modelo: 'BKJ 1P C6', varianteNombre: '1X6A 6KA/415V', precio: 27.68, unidad: 'PEN' },
      { codigoInterno: '4021971', modelo: 'BKJ 1P C10', varianteNombre: '1X10A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021972', modelo: 'BKJ 1P C16', varianteNombre: '1X16A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021973', modelo: 'BKJ 1P C20', varianteNombre: '1X20A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021974', modelo: 'BKJ 1P C25', varianteNombre: '1X25A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021976', modelo: 'BKJ 1P C32', varianteNombre: '1X32A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021977', modelo: 'BKJ 1P C40', varianteNombre: '1X40A 6KA/415V', precio: 24.21, unidad: 'PEN' },
      { codigoInterno: '4021978', modelo: 'BKJ 1P C50', varianteNombre: '1X50A 6KA/415V', precio: 29.39, unidad: 'PEN' },
      { codigoInterno: '4021979', modelo: 'BKJ 2P C2', varianteNombre: '2X2A 6KA/415V', precio: 70.64, unidad: 'PEN' },
      { codigoInterno: '4021981', modelo: 'BKJ 2P C4', varianteNombre: '2X4A 6KA/415V', precio: 70.64, unidad: 'PEN' },
      { codigoInterno: '4021982', modelo: 'BKJ 2P C6', varianteNombre: '2X6A 6KA/415V', precio: 53.82, unidad: 'PEN' },
      { codigoInterno: '4021983', modelo: 'BKJ 2P C10', varianteNombre: '2X10A 6KA/415V', precio: 35.98, unidad: 'PEN' },
      { codigoInterno: '4021984', modelo: 'BKJ 2P C16', varianteNombre: '2X16A 6KA/415V', precio: 34.56, unidad: 'PEN' },
      { codigoInterno: '4021985', modelo: 'BKJ 2P C20', varianteNombre: '2X20A 6KA/415V', precio: 34.56, unidad: 'PEN' },
      { codigoInterno: '4021986', modelo: 'BKJ 2P C25', varianteNombre: '2X25A 6KA/415V', precio: 34.56, unidad: 'PEN' },
      { codigoInterno: '4021987', modelo: 'BKJ 2P C32', varianteNombre: '2X32A 6KA/415V', precio: 34.56, unidad: 'PEN' },
      { codigoInterno: '4021988', modelo: 'BKJ 2P C40', varianteNombre: '2X40A 6KA/415V', precio: 41.53, unidad: 'PEN' },
      { codigoInterno: '4021989', modelo: 'BKJ 2P C50', varianteNombre: '2X50A 6KA/415V', precio: 48.46, unidad: 'PEN' },
      { codigoInterno: '4021990', modelo: 'BKJ 2P C63', varianteNombre: '2X63A 6KA/415V', precio: 60.59, unidad: 'PEN' },
      { codigoInterno: '4021991', modelo: 'BKJ 3P C2', varianteNombre: '3X2A 6KA/415V', precio: 121.31, unidad: 'PEN' },
      { codigoInterno: '4021992', modelo: 'BKJ 3P C4', varianteNombre: '3X4A 6KA/415V', precio: 124.51, unidad: 'PEN' },
      { codigoInterno: '4021993', modelo: 'BKJ 3P C6', varianteNombre: '3X6A 6KA/415V', precio: 108.95, unidad: 'PEN' },
      { codigoInterno: '4021994', modelo: 'BKJ 3P C10', varianteNombre: '3X10A 6KA/415V', precio: 81.29, unidad: 'PEN' },
      { codigoInterno: '4021995', modelo: 'BKJ 3P C16', varianteNombre: '3X16A 6KA/415V', precio: 81.49, unidad: 'PEN' },
      { codigoInterno: '4021996', modelo: 'BKJ 3P C20', varianteNombre: '3X20A 6KA/415V', precio: 81.49, unidad: 'PEN' },
      { codigoInterno: '4021997', modelo: 'BKJ 3P C25', varianteNombre: '3X25A 6KA/415V', precio: 81.49, unidad: 'PEN' },
      { codigoInterno: '4021998', modelo: 'BKJ 3P C32', varianteNombre: '3X32A 6KA/415V', precio: 86.68, unidad: 'PEN' },
      { codigoInterno: '4021999', modelo: 'BKJ 3P C40', varianteNombre: '3X40A 6KA/415V', precio: 90.11, unidad: 'PEN' },
      { codigoInterno: '4022000', modelo: 'BKJ 3P C50', varianteNombre: '3X50A 6KA/415V', precio: 107.45, unidad: 'PEN' },
      { codigoInterno: '4022001', modelo: 'BKJ 3P C63', varianteNombre: '3X63A 6KA/415V', precio: 119.64, unidad: 'PEN' },
      { codigoInterno: '4023672', modelo: 'BKJ 4P C32', varianteNombre: '4X32A 6KA/415V', precio: 119.12, unidad: 'PEN' },
      { codigoInterno: '4023673', modelo: 'BKJ 4P C40', varianteNombre: '4X40A 6KA/415V', precio: 127.63, unidad: 'PEN' },
      { codigoInterno: '4023674', modelo: 'BKJ 4P C63', varianteNombre: '4X63A 6KA/415V', precio: 158.86, unidad: 'PEN' },
    ],
  },

  // 2. LS - INTERRUPTORES DE RIEL BKH (15kA High Amperage)
  {
    codigoPadre: 'LS-RIEL-BKH-15KA',
    nombre: 'Interruptores Termomagnéticos de Riel LS BKH 15kA (80A a 125A)',
    marca: 'LS Protección y Control',
    categoria: 'INTERRUPTORES DE RIEL (2 POLOS) BKH',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores din de alto amparaje serie BKH poder de corte 15kA/415V en 2P y 3P de 80A, 100A y 125A.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4101500', modelo: 'BKH 2P C 80A', varianteNombre: '2X80A 15KA/415V', precio: 291.05, unidad: 'PEN' },
      { codigoInterno: '4101501', modelo: 'BKH 2P C 100A', varianteNombre: '2X100A 15KA/415V', precio: 300.10, unidad: 'PEN' },
      { codigoInterno: '4101502', modelo: 'BKH 2P C 125A', varianteNombre: '2X125A 15KA/415V', precio: 308.18, unidad: 'PEN' },
      { codigoInterno: '4101503', modelo: 'BKH 3P C 80A', varianteNombre: '3X80A 15KA/415V', precio: 424.49, unidad: 'PEN' },
      { codigoInterno: '4101504', modelo: 'BKH 3P C 100A', varianteNombre: '3X100A 15KA/415V', precio: 428.87, unidad: 'PEN' },
      { codigoInterno: '4101505', modelo: 'BKH 3P C 125A', varianteNombre: '3X125A 15KA/415V', precio: 459.14, unidad: 'PEN' },
    ],
  },

  // 3. LS - INTERRUPTORES DIFERENCIALES RKN / RKJ (Tipo AC, Tipo A y Tipo B)
  {
    codigoPadre: 'LS-DIFERENCIALES-RKN-RKJ',
    nombre: 'Interruptores Diferenciales LS RKN / RKJ (Tipo AC, Tipo A Super Inmunizado y Tipo B)',
    marca: 'LS Protección y Control',
    categoria: 'INTERRUPTORES DIFERENCIALES TIPO AC',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores diferenciales LS serie RKN y RKJ de 2P y 4P (25A, 40A, 63A 30mA) en versiones estándar Tipo AC, super inmunizadas Tipo A y electrónicas industriales Tipo B.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4101469', modelo: 'RKN-25-2 / 30mA', varianteNombre: 'RKN 2X25A 30MA TIPO AC', precio: 113.27, unidad: 'PEN' },
      { codigoInterno: '4101470', modelo: 'RKN-40-2 / 30mA', varianteNombre: 'RKN 2X40A 30MA TIPO AC', precio: 118.69, unidad: 'PEN' },
      { codigoInterno: '4101471', modelo: 'RKN-63-2 / 30mA', varianteNombre: 'RKN 2X63A 30MA TIPO AC', precio: 156.37, unidad: 'PEN' },
      { codigoInterno: '4101472', modelo: 'RKN-25-4 / 30mA', varianteNombre: 'RKN 4X25A 30MA TIPO AC', precio: 185.17, unidad: 'PEN' },
      { codigoInterno: '4101473', modelo: 'RKN-40-4 / 30mA', varianteNombre: 'RKN 4X40A 30MA TIPO AC', precio: 190.85, unidad: 'PEN' },
      { codigoInterno: '4101474', modelo: 'RKN-63-4 / 30mA', varianteNombre: 'RKN 4X63A 30MA TIPO AC', precio: 304.50, unidad: 'PEN' },
      { codigoInterno: '4007277', modelo: 'RKN-b-25-2 / 30mA - A', varianteNombre: 'RKN-B 2X25A 30MA TIPO A (SUPER INMUNIZADO)', precio: 165.35, unidad: 'PEN' },
      { codigoInterno: '4007278', modelo: 'RKN-b-40-2 / 30mA - A', varianteNombre: 'RKN-B 2X40A 30MA TIPO A (SUPER INMUNIZADO)', precio: 165.35, unidad: 'PEN' },
      { codigoInterno: '4007279', modelo: 'RKN-b-63-2 / 30mA - A', varianteNombre: 'RKN-B 2X63A 30MA TIPO A (SUPER INMUNIZADO)', precio: 214.72, unidad: 'PEN' },
      { codigoInterno: '4007280', modelo: 'RKN-b-25-4 / 30mA - A', varianteNombre: 'RKN-B 4X25A 30MA TIPO A (SUPER INMUNIZADO)', precio: 282.52, unidad: 'PEN' },
      { codigoInterno: '4007281', modelo: 'RKN-b-40-4 / 30mA - A', varianteNombre: 'RKN-B 4X40A 30MA TIPO A (SUPER INMUNIZADO)', precio: 282.52, unidad: 'PEN' },
      { codigoInterno: '4023697', modelo: 'RKJ63HD-B 63 4P-B/30MA', varianteNombre: 'RKJ-B 4X63A 30MA TIPO B', precio: 2040.48, unidad: 'PEN' },
    ],
  },

  // 4. LS - INTERRUPTORES DE CAJA MOLDEADA METASOL ABN (Fijos 15A a 250A)
  {
    codigoPadre: 'LS-METASOL-ABN-FIJOS',
    nombre: 'Interruptores de Caja Moldeada LS Metasol ABN (Fijos 15A a 250A)',
    marca: 'LS Protección y Control',
    categoria: 'INTERRUPTORES DE CAJA MOLDEADA METASOL',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores automáticos fijos en caja moldeada serie Metasol ABN (ABN52C, ABN102C, ABN103C, ABN203C) en 2P y 3P desde 15A hasta 250A en 30kA, 35kA y 65kA / 240V.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4002330', modelo: 'ABN52C 15', varianteNombre: 'ABN52C 2P 15A 30KA/240V', precio: 191.91, unidad: 'PEN' },
      { codigoInterno: '4002331', modelo: 'ABN52C 20', varianteNombre: 'ABN52C 2P 20A 30KA/240V', precio: 191.91, unidad: 'PEN' },
      { codigoInterno: '4002332', modelo: 'ABN52C 30', varianteNombre: 'ABN52C 2P 30A 30KA/240V', precio: 174.31, unidad: 'PEN' },
      { codigoInterno: '4002333', modelo: 'ABN52C 40', varianteNombre: 'ABN52C 2P 40A 30KA/240V', precio: 191.91, unidad: 'PEN' },
      { codigoInterno: '4002334', modelo: 'ABN52C 50', varianteNombre: 'ABN52C 2P 50A 30KA/240V', precio: 200.20, unidad: 'PEN' },
      { codigoInterno: '4011805', modelo: 'ABN102C 60', varianteNombre: 'ABN102c 2P 60A 35KA/240V', precio: 200.23, unidad: 'PEN' },
      { codigoInterno: '4002335', modelo: 'ABN102C 75', varianteNombre: 'ABN102C 2P 75A 35KA/240V', precio: 200.23, unidad: 'PEN' },
      { codigoInterno: '4002336', modelo: 'ABN103C 15', varianteNombre: 'ABN103C 3P 15A 35KA/240V', precio: 249.64, unidad: 'PEN' },
      { codigoInterno: '4002337', modelo: 'ABN103C 20', varianteNombre: 'ABN103C 3P 20A 35KA/240V', precio: 249.65, unidad: 'PEN' },
      { codigoInterno: '4002338', modelo: 'ABN103C 30', varianteNombre: 'ABN103C 3P 30A 35KA/240V', precio: 249.64, unidad: 'PEN' },
      { codigoInterno: '4002339', modelo: 'ABN103C 40', varianteNombre: 'ABN103C 3P 40A 35KA/240V', precio: 249.64, unidad: 'PEN' },
      { codigoInterno: '4002340', modelo: 'ABN103C 50', varianteNombre: 'ABN103C 3P 50A 35KA/240V', precio: 249.64, unidad: 'PEN' },
      { codigoInterno: '4002341', modelo: 'ABN103C 60', varianteNombre: 'ABN103C 3P 60A 35KA/240V', precio: 249.64, unidad: 'PEN' },
      { codigoInterno: '4002342', modelo: 'ABN103C 75', varianteNombre: 'ABN103C 3P 75A 35KA/240V', precio: 265.16, unidad: 'PEN' },
      { codigoInterno: '4002343', modelo: 'ABN103C 100', varianteNombre: 'ABN103C 3P 100A 35KA/240V', precio: 265.16, unidad: 'PEN' },
      { codigoInterno: '4002344', modelo: 'ABN203C 125', varianteNombre: 'ABN203C 3P 125A 65KA/240V', precio: 356.09, unidad: 'PEN' },
      { codigoInterno: '4002345', modelo: 'ABN203C 150', varianteNombre: 'ABN203C 3P 150A 65KA/240V', precio: 433.38, unidad: 'PEN' },
      { codigoInterno: '4002346', modelo: 'ABN203C 175', varianteNombre: 'ABN203C 3P 175A 65KA/240V', precio: 515.47, unidad: 'PEN' },
      { codigoInterno: '4002347', modelo: 'ABN203C 200', varianteNombre: 'ABN203C 3P 200A 65KA/240V', precio: 523.27, unidad: 'PEN' },
      { codigoInterno: '4002348', modelo: 'ABN203C 225', varianteNombre: 'ABN203C 3P 225A 65KA/240V', precio: 538.45, unidad: 'PEN' },
      { codigoInterno: '4002349', modelo: 'ABN203C 250', varianteNombre: 'ABN203C 3P 250A 65KA/240V', precio: 553.32, unidad: 'PEN' },
    ],
  },

  // 5. LS - INTERRUPTORES DE CAJA MOLDEADA METASOL ABS (Regulables 16A a 250A) Y ACCESORIOS
  {
    codigoPadre: 'LS-METASOL-ABS-REGULABLES',
    nombre: 'Interruptores de Caja Moldeada LS Metasol ABS (Regulables 16A a 250A) y Accesorios',
    marca: 'LS Protección y Control',
    categoria: 'INTERRUPTORES DE CAJA MOLDEADA METASOL',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores automáticos regulables en caja moldeada serie Metasol ABS (ABS103C, ABS203C, ABS104C, ABS204C en 3P y 4P de 16A a 250A 50kA-85kA) y accesorios (contactos AX/AL, bobinas SHT/UVT, bloqueos HL y aisladores IB).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4000068', modelo: 'ABS103G 16', varianteNombre: 'ABS103C 3P 16A 50KA/220V', precio: 511.43, unidad: 'PEN' },
      { codigoInterno: '4019001', modelo: 'ABS103c 25', varianteNombre: 'ABS103C 3P 25A 85KA/240V', precio: 508.45, unidad: 'PEN' },
      { codigoInterno: '4019002', modelo: 'ABS103c 32', varianteNombre: 'ABS103C 3P 32A 85KA/240V', precio: 508.45, unidad: 'PEN' },
      { codigoInterno: '4019003', modelo: 'ABS103c 40', varianteNombre: 'ABS103C 3P 40A 85KA/240V', precio: 508.45, unidad: 'PEN' },
      { codigoInterno: '4019004', modelo: 'ABS103c 50', varianteNombre: 'ABS103C 3P 50A 85KA/240V', precio: 508.45, unidad: 'PEN' },
      { codigoInterno: '4019005', modelo: 'ABS103c 63', varianteNombre: 'ABS103C 3P 63A 85KA/240V', precio: 508.45, unidad: 'PEN' },
      { codigoInterno: '4019006', modelo: 'ABS103c 80', varianteNombre: 'ABS103C 3P 80A 85KA/240V', precio: 542.27, unidad: 'PEN' },
      { codigoInterno: '4019007', modelo: 'ABS103c 100', varianteNombre: 'ABS103C 3P 100A 85KA/240V', precio: 526.81, unidad: 'PEN' },
      { codigoInterno: '4019008', modelo: 'ABS103c 125', varianteNombre: 'ABS103C 3P 125A 85KA/240V', precio: 592.06, unidad: 'PEN' },
      { codigoInterno: '4019009', modelo: 'ABS203c 160', varianteNombre: 'ABS203C 3P 160A 85KA/240V', precio: 616.94, unidad: 'PEN' },
      { codigoInterno: '4019010', modelo: 'ABS203c 200 FMU', varianteNombre: 'ABS203C 3P 200A FMU 85KA/240V', precio: 851.47, unidad: 'PEN' },
      { codigoInterno: '4015610', modelo: 'ABS203c 200A', varianteNombre: 'ABS203C 3P 200A 85KA/240V', precio: 565.00, unidad: 'PEN' },
      { codigoInterno: '4019012', modelo: 'ABS203c 250 FMU', varianteNombre: 'ABS203C 3P 250A FMU 85KA/240V', precio: 851.47, unidad: 'PEN' },
      { codigoInterno: '4020023', modelo: 'ABS104c32', varianteNombre: 'ABS104C 4P 22-32A 85KA/240V', precio: 577.21, unidad: 'PEN' },
      { codigoInterno: '4020025', modelo: 'ABS104c50', varianteNombre: 'ABS104C 4P 35-50A 85KA/240V', precio: 577.21, unidad: 'PEN' },
      { codigoInterno: '4020026', modelo: 'ABS104c63', varianteNombre: 'ABS104C 4P 44-63A 85KA/240V', precio: 577.21, unidad: 'PEN' },
      { codigoInterno: '4020028', modelo: 'ABS104c100', varianteNombre: 'ABS104C 4P 70-100A 85KA/240V', precio: 626.29, unidad: 'PEN' },
      { codigoInterno: '4020030', modelo: 'ABS204c160', varianteNombre: 'ABS204C 4P 112-160A 85KA/240V', precio: 995.61, unidad: 'PEN' },
      { codigoInterno: '4020032', modelo: 'ABS204c250', varianteNombre: 'ABS204C 4P 175-250A 85KA/240V', precio: 995.61, unidad: 'PEN' },
      { codigoInterno: '4020018', modelo: 'AX-ABN/S-R', varianteNombre: 'CONT AUX 1NA-1NC ABN/S LADO IZQ', precio: 80.43, unidad: 'PEN' },
      { codigoInterno: '4020019', modelo: 'AX+AL-ABN/S-R', varianteNombre: 'CONT AUX + AL 1NA-1NC ABN/S IZQ', precio: 142.94, unidad: 'PEN' },
      { codigoInterno: '4020033', modelo: 'SHT-ABN/S-T', varianteNombre: 'BOBINA DE DISPARO 220VAC ABN/S DERECHO', precio: 159.15, unidad: 'PEN' },
      { codigoInterno: '4020034', modelo: 'UVT-ABN/S-T', varianteNombre: 'BOBINA MIN TENSION 220VAC ABN/S DERECHO', precio: 173.28, unidad: 'PEN' },
      { codigoInterno: '4020035', modelo: 'HL-125c', varianteNombre: 'BLOQUEO P/CANDADO P/ ABS125', precio: 264.51, unidad: 'PEN' },
      { codigoInterno: '4020036', modelo: 'HL-250c', varianteNombre: 'BLOQUEO P/CANDADO P/ ABN/S250', precio: 264.51, unidad: 'PEN' },
      { codigoInterno: '4015427', modelo: 'IB13 (67221181001)', varianteNombre: 'Aisladores para ABN50c/60c/100c ABS30c/50c/60c', precio: 1.68, unidad: 'PEN' },
      { codigoInterno: '4015428', modelo: 'IB23 (67221182001)', varianteNombre: 'Aisladores para ABS125c ABN250c ABS250c', precio: 8.69, unidad: 'PEN' },
    ],
  },
];

async function main() {
  console.log('🚀 Desglosando y reorganizando grupos de LS Riel y Metasol en subgrupos específicos...');

  for (const grupo of GRUPOS_PADRES) {
    // 1. Crear/Buscar Familia
    let familia = await prisma.familia.findUnique({
      where: { nombre: grupo.familia },
    });
    if (!familia) {
      familia = await prisma.familia.create({
        data: { nombre: grupo.familia, descripcion: `Familia de ${grupo.familia}` },
      });
    }

    // 2. Crear/Buscar Subfamilia
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

    const precios = grupo.variantes.map((v) => v.precio);
    const precioBase = Math.min(...precios);

    // 3. Crear / Actualizar Producto Padre
    const padre = await prisma.equipo.upsert({
      where: { codigoInterno: grupo.codigoPadre },
      update: {
        nombre: grupo.nombre,
        marca: grupo.marca,
        categoria: grupo.categoria,
        descripcion: grupo.descripcion,
        precio: precioBase,
        unidad: grupo.unidad,
        tipo: grupo.tipo,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        ubicacion: 'Almacén Central',
        imagenUrl: grupo.imagenUrl,
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
        precio: precioBase,
        unidad: grupo.unidad,
        tipo: grupo.tipo,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        ubicacion: 'Almacén Central',
        imagenUrl: grupo.imagenUrl,
        familiaId: familia.id,
        subfamiliaId: subfamilia.id,
        padreId: null,
      },
    });

    console.log(`\n👑 [PADRE REORGANIZADO] ${padre.nombre} (${grupo.marca}) - Precio base: ${grupo.unidad} ${precioBase}`);

    // 4. Crear / Actualizar Variantes (Hijos)
    for (const v of grupo.variantes) {
      await prisma.equipo.upsert({
        where: { codigoInterno: v.codigoInterno },
        update: {
          nombre: `${grupo.nombre} - ${v.varianteNombre}`,
          modelo: v.modelo,
          marca: grupo.marca,
          categoria: grupo.categoria,
          descripcion: `${grupo.descripcion}\n\nVariante: ${v.varianteNombre}\nModelo: ${v.modelo}\nCódigo: ${v.codigoInterno}`,
          precio: v.precio,
          unidad: v.unidad,
          tipo: grupo.tipo,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: grupo.imagenUrl,
          familiaId: familia.id,
          subfamiliaId: subfamilia.id,
          padreId: padre.id,
          varianteNombre: v.varianteNombre,
        },
        create: {
          codigoInterno: v.codigoInterno,
          nombre: `${grupo.nombre} - ${v.varianteNombre}`,
          modelo: v.modelo,
          marca: grupo.marca,
          categoria: grupo.categoria,
          descripcion: `${grupo.descripcion}\n\nVariante: ${v.varianteNombre}\nModelo: ${v.modelo}\nCódigo: ${v.codigoInterno}`,
          precio: v.precio,
          unidad: v.unidad,
          tipo: grupo.tipo,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: grupo.imagenUrl,
          familiaId: familia.id,
          subfamiliaId: subfamilia.id,
          padreId: padre.id,
          varianteNombre: v.varianteNombre,
        },
      });

      console.log(`   🔹 [VARIANTE ${v.codigoInterno}] Modelo ${v.modelo} - ${v.varianteNombre} (${v.unidad} ${v.precio})`);
    }
  }

  // Eliminar el producto padre viejo 'LS-RIEL-BKJ-BKH-METASOL-ABN-ABS' si existe
  try {
    await prisma.equipo.delete({
      where: { codigoInterno: 'LS-RIEL-BKJ-BKH-METASOL-ABN-ABS' },
    });
    console.log('\n🧹 Se eliminó el padre gigante anterior LS-RIEL-BKJ-BKH-METASOL-ABN-ABS.');
  } catch (e) {
    // Si no existía, ignorar
  }

  console.log('\n✅ Reorganización completada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en script de desensamble:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
