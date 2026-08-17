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
  // 1. INTERRUPTORES DE CAJA MOLDEADA 3VA1 (REGULABLES Ir=0.7-1 In, 55kA y 70kA)
  {
    codigoPadre: 'SIE-3VA1-55KA-70KA',
    nombre: 'Interruptor de Caja Moldeada Siemens 3VA1 (55kA / 70kA / 36kA 415V)',
    marca: 'Siemens Proteccion y Control',
    categoria: 'INTERRUPTORES DE CAJA MOLDEADA 3VA',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Interruptores de caja moldeada tripolares Siemens 3VA1 (3VA11, 3VA12, 3VA13, 3VA14, 3VA15) con disparador térmico-magnético regulable (AFTM / ATAM) de 16A a 1000A.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1013622', modelo: '3VA1196-5EE32-0AA0', varianteNombre: '3VA11 3X16A, 55kA/415V AFTM', precio: 296.00, unidad: 'USD' },
      { codigoInterno: '1013619', modelo: '3VA1120-5EE32-0AA0', varianteNombre: '3VA11 3X20A, 55kA/415V AFTM', precio: 296.00, unidad: 'USD' },
      { codigoInterno: '1014805', modelo: '3VA1125-5EE32-0AA0', varianteNombre: '3VA11 3X25A, 55kA/415V AFTM', precio: 296.00, unidad: 'USD' },
      { codigoInterno: '1014806', modelo: '3VA1132-5EE32-0AA0', varianteNombre: '3VA11 3X32A, 55kA/415V AFTM', precio: 296.00, unidad: 'USD' },
      { codigoInterno: '1013620', modelo: '3VA1140-5EE32-0AA0', varianteNombre: '3VA11 3X40A, 55kA/415V AFTM', precio: 312.00, unidad: 'USD' },
      { codigoInterno: '1014505', modelo: '3VA1150-5EE32-0AA0', varianteNombre: '3VA11 3X50A, 55kA/415V AFTM', precio: 312.00, unidad: 'USD' },
      { codigoInterno: '1014807', modelo: '3VA1163-5EE32-0AA0', varianteNombre: '3VA11 3X63A, 55kA/415V AFTM', precio: 312.00, unidad: 'USD' },
      { codigoInterno: '1014507', modelo: '3VA1180-5EE32-0AA0', varianteNombre: '3VA11 3X80A, 55kA/415V AFTM', precio: 312.00, unidad: 'USD' },
      { codigoInterno: '1016186', modelo: '3VA1110-5EE32-0AA0', varianteNombre: '3VA11 3X100A, 55kA/415V AFTM', precio: 309.00, unidad: 'USD' },
      { codigoInterno: '1016187', modelo: '3VA1112-5EE32-0AA0', varianteNombre: '3VA11 3X125A, 55kA/415V AFTM', precio: 391.00, unidad: 'USD' },
      { codigoInterno: '1014883', modelo: '3VA1116-5EE32-0AA0', varianteNombre: '3VA11 3X160A, 55kA/415V AFTM', precio: 408.00, unidad: 'USD' },
      { codigoInterno: '1014353', modelo: '3VA1220-5EF32-0AA0', varianteNombre: '3VA12 3X200A, 55kA/415V AFTM', precio: 537.00, unidad: 'USD' },
      { codigoInterno: '1014884', modelo: '3VA1225-5EF32-0AA0', varianteNombre: '3VA12 3X250A, 55kA/415V AFTM', precio: 604.00, unidad: 'USD' },
      { codigoInterno: '1013621', modelo: '3VA1180-6EF32-0AA0', varianteNombre: '3VA11 3X80A, 70kA/415V ATAM', precio: 368.00, unidad: 'USD' },
      { codigoInterno: '1013616', modelo: '3VA1110-6EF32-0AA0', varianteNombre: '3VA11 3X100A, 70kA/415V ATAM', precio: 367.00, unidad: 'USD' },
      { codigoInterno: '1013618', modelo: '3VA1116-6EF32-0AA0', varianteNombre: '3VA11 3X160A, 70kA/415V ATAM', precio: 490.00, unidad: 'USD' },
      { codigoInterno: '1014317', modelo: '3VA1220-6EF32-0AA0', varianteNombre: '3VA12 3X200A, 70kA/415V ATAM', precio: 683.00, unidad: 'USD' },
      { codigoInterno: '1015511', modelo: '3VA1225-6EF32-0AA0', varianteNombre: '3VA12 3X250A, 70kA/415V ATAM', precio: 692.00, unidad: 'USD' },
      { codigoInterno: '1015698', modelo: '3VA1340-4EF32-0AA0', varianteNombre: '3VA13 3X400A, 36kA/415V ATAM', precio: 747.00, unidad: 'USD' },
      { codigoInterno: '1014508', modelo: '3VA1463-4EF32-0AA0', varianteNombre: '3VA14 3X630A, 36kA/415V ATAM', precio: 1064.00, unidad: 'USD' },
      { codigoInterno: '1014329', modelo: '3VA1340-5EF32-0AA0', varianteNombre: '3VA13 3X400A, 55kA/415V ATAM', precio: 993.00, unidad: 'USD' },
      { codigoInterno: '1014832', modelo: '3VA1463-5EF32-0AA0', varianteNombre: '3VA14 3X630A, 55kA/415V ATAM', precio: 1190.00, unidad: 'USD' },
      { codigoInterno: '1016188', modelo: '3VA1580-5EF32-0AA0', varianteNombre: '3VA14 3X800A, 55kA/415V ATAM', precio: 2097.00, unidad: 'USD' },
      { codigoInterno: '1016776', modelo: '3VA1510-5EF32-0AA0', varianteNombre: '3VA14 3X1000A, 55kA/415V ATAM', precio: 2593.00, unidad: 'USD' },
    ],
  },

  // 2. INTERRUPTORES DE CAJA MOLDEADA 3VA2 (ELECTRONICOS 3P Y 4P)
  {
    codigoPadre: 'SIE-3VA2-ELECTRONICO',
    nombre: 'Interruptor de Caja Moldeada Siemens 3VA2 ETU320 LI (3P y 4P)',
    marca: 'Siemens Proteccion y Control',
    categoria: 'INTERRUPTORES DE CAJA MOLDEADA 3VA',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Interruptores de caja moldeada con disparador electrónico ETU320 LI (Ir=0.4-1 In) tripolares y tetrapolares de 40A a 1000A en 55kA y 85kA / 415V.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1015482', modelo: '3VA2140-5HL32-0AA0', varianteNombre: '3VA21 3x40A, 55kA ETU320 LI', precio: 417.00, unidad: 'USD' },
      { codigoInterno: '1014509', modelo: '3VA2110-5HL32-0AA0', varianteNombre: '3VA21 3x100A, 55kA ETU320 LI', precio: 449.00, unidad: 'USD' },
      { codigoInterno: '1014287', modelo: '3VA2116-5HL32-0AA0', varianteNombre: '3VA21 3x160A, 55kA ETU320 LI', precio: 600.00, unidad: 'USD' },
      { codigoInterno: '1015383', modelo: '3VA2216-5HL32-0AA0', varianteNombre: '3VA22 3x160A, 55kA ETU320 LI', precio: 788.00, unidad: 'USD' },
      { codigoInterno: '1012956', modelo: '3VA2225-5HL32-0AA0', varianteNombre: '3VA22 3x250A, 55kA ETU320 LI', precio: 788.00, unidad: 'USD' },
      { codigoInterno: '1014514', modelo: '3VA2325-5HL32-0AA0', varianteNombre: '3VA23 3x250A, 55kA ETU320 LI', precio: 1083.00, unidad: 'USD' },
      { codigoInterno: '1012955', modelo: '3VA2340-5HL32-0AA0', varianteNombre: '3VA23 3x400A, 55kA ETU320 LI', precio: 1083.00, unidad: 'USD' },
      { codigoInterno: '1012954', modelo: '3VA2463-5HL32-0AA0', varianteNombre: '3VA24 3x630A, 55kA ETU320 LI', precio: 1392.00, unidad: 'USD' },
      { codigoInterno: '1016189', modelo: '3VA2580-5HL32-0AA0', varianteNombre: '3VA25 3x800A, 55kA ETU320 LI', precio: 2369.00, unidad: 'USD' },
      { codigoInterno: '1015635', modelo: '3VA2510-5HL32-0AA0', varianteNombre: '3VA25 3x1000A, 55kA ETU320 LI', precio: 2991.00, unidad: 'USD' },
      { codigoInterno: '1014517', modelo: '3VA2463-6HL32-0AA0', varianteNombre: '3VA24 3x630A, 85kA ETU320 LI', precio: 1584.00, unidad: 'USD' },
      { codigoInterno: '1014518', modelo: '3VA2510-6HL32-0AA0', varianteNombre: '3VA25 3x1000A, 85kA ETU320 LI', precio: 3599.00, unidad: 'USD' },
      { codigoInterno: '1015548', modelo: '3VA2140-5HL42-0AA0', varianteNombre: '3VA21 4x40A, 55kA ETU320 LI', precio: 504.00, unidad: 'USD' },
      { codigoInterno: '1015546', modelo: '3VA2110-5HL42-0AA0', varianteNombre: '3VA21 4x100A, 55kA ETU320 LI', precio: 546.00, unidad: 'USD' },
      { codigoInterno: '1015545', modelo: '3VA2116-5HL42-0AA0', varianteNombre: '3VA21 4x160A, 55kA ETU320 LI', precio: 837.00, unidad: 'USD' },
      { codigoInterno: '1019011', modelo: '3VA2225-5HL42-0AA0', varianteNombre: '3VA22 4x250A, 55kA ETU320 LI', precio: 1108.00, unidad: 'USD' },
      { codigoInterno: '1016057', modelo: '3VA2340-5HL42-0AA0', varianteNombre: '3VA23 4x400A, 55kA ETU320 LI', precio: 1445.00, unidad: 'USD' },
      { codigoInterno: '1016058', modelo: '3VA2463-5HL42-0AA0', varianteNombre: '3VA24 4x630A, 55kA ETU320 LI', precio: 1990.00, unidad: 'USD' },
      { codigoInterno: '1016059', modelo: '3VA2580-5HL42-0AA0', varianteNombre: '3VA25 4x800A, 55kA ETU320 LI', precio: 3137.00, unidad: 'USD' },
      { codigoInterno: '1016060', modelo: '3VA2510-5HL42-0AA0', varianteNombre: '3VA25 4x1000A, 55kA ETU320 LI', precio: 3857.00, unidad: 'USD' },
    ],
  },

  // 3. ACCESORIOS PARA FAMILIA 3VA
  {
    codigoPadre: 'SIE-3VA-ACCESORIOS',
    nombre: 'Accesorios para Interruptores de Caja Moldeada 3VA',
    marca: 'Siemens Proteccion y Control',
    categoria: 'ACCESORIOS PARA LA FAMILIA 3VA',
    familia: 'Accesorios',
    subfamilia: 'Adaptadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Módulos diferenciales RCD520, mandos motorizados, mandos rotativos, bobinas de disparo/mínima tensión, bloques de contactos y enclavamientos para la serie 3VA.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '1016244', modelo: '3VA9113-0RL20', varianteNombre: 'RCD520 MODULO DIFERENCIAL P/ 3VA11', precio: 974.00, unidad: 'USD' },
      { codigoInterno: '1014319', modelo: '3VA9157-0HA20', varianteNombre: 'MANDO MOTORIZADO 110-230VAC P/3VA11', precio: 471.00, unidad: 'USD' },
      { codigoInterno: '1014320', modelo: '3VA9257-0HA20', varianteNombre: 'MANDO MOTORIZADO 110-230VAC P/3VA12', precio: 614.00, unidad: 'USD' },
      { codigoInterno: '1014288', modelo: '3VA9267-0HA20', varianteNombre: 'MANDO MOTORIZADO 110-230VAC P/3VA20,21,22', precio: 614.00, unidad: 'USD' },
      { codigoInterno: '1014380', modelo: '3VA9467-0HA20', varianteNombre: 'MANDO MOTORIZADO 110-230VAC P/3VA13,14,23,24', precio: 766.00, unidad: 'USD' },
      { codigoInterno: '1013654', modelo: '3VA9157-0FK21', varianteNombre: 'MANDOS ROTATIVOS P/3VA10,11', precio: 89.75, unidad: 'USD' },
      { codigoInterno: '1015513', modelo: '3VA9257-0FK21', varianteNombre: 'MANDOS ROTATIVOS P/3VA12', precio: 101.10, unidad: 'USD' },
      { codigoInterno: '1013656', modelo: '3VA9467-0FK21', varianteNombre: 'MANDOS ROTATIVOS P/3VA13,14,23,24', precio: 146.60, unidad: 'USD' },
      { codigoInterno: '1013657', modelo: '3VA9687-0FK21', varianteNombre: 'MANDOS ROTATIVOS P/3VA15, 3VA25', precio: 240.20, unidad: 'USD' },
      { codigoInterno: '1016237', modelo: '3VA9908-0BB25', varianteNombre: 'BOB. MINIMA TENSION 220VAC P/3VA1 Y 3VA20', precio: 112.30, unidad: 'USD' },
      { codigoInterno: '1013660', modelo: '3VA9988-0BL33', varianteNombre: 'BOBINA DE DISPARO 220VAC P/3VA1,2', precio: 86.22, unidad: 'USD' },
      { codigoInterno: '1016239', modelo: '3VA9388-0LB10', varianteNombre: 'BLOQUEO POR CANDADO 3VA10, 11, 12', precio: 57.51, unidad: 'USD' },
      { codigoInterno: '1016238', modelo: '3VA9088-0LB10', varianteNombre: 'BLOQUEO POR CANDADO 3VA13, 14, 23, 24', precio: 43.68, unidad: 'USD' },
      { codigoInterno: '1012973', modelo: '3VA9988-0AA12', varianteNombre: 'CONTACTO AUXILIAR 1NA + 1NC P/3VA1,2 240VAC', precio: 25.58, unidad: 'USD' },
      { codigoInterno: '1013658', modelo: '3VA9988-0AA13', varianteNombre: 'CONTACTO AUXILIAR 1NA + 1NC P/3VA1,2 24VDC', precio: 36.19, unidad: 'USD' },
      { codigoInterno: '1013659', modelo: '3VA9988-0AB13', varianteNombre: 'CONTACTO AUX. DE ALARMA 1NA+1NC P/3VA1,2', precio: 36.19, unidad: 'USD' },
      { codigoInterno: '1014289', modelo: '3VA9088-0VM10', varianteNombre: 'ENCLAV. MECÁNICO PARA 2 INTERRUPTORES', precio: 267.00, unidad: 'USD' },
      { codigoInterno: '1016240', modelo: '3VA9088-0VK10', varianteNombre: 'RIEL PARA MONTAJE 3VA1/2 630A', precio: 102.30, unidad: 'USD' },
      { codigoInterno: '1016241', modelo: '3VA9158-0VK20', varianteNombre: 'MARCO DE MONTAJE 3VA1 160', precio: 18.62, unidad: 'USD' },
      { codigoInterno: '1016242', modelo: '3VA9258-0VK20', varianteNombre: 'MARCO DE MONTAJE 3VA1 250', precio: 19.14, unidad: 'USD' },
      { codigoInterno: '1018168', modelo: '3VA9268-0VK20', varianteNombre: 'MARCO DE MONTAJE 3VA20/21/22', precio: 16.51, unidad: 'USD' },
      { codigoInterno: '1016243', modelo: '3VA9468-0VK20', varianteNombre: 'MARCO DE MONTAJE 3VA1/2 630', precio: 18.62, unidad: 'USD' },
    ],
  },

  // 4. INTERRUPTORES DE CAJA MOLDEADA 3VA27 Y ACCESORIOS
  {
    codigoPadre: 'SIE-3VA27-ACCESORIOS',
    nombre: 'Interruptor de Potencia Siemens 3VA27 ETU350 (800A a 1600A) y Accesorios 3VW9',
    marca: 'Siemens Proteccion y Control',
    categoria: 'INTERRUPTORES DE CAJA MOLDEADA 3VA27',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Interruptores de potencia compactos Siemens 3VA27 (800A a 1600A) con unidad electrónica ETU350, bobinas 3VW9011 y mandos motorizados.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1016087', modelo: '3VA2780-1AC05-0AA0', varianteNombre: '3x800A, 55kA ETU350', precio: 2732.00, unidad: 'USD' },
      { codigoInterno: '1016088', modelo: '3VA2710-1AC05-0AA0', varianteNombre: '3x1000A, 55kA ETU350', precio: 2883.00, unidad: 'USD' },
      { codigoInterno: '1016190', modelo: '3VA2712-1AC05-0AA0', varianteNombre: '3x1250A, 55kA ETU350', precio: 3852.00, unidad: 'USD' },
      { codigoInterno: '1016191', modelo: '3VA2716-1AC05-0AA0', varianteNombre: '3x1600A, 55kA ETU350', precio: 5311.00, unidad: 'USD' },
      { codigoInterno: '1016094', modelo: '3VA2716-2AC05-0AA0', varianteNombre: '3x1600A, 85kA ETU350', precio: 5285.00, unidad: 'USD' },
      { codigoInterno: '1015460', modelo: '3VW9011-0AD07', varianteNombre: 'BOBINA DE APERTURA/CIERRE 220-240V 3VA27', precio: 240.20, unidad: 'USD' },
      { codigoInterno: '1015699', modelo: '3VW9011-0AE07', varianteNombre: 'BOBINA DE MÍNIMA TENSIÓN 220-240V 3VA27', precio: 259.00, unidad: 'USD' },
      { codigoInterno: '1015459', modelo: '3VW9011-0AF04', varianteNombre: 'MANDO MOTORIZADO 220-250V 3VA27', precio: 1005.00, unidad: 'USD' },
      { codigoInterno: '1015461', modelo: '3VW9011-0BB21', varianteNombre: 'ENCLAVAMIENTO MECÁNICO CABLE BOWDEN 3VA27', precio: 401.00, unidad: 'USD' },
      { codigoInterno: '1015462', modelo: '3VW9011-0BB53', varianteNombre: 'KIT EXT PARED LATERAL 3VA27', precio: 93.18, unidad: 'USD' },
    ],
  },

  // 5. INTERRUPTORES DE BASTIDOR ABIERTO 3WT Y ACCESORIOS 3WT9
  {
    codigoPadre: 'SIE-3WT-BASTIDOR-ABIERTO',
    nombre: 'Interruptor de Bastidor Abierto ACB Siemens 3WT (2000A a 3200A) y Accesorios 3WT9',
    marca: 'Siemens Proteccion y Control',
    categoria: 'INTERRUPTORES DE BASTIDOR ABIERTO 3WT',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Interruptores de potencia en aire (ACB) Siemens 3WT de 2000A, 2500A y 3200A con unidades de motor operador, bobinas y conectores auxiliares.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1018144', modelo: '3WT8202-8AA00-0AA2-Z A04', varianteNombre: 'ACB 3X2000A 66kA/500VAC', precio: 4708.00, unidad: 'USD' },
      { codigoInterno: '1020245', modelo: '3WT8252-8AA00-0AA2-Z A04', varianteNombre: 'ACB 3X2500A 66kA/500VAC', precio: 5912.00, unidad: 'USD' },
      { codigoInterno: '1020294', modelo: '3WT8322-8AA00-0AA2-Z A04', varianteNombre: 'ACB 3X3200A 66kA/500VAC', precio: 6988.00, unidad: 'USD' },
      { codigoInterno: '1014824', modelo: '3WT9831-1JK00', varianteNombre: 'MOTOR OPERADOR Y BOBINA CIERRE 220V', precio: 795.00, unidad: 'USD' },
      { codigoInterno: '1014825', modelo: '3WT9851-1JK00', varianteNombre: 'BOBINA DE APERTURA 220V', precio: 146.60, unidad: 'USD' },
      { codigoInterno: '1014826', modelo: '3WT9853-1JK00', varianteNombre: 'BOBINA DE MINIMA TENSIÓN 220V', precio: 146.60, unidad: 'USD' },
      { codigoInterno: '1021076', modelo: '3WT9111-0AB10', varianteNombre: 'CONECTOR AUXILIAR REGLETA NUEVO MODELO', precio: 29.85, unidad: 'USD' },
      { codigoInterno: '1014828', modelo: '3WT9866-3JA00', varianteNombre: 'ENCLAVAMIENTO MECÁNICO CABLE BOWDEN', precio: 580.00, unidad: 'USD' },
    ],
  },

  // 6. MONITOR DE CORRIENTE RESIDUAL Y SENSORES 5SV8
  {
    codigoPadre: 'SIE-MONITOR-DIFERENCIAL-5SV8',
    nombre: 'Monitor de Corriente Residual Analógico y Digital 5SV8',
    marca: 'Siemens Proteccion y Control',
    categoria: 'MONITOR DE CORRIENTE RESIDUAL',
    familia: 'Equipos de Medición',
    subfamilia: 'Multímetros',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Monitores de corriente residual diferencial Siemens 5SV8 en versiones analógica y digital (1 y 4 canales).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
    variantes: [
      { codigoInterno: '1016730', modelo: '5SV8000-6KK', varianteNombre: 'MONITOR DE CORRIENTE ANALÓGICO', precio: 252.00, unidad: 'USD' },
      { codigoInterno: '1017560', modelo: '5SV8001-6KK', varianteNombre: 'MONITOR DE CORRIENTE DIGITAL 1 CANAL', precio: 477.00, unidad: 'USD' },
      { codigoInterno: '1017563', modelo: '5SV8200-6KK', varianteNombre: 'MONITOR DE CORRIENTE DIGITAL 4 CANALES', precio: 726.00, unidad: 'USD' },
    ],
  },

  // 7. INTERRUPTORES DE CAJA MOLDEADA 3VM (FIJOS Y REGULABLES 2P, 3P, 4P) Y ACCESORIOS
  {
    codigoPadre: 'SIE-3VM-CAJA-MOLDEADA',
    nombre: 'Interruptor de Caja Moldeada Siemens 3VM (Fijos y Regulables 16A a 630A)',
    marca: 'Siemens Proteccion y Control',
    categoria: 'INTERRUPTORES DE CAJA MOLDEADA 3VM',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Interruptores de caja moldeada económicos Siemens 3VM (3VM10, 3VM11, 3VM12, 3VM13, 3VM14) fijos y regulables (ATFM) en ejecuciones 2P, 3P y 4P con accesorios 3VM9.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1014949', modelo: '3VM1125-3ED22-0AA0', varianteNombre: 'FIJO 2x25A 25kA FTFM', precio: 90.69, unidad: 'USD' },
      { codigoInterno: '1018162', modelo: '3VM1132-3ED22-0AA0', varianteNombre: 'FIJO 2x32A 25kA FTFM', precio: 90.69, unidad: 'USD' },
      { codigoInterno: '1015109', modelo: '3VM1140-3ED22-0AA0', varianteNombre: 'FIJO 2x40A 25kA FTFM', precio: 90.69, unidad: 'USD' },
      { codigoInterno: '1015111', modelo: '3VM1150-3ED22-0AA0', varianteNombre: 'FIJO 2x50A 25kA FTFM', precio: 90.69, unidad: 'USD' },
      { codigoInterno: '1015110', modelo: '3VM1163-3ED22-0AA0', varianteNombre: 'FIJO 2x63A 25kA FTFM', precio: 90.69, unidad: 'USD' },
      { codigoInterno: '1019305', modelo: '3VM1180-3ED22-0AA0', varianteNombre: 'FIJO 2x80A 25kA FTFM', precio: 91.94, unidad: 'USD' },
      { codigoInterno: '1014703', modelo: '3VM1020-2ED32-0AA0', varianteNombre: 'FIJO 3x20A 16kA FTFM', precio: 128.84, unidad: 'USD' },
      { codigoInterno: '1014704', modelo: '3VM1025-2ED32-0AA0', varianteNombre: 'FIJO 3x25A 16kA FTFM', precio: 94.64, unidad: 'USD' },
      { codigoInterno: '1014705', modelo: '3VM1032-2ED32-0AA0', varianteNombre: 'FIJO 3x32A 16kA FTFM', precio: 94.64, unidad: 'USD' },
      { codigoInterno: '1014706', modelo: '3VM1040-2ED32-0AA0', varianteNombre: 'FIJO 3x40A 16kA FTFM', precio: 94.64, unidad: 'USD' },
      { codigoInterno: '1014707', modelo: '3VM1050-2ED32-0AA0', varianteNombre: 'FIJO 3x50A 16kA FTFM', precio: 94.64, unidad: 'USD' },
      { codigoInterno: '1014708', modelo: '3VM1063-2ED32-0AA0', varianteNombre: 'FIJO 3x63A 16kA FTFM', precio: 94.64, unidad: 'USD' },
      { codigoInterno: '1014407', modelo: '3VM1080-2ED32-0AA0', varianteNombre: 'FIJO 3x80A 16kA FTFM', precio: 104.00, unidad: 'USD' },
      { codigoInterno: '1014992', modelo: '3VM1010-2ED32-0AA0', varianteNombre: 'FIJO 3x100A 16kA FTFM', precio: 116.50, unidad: 'USD' },
      { codigoInterno: '1014709', modelo: '3VM1112-3ED32-0AA0', varianteNombre: 'FIJO 3x125A 25kA FTFM', precio: 181.00, unidad: 'USD' },
      { codigoInterno: '1016192', modelo: '3VM1116-3ED32-0AA0', varianteNombre: 'FIJO 3x160A 25kA FTFM', precio: 212.20, unidad: 'USD' },
      { codigoInterno: '1014851', modelo: '3VM1220-4ED32-0AA0', varianteNombre: 'FIJO 3x200A 36kA FTFM', precio: 295.00, unidad: 'USD' },
      { codigoInterno: '1014716', modelo: '3VM1225-4ED32-0AA0', varianteNombre: 'FIJO 3x250A 36kA FTFM', precio: 327.00, unidad: 'USD' },
      { codigoInterno: '1014715', modelo: '3VM1196-3EE32-0AA0', varianteNombre: 'REGULABLE 3x16A 25kA ATFM', precio: 131.00, unidad: 'USD' },
      { codigoInterno: '1014710', modelo: '3VM1120-3EE32-0AA0', varianteNombre: 'REGULABLE 3x20A 25kA ATFM', precio: 131.00, unidad: 'USD' },
      { codigoInterno: '1014711', modelo: '3VM1125-3EE32-0AA0', varianteNombre: 'REGULABLE 3x25A 25kA ATFM', precio: 131.00, unidad: 'USD' },
      { codigoInterno: '1014712', modelo: '3VM1132-3EE32-0AA0', varianteNombre: 'REGULABLE 3x32A 25kA ATFM', precio: 131.00, unidad: 'USD' },
      { codigoInterno: '1014951', modelo: '3VM1140-3EE32-0AA0', varianteNombre: 'REGULABLE 3x40A 25kA ATFM', precio: 131.00, unidad: 'USD' },
      { codigoInterno: '1016193', modelo: '3VM1150-3EE32-0AA0', varianteNombre: 'REGULABLE 3x50A 25kA ATFM', precio: 131.00, unidad: 'USD' },
      { codigoInterno: '1016194', modelo: '3VM1163-3EE32-0AA0', varianteNombre: 'REGULABLE 3x63A 25kA ATFM', precio: 131.00, unidad: 'USD' },
      { codigoInterno: '1014950', modelo: '3VM1180-3EE32-0AA0', varianteNombre: 'REGULABLE 3x80A 25kA ATFM', precio: 142.50, unidad: 'USD' },
      { codigoInterno: '1016195', modelo: '3VM1110-3EE32-0AA0', varianteNombre: 'REGULABLE 3x100A 25kA ATFM', precio: 142.50, unidad: 'USD' },
      { codigoInterno: '1016196', modelo: '3VM1112-3EE32-0AA0', varianteNombre: 'REGULABLE 3x125A 25kA ATFM', precio: 189.30, unidad: 'USD' },
      { codigoInterno: '1016197', modelo: '3VM1116-3EE32-0AA0', varianteNombre: 'REGULABLE 3x160A 25kA ATFM', precio: 218.40, unidad: 'USD' },
      { codigoInterno: '1020351', modelo: '3VM1196-4EE32-0AA0', varianteNombre: 'REGULABLE 3x16A 36kA ATFM', precio: 175.80, unidad: 'USD' },
      { codigoInterno: '1017136', modelo: '3VM1120-4EE32-0AA0', varianteNombre: 'REGULABLE 3x20A 36kA ATFM', precio: 175.80, unidad: 'USD' },
      { codigoInterno: '1018695', modelo: '3VM1125-4EE32-0AA0', varianteNombre: 'REGULABLE 3x25A 36kA ATFM', precio: 175.80, unidad: 'USD' },
      { codigoInterno: '1018933', modelo: '3VM1132-4EE32-0AA0', varianteNombre: 'REGULABLE 3x32A 36kA ATFM', precio: 175.80, unidad: 'USD' },
      { codigoInterno: '1017360', modelo: '3VM1140-4EE32-0AA0', varianteNombre: 'REGULABLE 3x40A 36kA ATFM', precio: 175.80, unidad: 'USD' },
      { codigoInterno: '1016749', modelo: '3VM1150-4EE32-0AA0', varianteNombre: 'REGULABLE 3x50A 36kA ATFM', precio: 175.80, unidad: 'USD' },
      { codigoInterno: '1017139', modelo: '3VM1163-4EE32-0AA0', varianteNombre: 'REGULABLE 3x63A 36kA ATFM', precio: 175.80, unidad: 'USD' },
      { codigoInterno: '1017312', modelo: '3VM1180-4EE32-0AA0', varianteNombre: 'REGULABLE 3x80A 36kA ATFM', precio: 177.80, unidad: 'USD' },
      { codigoInterno: '1017305', modelo: '3VM1110-4EE32-0AA0', varianteNombre: 'REGULABLE 3x100A 36kA ATFM', precio: 182.00, unidad: 'USD' },
      { codigoInterno: '1017559', modelo: '3VM1112-4EE32-0AA0', varianteNombre: 'REGULABLE 3x125A 36kA ATFM', precio: 222.60, unidad: 'USD' },
      { codigoInterno: '1017365', modelo: '3VM1116-4EE32-0AA0', varianteNombre: 'REGULABLE 3x160A 36kA ATFM', precio: 236.10, unidad: 'USD' },
      { codigoInterno: '1016312', modelo: '3VM1220-4EE32-0AA0', varianteNombre: 'REGULABLE 3x200A 36kA ATFM', precio: 323.00, unidad: 'USD' },
      { codigoInterno: '1016313', modelo: '3VM1225-4EE32-0AA0', varianteNombre: 'REGULABLE 3x250A 36kA ATFM', precio: 337.00, unidad: 'USD' },
      { codigoInterno: '1014852', modelo: '3VM1340-4EE32-0AA0', varianteNombre: 'REGULABLE 3x400A 36kA ATFM', precio: 593.00, unidad: 'USD' },
      { codigoInterno: '1016198', modelo: '3VM1463-4EE32-0AA0', varianteNombre: 'REGULABLE 3x630A 36kA ATFM', precio: 650.00, unidad: 'USD' },
      { codigoInterno: '1017626', modelo: '3VM1340-5EE32-0AA0', varianteNombre: 'REGULABLE 3x400A 55kA ATFM', precio: 912.00, unidad: 'USD' },
      { codigoInterno: '1017625', modelo: '3VM1463-5EE32-0AA0', varianteNombre: 'REGULABLE 3x630A 55kA ATFM', precio: 996.00, unidad: 'USD' },
      { codigoInterno: '1016880', modelo: '3VM1125-3GE42-0AA0', varianteNombre: 'REGULABLE 4x25A 25kA ATFM', precio: 145.60, unidad: 'USD' },
      { codigoInterno: '1013790', modelo: '3VM1132-3GE42-0AA0', varianteNombre: 'REGULABLE 4x32A 25kA ATFM', precio: 145.60, unidad: 'USD' },
      { codigoInterno: '1015327', modelo: '3VM1140-3GE42-0AA0', varianteNombre: 'REGULABLE 4x40A 25kA ATFM', precio: 145.60, unidad: 'USD' },
      { codigoInterno: '1013793', modelo: '3VM1150-3GE42-0AA0', varianteNombre: 'REGULABLE 4x50A 25kA ATFM', precio: 145.60, unidad: 'USD' },
      { codigoInterno: '1018138', modelo: '3VM1163-3GE42-0AA0', varianteNombre: 'REGULABLE 4x63A 25kA ATFM', precio: 145.60, unidad: 'USD' },
      { codigoInterno: '1013794', modelo: '3VM1180-3GE42-0AA0', varianteNombre: 'REGULABLE 4x80A 25kA ATFM', precio: 160.20, unidad: 'USD' },
      { codigoInterno: '1018137', modelo: '3VM1110-3GE42-0AA0', varianteNombre: 'REGULABLE 4x100A 25kA ATFM', precio: 184.10, unidad: 'USD' },
      { codigoInterno: '1018803', modelo: '3VM1112-3GE42-0AA0', varianteNombre: 'REGULABLE 4x125A 25kA ATFM', precio: 298.00, unidad: 'USD' },
      { codigoInterno: '1014544', modelo: '3VM1116-3GE42-0AA0', varianteNombre: 'REGULABLE 4x160A 25kA ATFM', precio: 307.00, unidad: 'USD' },
      { codigoInterno: '1016306', modelo: '3VM1220-4GE42-0AA0', varianteNombre: 'REGULABLE 4x200A 36kA ATFM', precio: 393.00, unidad: 'USD' },
      { codigoInterno: '1014339', modelo: '3VM1225-4GE42-0AA0', varianteNombre: 'REGULABLE 4x250A 36kA ATFM', precio: 438.00, unidad: 'USD' },
      { codigoInterno: '1017823', modelo: '3VM9988-0AA12', varianteNombre: 'CONTACTO AUXILIAR 1 NA + 1 NC 240 VAC', precio: 32.24, unidad: 'USD' },
      { codigoInterno: '1022419', modelo: '3VM9988-0AB12', varianteNombre: 'CONTACTO DE ALARMA 1 NA + 1 NC 240 VAC', precio: 29.22, unidad: 'USD' },
      { codigoInterno: '1014545', modelo: '3VM9908-0BL33', varianteNombre: 'BOBINA DE DISPARO 208-777VAC/220-250VDC', precio: 101.60, unidad: 'USD' },
    ],
  },

  // 8. INTERRUPTORES DE RIEL TERMOMAGNETICOS 5SL6 (6kA) Y 5SL4 (10kA)
  {
    codigoPadre: 'SIE-5SL-TERMOMAGNETICO',
    nombre: 'Interruptor Termomagnético Riel DIN Siemens 5SL6 (6kA) y 5SL4 (10kA)',
    marca: 'Siemens Proteccion y Control',
    categoria: 'INTERRUPTORES DE RIEL (1 POLO) 5SL6 - 6kA/400V',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Interruptores automáticos para riel DIN Siemens series 5SL6 (6kA) y 5SL4 (10kA) en ejecuciones 1P, 2P, 3P y 4P desde 1A hasta 63A.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '1017296', modelo: '5SL6101-7MB', varianteNombre: '5SL6 1x1A 6kA', precio: 10.50, unidad: 'USD' },
      { codigoInterno: '1016199', modelo: '5SL6102-7MB', varianteNombre: '5SL6 1x2A 6kA', precio: 9.80, unidad: 'USD' },
      { codigoInterno: '1016200', modelo: '5SL6104-7MB', varianteNombre: '5SL6 1x4A 6kA', precio: 9.80, unidad: 'USD' },
      { codigoInterno: '1016201', modelo: '5SL6106-7MB', varianteNombre: '5SL6 1x6A 6kA', precio: 8.48, unidad: 'USD' },
      { codigoInterno: '1016202', modelo: '5SL6110-7MB', varianteNombre: '5SL6 1x10A 6kA', precio: 7.18, unidad: 'USD' },
      { codigoInterno: '1016203', modelo: '5SL6116-7MB', varianteNombre: '5SL6 1x16A 6kA', precio: 7.18, unidad: 'USD' },
      { codigoInterno: '1016204', modelo: '5SL6120-7MB', varianteNombre: '5SL6 1x20A 6kA', precio: 7.18, unidad: 'USD' },
      { codigoInterno: '1018936', modelo: '5SL6125-7MB', varianteNombre: '5SL6 1x25A 6kA', precio: 7.18, unidad: 'USD' },
      { codigoInterno: '1016205', modelo: '5SL6132-7MB', varianteNombre: '5SL6 1x32A 6kA', precio: 7.35, unidad: 'USD' },
      { codigoInterno: '1016753', modelo: '5SL6140-7MB', varianteNombre: '5SL6 1x40A 6kA', precio: 9.09, unidad: 'USD' },
      { codigoInterno: '1017297', modelo: '5SL6150-7MB', varianteNombre: '5SL6 1x50A 6kA', precio: 11.13, unidad: 'USD' },
      { codigoInterno: '1016754', modelo: '5SL6163-7MB', varianteNombre: '5SL6 1x63A 6kA', precio: 11.13, unidad: 'USD' },
      { codigoInterno: '1017302', modelo: '5SL6201-7MB', varianteNombre: '5SL6 2x1A 6kA', precio: 31.41, unidad: 'USD' },
      { codigoInterno: '1014903', modelo: '5SL6202-7MB', varianteNombre: '5SL6 2x2A 6kA', precio: 22.67, unidad: 'USD' },
      { codigoInterno: '1014902', modelo: '5SL6204-7MB', varianteNombre: '5SL6 2x4A 6kA', precio: 22.67, unidad: 'USD' },
      { codigoInterno: '1015299', modelo: '5SL6206-7MB', varianteNombre: '5SL6 2x6A 6kA', precio: 19.14, unidad: 'USD' },
      { codigoInterno: '1016206', modelo: '5SL6210-7MB', varianteNombre: '5SL6 2x10A 6kA', precio: 14.46, unidad: 'USD' },
      { codigoInterno: '1014900', modelo: '5SL6216-7MB', varianteNombre: '5SL6 2x16A 6kA', precio: 13.73, unidad: 'USD' },
      { codigoInterno: '1016207', modelo: '5SL6220-7MB', varianteNombre: '5SL6 2x20A 6kA', precio: 13.73, unidad: 'USD' },
      { codigoInterno: '1014947', modelo: '5SL6225-7MB', varianteNombre: '5SL6 2x25A 6kA', precio: 15.60, unidad: 'USD' },
      { codigoInterno: '1016208', modelo: '5SL6232-7MB', varianteNombre: '5SL6 2x32A 6kA', precio: 15.60, unidad: 'USD' },
      { codigoInterno: '1016209', modelo: '5SL6240-7MB', varianteNombre: '5SL6 2x40A 6kA', precio: 16.85, unidad: 'USD' },
      { codigoInterno: '1016210', modelo: '5SL6250-7MB', varianteNombre: '5SL6 2x50A 6kA', precio: 19.55, unidad: 'USD' },
      { codigoInterno: '1016211', modelo: '5SL6263-7MB', varianteNombre: '5SL6 2x63A 6kA', precio: 21.63, unidad: 'USD' },
      { codigoInterno: '1017303', modelo: '5SL6301-7MB', varianteNombre: '5SL6 3x1A 6kA', precio: 43.06, unidad: 'USD' },
      { codigoInterno: '1014946', modelo: '5SL6302-7MB', varianteNombre: '5SL6 3x2A 6kA', precio: 31.41, unidad: 'USD' },
      { codigoInterno: '1016212', modelo: '5SL6304-7MB', varianteNombre: '5SL6 3x4A 6kA', precio: 31.41, unidad: 'USD' },
      { codigoInterno: '1016213', modelo: '5SL6306-7MB', varianteNombre: '5SL6 3x6A 6kA', precio: 32.97, unidad: 'USD' },
      { codigoInterno: '1016214', modelo: '5SL6310-7MB', varianteNombre: '5SL6 3x10A 6kA', precio: 30.26, unidad: 'USD' },
      { codigoInterno: '1014901', modelo: '5SL6316-7MB', varianteNombre: '5SL6 3x16A 6kA', precio: 30.26, unidad: 'USD' },
      { codigoInterno: '1016215', modelo: '5SL6320-7MB', varianteNombre: '5SL6 3x20A 6kA', precio: 30.26, unidad: 'USD' },
      { codigoInterno: '1016216', modelo: '5SL6325-7MB', varianteNombre: '5SL6 3x25A 6kA', precio: 30.26, unidad: 'USD' },
      { codigoInterno: '1016217', modelo: '5SL6332-7MB', varianteNombre: '5SL6 3x32A 6kA', precio: 31.41, unidad: 'USD' },
      { codigoInterno: '1016218', modelo: '5SL6340-7MB', varianteNombre: '5SL6 3x40A 6kA', precio: 33.59, unidad: 'USD' },
      { codigoInterno: '1016219', modelo: '5SL6350-7MB', varianteNombre: '5SL6 3x50A 6kA', precio: 33.59, unidad: 'USD' },
      { codigoInterno: '1016220', modelo: '5SL6363-7MB', varianteNombre: '5SL6 3x63A 6kA', precio: 35.36, unidad: 'USD' },
      { codigoInterno: '1015959', modelo: '5SL4102-7RC', varianteNombre: '5SL4 1x2A 10kA', precio: 15.18, unidad: 'USD' },
      { codigoInterno: '1014868', modelo: '5SL4104-7RC', varianteNombre: '5SL4 1x4A 10kA', precio: 15.18, unidad: 'USD' },
      { codigoInterno: '1015962', modelo: '5SL4106-7RC', varianteNombre: '5SL4 1x6A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1015711', modelo: '5SL4110-7RC', varianteNombre: '5SL4 1x10A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1016221', modelo: '5SL4116-7RC', varianteNombre: '5SL4 1x16A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1014871', modelo: '5SL4120-7RC', varianteNombre: '5SL4 1x20A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1015713', modelo: '5SL4125-7RC', varianteNombre: '5SL4 1x25A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1014844', modelo: '5SL4132-7RC', varianteNombre: '5SL4 1x32A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1015087', modelo: '5SL4140-7RC', varianteNombre: '5SL4 1x40A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1015714', modelo: '5SL4150-7RC', varianteNombre: '5SL4 1x50A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1014866', modelo: '5SL4163-7RC', varianteNombre: '5SL4 1x63A 10kA', precio: 11.54, unidad: 'USD' },
      { codigoInterno: '1014004', modelo: '5SL4202-7RC', varianteNombre: '5SL4 2x2A 10kA', precio: 33.28, unidad: 'USD' },
      { codigoInterno: '1013787', modelo: '5SL4204-7RC', varianteNombre: '5SL4 2x4A 10kA', precio: 33.28, unidad: 'USD' },
      { codigoInterno: '1013788', modelo: '5SL4206-7RC', varianteNombre: '5SL4 2x6A 10kA', precio: 24.54, unidad: 'USD' },
      { codigoInterno: '1013759', modelo: '5SL4210-7RC', varianteNombre: '5SL4 2x10A 10kA', precio: 19.55, unidad: 'USD' },
      { codigoInterno: '1016222', modelo: '5SL4216-7RC', varianteNombre: '5SL4 2x16A 10kA', precio: 19.55, unidad: 'USD' },
      { codigoInterno: '1014848', modelo: '5SL4220-7RC', varianteNombre: '5SL4 2x20A 10kA', precio: 19.55, unidad: 'USD' },
      { codigoInterno: '1016223', modelo: '5SL4225-7RC', varianteNombre: '5SL4 2x25A 10kA', precio: 19.55, unidad: 'USD' },
      { codigoInterno: '1016224', modelo: '5SL4232-7RC', varianteNombre: '5SL4 2x32A 10kA', precio: 19.55, unidad: 'USD' },
      { codigoInterno: '1016225', modelo: '5SL4240-7RC', varianteNombre: '5SL4 2x40A 10kA', precio: 26.42, unidad: 'USD' },
      { codigoInterno: '1016226', modelo: '5SL4250-7RC', varianteNombre: '5SL4 2x50A 10kA', precio: 25.79, unidad: 'USD' },
      { codigoInterno: '1016227', modelo: '5SL4263-7RC', varianteNombre: '5SL4 2x63A 10kA', precio: 26.42, unidad: 'USD' },
      { codigoInterno: '1014005', modelo: '5SL4302-7RC', varianteNombre: '5SL4 3x2A 10kA', precio: 45.45, unidad: 'USD' },
      { codigoInterno: '1016228', modelo: '5SL4304-7RC', varianteNombre: '5SL4 3x4A 10kA', precio: 45.45, unidad: 'USD' },
      { codigoInterno: '1016229', modelo: '5SL4306-7RC', varianteNombre: '5SL4 3x6A 10kA', precio: 35.98, unidad: 'USD' },
      { codigoInterno: '1016230', modelo: '5SL4310-7RC', varianteNombre: '5SL4 3x10A 10kA', precio: 36.82, unidad: 'USD' },
      { codigoInterno: '1016231', modelo: '5SL4316-7RC', varianteNombre: '5SL4 3x16A 10kA', precio: 36.82, unidad: 'USD' },
      { codigoInterno: '1014873', modelo: '5SL4320-7RC', varianteNombre: '5SL4 3x20A 10kA', precio: 36.82, unidad: 'USD' },
      { codigoInterno: '1016232', modelo: '5SL4325-7RC', varianteNombre: '5SL4 3x25A 10kA', precio: 36.82, unidad: 'USD' },
      { codigoInterno: '1014843', modelo: '5SL4332-7RC', varianteNombre: '5SL4 3x32A 10kA', precio: 38.17, unidad: 'USD' },
      { codigoInterno: '1016233', modelo: '5SL4340-7RC', varianteNombre: '5SL4 3x40A 10kA', precio: 45.45, unidad: 'USD' },
      { codigoInterno: '1016234', modelo: '5SL4350-7RC', varianteNombre: '5SL4 3x50A 10kA', precio: 45.45, unidad: 'USD' },
      { codigoInterno: '1014847', modelo: '5SL4363-7RC', varianteNombre: '5SL4 3x63A 10kA', precio: 45.45, unidad: 'USD' },
      { codigoInterno: '1015995', modelo: '5SL4410-7', varianteNombre: '5SL4 4x10A 10kA', precio: 59.20, unidad: 'USD' },
      { codigoInterno: '1015996', modelo: '5SL4416-7', varianteNombre: '5SL4 4x16A 10kA', precio: 59.20, unidad: 'USD' },
      { codigoInterno: '1015997', modelo: '5SL4420-7', varianteNombre: '5SL4 4x20A 10kA', precio: 59.20, unidad: 'USD' },
      { codigoInterno: '1015998', modelo: '5SL4425-7', varianteNombre: '5SL4 4x25A 10kA', precio: 59.20, unidad: 'USD' },
      { codigoInterno: '1015999', modelo: '5SL4432-7', varianteNombre: '5SL4 4x32A 10kA', precio: 72.43, unidad: 'USD' },
      { codigoInterno: '1016000', modelo: '5SL4440-7', varianteNombre: '5SL4 4x40A 10kA', precio: 91.64, unidad: 'USD' },
      { codigoInterno: '1016001', modelo: '5SL4450-7', varianteNombre: '5SL4 4x50A 10kA', precio: 109.27, unidad: 'USD' },
      { codigoInterno: '1016002', modelo: '5SL4463-7', varianteNombre: '5SL4 4x63A 10kA', precio: 126.90, unidad: 'USD' },
    ],
  },

  // 9. INTERRUPTORES DE RIEL TERMOMAGNETICOS 5SY4 Y DIFERENCIALES 5SV/5SP
  {
    codigoPadre: 'SIE-5SY-5SV-INTERRUPTORES',
    nombre: 'Interruptor Termomagnético Industrial 5SY4, 5SP4 y Diferenciales 5SV (Tipo AC / Tipo A Super Inmunizado)',
    marca: 'Siemens Proteccion y Control',
    categoria: 'INTERRUPTORES DE RIEL (1 POLO) 5SY4',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Interruptores termomagnéticos de alto poder de corte 5SY4 (hasta 35kA) / 5SP4 (80A-125A), interruptores diferenciales 5SV (Tipo AC y Tipo A Super Inmunizados) y contactos auxiliares 5ST3.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1014717', modelo: '5SY4101-7', varianteNombre: '5SY4 1x1A 35kA', precio: 18.62, unidad: 'USD' },
      { codigoInterno: '1014718', modelo: '5SY4102-7', varianteNombre: '5SY4 1x2A 35kA', precio: 18.62, unidad: 'USD' },
      { codigoInterno: '1014719', modelo: '5SY4104-7', varianteNombre: '5SY4 1x4A 35kA', precio: 18.62, unidad: 'USD' },
      { codigoInterno: '1015970', modelo: '5SY4106-7', varianteNombre: '5SY4 1x6A 35kA', precio: 18.62, unidad: 'USD' },
      { codigoInterno: '1015704', modelo: '5SY4110-7', varianteNombre: '5SY4 1x10A 20kA', precio: 18.62, unidad: 'USD' },
      { codigoInterno: '1015705', modelo: '5SY4116-7', varianteNombre: '5SY4 1x16A 20kA', precio: 15.60, unidad: 'USD' },
      { codigoInterno: '1014849', modelo: '5SY4120-7', varianteNombre: '5SY4 1x20A 20kA', precio: 15.60, unidad: 'USD' },
      { codigoInterno: '1015971', modelo: '5SY4125-7', varianteNombre: '5SY4 1x25A 20kA', precio: 15.60, unidad: 'USD' },
      { codigoInterno: '1015707', modelo: '5SY4132-7', varianteNombre: '5SY4 1x32A 20kA', precio: 18.62, unidad: 'USD' },
      { codigoInterno: '1014870', modelo: '5SY4140-7', varianteNombre: '5SY4 1x40A 15kA', precio: 21.84, unidad: 'USD' },
      { codigoInterno: '1015708', modelo: '5SY4150-7', varianteNombre: '5SY4 1x50A 15kA', precio: 25.79, unidad: 'USD' },
      { codigoInterno: '1015709', modelo: '5SY4163-7', varianteNombre: '5SY4 1x63A 15kA', precio: 26.21, unidad: 'USD' },
      { codigoInterno: '1014387', modelo: '5SY4201-7', varianteNombre: '5SY4 2x1A 35kA', precio: 45.45, unidad: 'USD' },
      { codigoInterno: '1013142', modelo: '5SY4202-7', varianteNombre: '5SY4 2x2A 35kA', precio: 45.45, unidad: 'USD' },
      { codigoInterno: '1013141', modelo: '5SY4204-7', varianteNombre: '5SY4 2x4A 35kA', precio: 45.45, unidad: 'USD' },
      { codigoInterno: '1013150', modelo: '5SY4206-7', varianteNombre: '5SY4 2x6A 35kA', precio: 43.06, unidad: 'USD' },
      { codigoInterno: '1013140', modelo: '5SY4210-7', varianteNombre: '5SY4 2x10A 20kA', precio: 38.27, unidad: 'USD' },
      { codigoInterno: '1012964', modelo: '5SY4216-7', varianteNombre: '5SY4 2x16A 20kA', precio: 38.27, unidad: 'USD' },
      { codigoInterno: '1012963', modelo: '5SY4220-7', varianteNombre: '5SY4 2x20A 20kA', precio: 38.27, unidad: 'USD' },
      { codigoInterno: '1013718', modelo: '5SY4225-7', varianteNombre: '5SY4 2x25A 20kA', precio: 38.27, unidad: 'USD' },
      { codigoInterno: '1013148', modelo: '5SY4232-7', varianteNombre: '5SY4 2x32A 20kA', precio: 37.65, unidad: 'USD' },
      { codigoInterno: '1013139', modelo: '5SY4240-7', varianteNombre: '5SY4 2x40A 15kA', precio: 52.52, unidad: 'USD' },
      { codigoInterno: '1014532', modelo: '5SY4250-7', varianteNombre: '5SY4 2x50A 15kA', precio: 53.77, unidad: 'USD' },
      { codigoInterno: '1013719', modelo: '5SY4263-7', varianteNombre: '5SY4 2x63A 15kA', precio: 56.16, unidad: 'USD' },
      { codigoInterno: '1015972', modelo: '5SY4301-7', varianteNombre: '5SY4 3x1A 35kA', precio: 60.94, unidad: 'USD' },
      { codigoInterno: '1014355', modelo: '5SY4302-7', varianteNombre: '5SY4 3x2A 35kA', precio: 60.94, unidad: 'USD' },
      { codigoInterno: '1014962', modelo: '5SY4304-7', varianteNombre: '5SY4 3x4A 35kA', precio: 60.94, unidad: 'USD' },
      { codigoInterno: '1015973', modelo: '5SY4306-7', varianteNombre: '5SY4 3x6A 35kA', precio: 60.94, unidad: 'USD' },
      { codigoInterno: '1013720', modelo: '5SY4310-7', varianteNombre: '5SY4 3x10A 20kA', precio: 52.52, unidad: 'USD' },
      { codigoInterno: '1012962', modelo: '5SY4316-7', varianteNombre: '5SY4 3x16A 20kA', precio: 52.52, unidad: 'USD' },
      { codigoInterno: '1012961', modelo: '5SY4320-7', varianteNombre: '5SY4 3x20A 20kA', precio: 52.52, unidad: 'USD' },
      { codigoInterno: '1013721', modelo: '5SY4325-7', varianteNombre: '5SY4 3x25A 20kA', precio: 52.52, unidad: 'USD' },
      { codigoInterno: '1013722', modelo: '5SY4332-7', varianteNombre: '5SY4 3x32A 20kA', precio: 60.94, unidad: 'USD' },
      { codigoInterno: '1013723', modelo: '5SY4340-7', varianteNombre: '5SY4 3x40A 15kA', precio: 78.83, unidad: 'USD' },
      { codigoInterno: '1014311', modelo: '5SY4350-7', varianteNombre: '5SY4 3x50A 15kA', precio: 81.22, unidad: 'USD' },
      { codigoInterno: '1014310', modelo: '5SY4363-7', varianteNombre: '5SY4 3x63A 15kA', precio: 80.08, unidad: 'USD' },
      { codigoInterno: '1017282', modelo: '5SP4280-7', varianteNombre: '5SP4 2x80A 10kA', precio: 93.18, unidad: 'USD' },
      { codigoInterno: '1017050', modelo: '5SP4291-7', varianteNombre: '5SP4 2x100A 10kA', precio: 104.00, unidad: 'USD' },
      { codigoInterno: '1015977', modelo: '5SP4292-7', varianteNombre: '5SP4 2x125A 10kA', precio: 104.00, unidad: 'USD' },
      { codigoInterno: '1015978', modelo: '5SP4380-7', varianteNombre: '5SP4 3x80A 10kA', precio: 119.60, unidad: 'USD' },
      { codigoInterno: '1016235', modelo: '5SP4391-7', varianteNombre: '5SP4 3x100A 10kA', precio: 141.40, unidad: 'USD' },
      { codigoInterno: '1017051', modelo: '5SP4392-7', varianteNombre: '5SP4 3x125A 10kA', precio: 141.40, unidad: 'USD' },
      { codigoInterno: '1014528', modelo: '5SV5312-0', varianteNombre: 'DIFERENCIAL 2X25A 30mA AC', precio: 41.64, unidad: 'USD' },
      { codigoInterno: '1017481', modelo: '5SV5312-0MB', varianteNombre: 'DIFERENCIAL 2X25A 30mA AC MB', precio: 41.64, unidad: 'USD' },
      { codigoInterno: '1014529', modelo: '5SV5314-0', varianteNombre: 'DIFERENCIAL 2X40A 30mA AC', precio: 49.74, unidad: 'USD' },
      { codigoInterno: '1021172', modelo: '5SV5314-0MB', varianteNombre: 'DIFERENCIAL 2X40A 30mA AC MB', precio: 49.74, unidad: 'USD' },
      { codigoInterno: '1016236', modelo: '5SV5316-0', varianteNombre: 'DIFERENCIAL 2X63A 30mA AC', precio: 106.50, unidad: 'USD' },
      { codigoInterno: '1021175', modelo: '5SV5316-0MB', varianteNombre: 'DIFERENCIAL 2X63A 30mA AC MB', precio: 106.50, unidad: 'USD' },
      { codigoInterno: '1014530', modelo: '5SV5342-0', varianteNombre: 'DIFERENCIAL 4X25A 30mA AC', precio: 84.35, unidad: 'USD' },
      { codigoInterno: '1021173', modelo: '5SV5342-0MB', varianteNombre: 'DIFERENCIAL 4X25A 30mA AC MB', precio: 84.35, unidad: 'USD' },
      { codigoInterno: '1014531', modelo: '5SV5344-0', varianteNombre: 'DIFERENCIAL 4X40A 30mA AC', precio: 92.44, unidad: 'USD' },
      { codigoInterno: '1021908', modelo: '5SV5344-0MB', varianteNombre: 'DIFERENCIAL 4X40A 30mA AC MB', precio: 92.44, unidad: 'USD' },
      { codigoInterno: '1014553', modelo: '5SV5346-0', varianteNombre: 'DIFERENCIAL 4X63A 30mA AC', precio: 137.40, unidad: 'USD' },
      { codigoInterno: '1021174', modelo: '5SV5346-0MB', varianteNombre: 'DIFERENCIAL 4X63A 30mA AC MB', precio: 137.40, unidad: 'USD' },
      { codigoInterno: '1013143', modelo: '5SV3312-6', varianteNombre: 'DIFERENCIAL 2X25A 30mA TIPO A (SUPER INMUNIZADO)', precio: 100.30, unidad: 'USD' },
      { codigoInterno: '1013795', modelo: '5SV3314-6', varianteNombre: 'DIFERENCIAL 2X40A 30mA TIPO A (SUPER INMUNIZADO)', precio: 106.10, unidad: 'USD' },
      { codigoInterno: '1015729', modelo: '5SV3316-6', varianteNombre: 'DIFERENCIAL 2X63A 30mA TIPO A (SUPER INMUNIZADO)', precio: 160.20, unidad: 'USD' },
      { codigoInterno: '1013734', modelo: '5SV3342-6', varianteNombre: 'DIFERENCIAL 4X25A 30mA TIPO A (SUPER INMUNIZADO)', precio: 144.60, unidad: 'USD' },
      { codigoInterno: '1013735', modelo: '5SV3344-6', varianteNombre: 'DIFERENCIAL 4X40A 30mA TIPO A (SUPER INMUNIZADO)', precio: 160.20, unidad: 'USD' },
      { codigoInterno: '1014527', modelo: '5SV3346-6', varianteNombre: 'DIFERENCIAL 4X63A 30mA TIPO A (SUPER INMUNIZADO)', precio: 261.00, unidad: 'USD' },
      { codigoInterno: '1015106', modelo: '5SV4642-0', varianteNombre: 'DIFERENCIAL 4X25A 300mA AC', precio: 80.73, unidad: 'USD' },
      { codigoInterno: '1015728', modelo: '5SV4644-0', varianteNombre: 'DIFERENCIAL 4X40A 300mA AC', precio: 80.73, unidad: 'USD' },
      { codigoInterno: '1014850', modelo: '5SV4646-0', varianteNombre: 'DIFERENCIAL 4X63A 300mA AC', precio: 123.50, unidad: 'USD' },
      { codigoInterno: '1013760', modelo: '5ST3010', varianteNombre: 'CONTACTO DE POSICIÓN 1NA+1NC PARA 5SL/5SY/5SP', precio: 30.26, unidad: 'USD' },
    ],
  },
];

async function main() {
  console.log('🚀 Cargando tercer lote de catálogo Siemens...');

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

    console.log(`\n👑 [PADRE] ${padre.nombre} (${grupo.marca}) - Precio base: ${grupo.unidad} ${precioBase}`);

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

  console.log('\n✅ Importación del tercer lote Siemens completada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en script de importación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
