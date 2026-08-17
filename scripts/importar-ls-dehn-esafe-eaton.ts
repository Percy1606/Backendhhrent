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
  // 1. LS - INTERRUPTORES DE CAJA MOLDEADA SUSOL Y ACCESORIOS
  {
    codigoPadre: 'LS-SUSOL-CAJA-MOLDEADA',
    nombre: 'Interruptor de Caja Moldeada LS Susol TD/TS (16A a 1600A) y Accesorios',
    marca: 'LS Protección y Control',
    categoria: 'INTERRUPTORES DE CAJA MOLDEADA SUSOL',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores de caja moldeada regulables serie Susol (TD100, TD160, TS250, TS400, TS630, TS800, TS1000, TS1250, TS1600) con disparadores FMU/ETS/NGO y accesorios (contactos AX/AL/FAL, bobinas SHT/UVT, mandos motorizados MOP, mandos rotativos EH, enclavamientos MIT, módulos diferenciales RTU, bloqueo por candado PL).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4101281', modelo: 'TD100N FMU 16', varianteNombre: 'TD100N FMU 3P 16A 50KA', precio: 804.21, unidad: 'PEN' },
      { codigoInterno: '4101282', modelo: 'TD100N FMU 25', varianteNombre: 'TD100N FMU 3P 25A 50KA', precio: 804.21, unidad: 'PEN' },
      { codigoInterno: '4101283', modelo: 'TD100N FMU 32', varianteNombre: 'TD100N FMU 3P 32A 50KA', precio: 567.55, unidad: 'PEN' },
      { codigoInterno: '4101284', modelo: 'TD100N FMU 40', varianteNombre: 'TD100N FMU 3P 40A 50KA', precio: 567.55, unidad: 'PEN' },
      { codigoInterno: '4101285', modelo: 'TD100N FMU 50', varianteNombre: 'TD100N FMU 3P 50A 50KA', precio: 622.02, unidad: 'PEN' },
      { codigoInterno: '4101286', modelo: 'TD100N FMU 63', varianteNombre: 'TD100N FMU 3P 63A 50KA', precio: 622.02, unidad: 'PEN' },
      { codigoInterno: '4101287', modelo: 'TD100N FMU 80', varianteNombre: 'TD100N FMU 3P 80A 50KA', precio: 628.72, unidad: 'PEN' },
      { codigoInterno: '4101288', modelo: 'TD100N FMU 100', varianteNombre: 'TD100N FMU 3P 100A 50KA', precio: 628.72, unidad: 'PEN' },
      { codigoInterno: '4101289', modelo: 'TD160N FMU 125', varianteNombre: 'TD160N FMU 3P 125A 50KA', precio: 673.89, unidad: 'PEN' },
      { codigoInterno: '4101290', modelo: 'TD160N FMU 160', varianteNombre: 'TD160N FMU 3P 160A 50KA', precio: 668.48, unidad: 'PEN' },
      { codigoInterno: '4101291', modelo: 'TS250N FMU 200', varianteNombre: 'TS250N FMU 3P 200A 50KA', precio: 936.86, unidad: 'PEN' },
      { codigoInterno: '4101292', modelo: 'TS250N FMU 250', varianteNombre: 'TS250N FMU 3P 250A 50KA', precio: 936.86, unidad: 'PEN' },
      { codigoInterno: '4101293', modelo: 'TS400N FMU 400', varianteNombre: 'TS400N FMU 3P 400A 50KA', precio: 2691.95, unidad: 'PEN' },
      { codigoInterno: '4101295', modelo: 'TS630N FMU 630', varianteNombre: 'TS630N FMU 3P 630A', precio: 3494.24, unidad: 'PEN' },
      { codigoInterno: '4101297', modelo: 'TS800N FMU 800', varianteNombre: 'TS800N FMU 3P 800A', precio: 7273.61, unidad: 'PEN' },
      { codigoInterno: '4014002', modelo: 'TS250N ETS 250', varianteNombre: 'TS250N 3P 100-250A 100KA', precio: 2672.92, unidad: 'PEN' },
      { codigoInterno: '4101294', modelo: 'TS400N ETS 400', varianteNombre: 'TS400N ETS 3P 400A 50KA', precio: 2936.34, unidad: 'PEN' },
      { codigoInterno: '4101296', modelo: 'TS630N ETS 630', varianteNombre: 'TS630N ETS 3P 630A 50KA', precio: 4120.17, unidad: 'PEN' },
      { codigoInterno: '4101298', modelo: 'TS800N ETS 800', varianteNombre: 'TS800N ETS 3P 800A 50KA', precio: 7051.80, unidad: 'PEN' },
      { codigoInterno: '4001880', modelo: 'TS1000N NGO 1000', varianteNombre: 'TS 3P 1000A NG0 50KA', precio: 8052.08, unidad: 'PEN' },
      { codigoInterno: '4001883', modelo: 'TS1250N NGO 1250', varianteNombre: 'TS 3P 1250A NG0 50KA', precio: 9997.72, unidad: 'PEN' },
      { codigoInterno: '4001884', modelo: 'TS1600N NGO 1600', varianteNombre: 'TS 3P 1600A NG0 50KA', precio: 12382.89, unidad: 'PEN' },
      { codigoInterno: '4101441', modelo: 'AX', varianteNombre: 'CONTACTO AUX CONMUTADO 1NA 1NC', precio: 128.39, unidad: 'PEN' },
      { codigoInterno: '4101442', modelo: 'AL', varianteNombre: 'CONTACTO DE ALARMA CONMUTADO 1NA 1NC', precio: 128.39, unidad: 'PEN' },
      { codigoInterno: '4101443', modelo: 'FAL', varianteNombre: 'CONT ALARM FALLA 1NA 1NC ELECTRONICO', precio: 128.39, unidad: 'PEN' },
      { codigoInterno: '4101444', modelo: 'SHT', varianteNombre: 'BOBINA DE DISPARO 200/240 VCA 250VDC', precio: 303.02, unidad: 'PEN' },
      { codigoInterno: '4101445', modelo: 'UVT', varianteNombre: 'BOB DE MINIMA TEN 200/240 VCA 250VDC', precio: 396.09, unidad: 'PEN' },
      { codigoInterno: '4101458', modelo: 'MOP1', varianteNombre: 'MANDO MOT 100-240VAC P/TD100/TD160', precio: 1623.75, unidad: 'PEN' },
      { codigoInterno: '4101459', modelo: 'MOP2', varianteNombre: 'MANDO MOT 230VAC / 220VDC P/ TS250', precio: 1980.53, unidad: 'PEN' },
      { codigoInterno: '4101460', modelo: 'MOP3', varianteNombre: 'MANDO MOT 230VAC P/ TS400/TS630', precio: 2587.22, unidad: 'PEN' },
      { codigoInterno: '4101461', modelo: 'MOP4', varianteNombre: 'MANDO MOT 230VAC P/ TS800', precio: 7115.21, unidad: 'PEN' },
      { codigoInterno: '4101450', modelo: 'MIT13', varianteNombre: 'ENCLAV MEC FRONTAL P/TD100/TD160', precio: 679.69, unidad: 'PEN' },
      { codigoInterno: '4101451', modelo: 'MIT23', varianteNombre: 'ENCLAV MEC FRONTAL P/TS250', precio: 717.26, unidad: 'PEN' },
      { codigoInterno: '4101452', modelo: 'MIT33', varianteNombre: 'ENCLAV MEC FRONTAL P/TS400/TS630', precio: 710.14, unidad: 'PEN' },
      { codigoInterno: '4101453', modelo: 'MIT43', varianteNombre: 'ENCLAV MEC FRONTAL P/TS800', precio: 931.81, unidad: 'PEN' },
      { codigoInterno: '4101454', modelo: 'PL1', varianteNombre: 'BLOQUEO POR CANDADO P/ TD100/TD161', precio: 150.24, unidad: 'PEN' },
      { codigoInterno: '4101455', modelo: 'PL2', varianteNombre: 'BLOQUEO POR CANDADO P/ TS250', precio: 196.67, unidad: 'PEN' },
      { codigoInterno: '4101456', modelo: 'PL3', varianteNombre: 'BLOQUEO POR CANDADO P/ TS400/TS630', precio: 196.37, unidad: 'PEN' },
      { codigoInterno: '4101457', modelo: 'PL4', varianteNombre: 'BLOQUEO POR CANDADO P/ TS800', precio: 554.06, unidad: 'PEN' },
      { codigoInterno: '4011794', modelo: 'RTU23', varianteNombre: 'MODULO DIFERENCIAL P/ TS100/160/250', precio: 1516.79, unidad: 'PEN' },
      { codigoInterno: '4011795', modelo: 'RTU33', varianteNombre: 'MODULO DIFERENCIAL P/ TS400/630', precio: 1955.19, unidad: 'PEN' },
      { codigoInterno: '4101446', modelo: 'EH1-L', varianteNombre: 'MANDO ROT PROLONGADO P/ TD100/TD160', precio: 303.46, unidad: 'PEN' },
      { codigoInterno: '4101447', modelo: 'EH2-L', varianteNombre: 'MANDO ROT PROLONGADO P/ TS250', precio: 335.60, unidad: 'PEN' },
      { codigoInterno: '4101448', modelo: 'EH3-L', varianteNombre: 'MANDO ROT PROLONGADO P/ TS400/TS630', precio: 499.63, unidad: 'PEN' },
      { codigoInterno: '4101449', modelo: 'EH4-L', varianteNombre: 'MANDO ROT PROLONGADO P/TS800', precio: 927.57, unidad: 'PEN' },
      { codigoInterno: '4101462', modelo: 'SBT13', varianteNombre: 'TERMINALES PARA SERIE TD100', precio: 115.96, unidad: 'PEN' },
      { codigoInterno: '4101463', modelo: 'SBT23', varianteNombre: 'TERMINALES PARA SERIE TS250', precio: 164.04, unidad: 'PEN' },
      { codigoInterno: '4101464', modelo: 'IBT33', varianteNombre: 'TERMINALES P/ TS400 Y TS630', precio: 199.98, unidad: 'PEN' },
      { codigoInterno: '4000148', modelo: 'B23C', varianteNombre: 'Aislador para TD 100/160 TS 100/160/250', precio: 7.81, unidad: 'PEN' },
      { codigoInterno: '4000149', modelo: 'B33C', varianteNombre: 'Aislador para TS 400/630', precio: 10.95, unidad: 'PEN' },
      { codigoInterno: '4000150', modelo: 'B43C', varianteNombre: 'Aislador para TS 800', precio: 12.50, unidad: 'PEN' },
      { codigoInterno: '4011797', modelo: 'FH2', varianteNombre: 'Manija de seguridad flexible p/ TS2', precio: 622.24, unidad: 'PEN' },
      { codigoInterno: '4013111', modelo: 'FH2-36IN (76611172801)', varianteNombre: 'Cable ASS Y FH2-36in TS250U', precio: 462.34, unidad: 'PEN' },
      { codigoInterno: '4016286', modelo: 'SHT 110-130VAC (83211171734)', varianteNombre: 'BOB DISPARO SHT 110-130VAC TD100N', precio: 292.90, unidad: 'PEN' },
      { codigoInterno: '4017354', modelo: 'SHT TS', varianteNombre: 'Bobina de disparo 220VAC / TS', precio: 278.76, unidad: 'PEN' },
    ],
  },

  // 2. LS - INTERRUPTORES DE BASTIDOR ABIERTO ACB SERIE AS
  {
    codigoPadre: 'LS-ACB-SERIE-AS',
    nombre: 'Interruptores de Bastidor Abierto ACB LS Serie AS y Accesorios',
    marca: 'LS Protección y Control',
    categoria: 'INTERRUPTORES DE BASTIDOR ABIERTO',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores de aire / bastidor abierto montaje fijo serie AS (2000A, 2500A, 3200A 85kA @ 500V) y accesorios (bobinas de disparo SHT, mínima tensión UVT, cierre CC, motor operador M y enclavamiento mecánico MI).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4020593', modelo: 'AS-20E3-20HM', varianteNombre: 'MONTAJE FIJO 2000A 85kA@500V', precio: 15843.26, unidad: 'PEN' },
      { codigoInterno: '4020594', modelo: 'AS-25E3-25HM', varianteNombre: 'MONTAJE FIJO 2500A 85kA@500V', precio: 20756.68, unidad: 'PEN' },
      { codigoInterno: '4002442', modelo: 'AS-32E3-32H', varianteNombre: 'MONTAJE FIJO 3200A 85kA@500V', precio: 23764.66, unidad: 'PEN' },
      { codigoInterno: '4105438', modelo: 'SHT1', varianteNombre: 'BOBINA DISP 200-250 VAC INT AIRE', precio: 1036.54, unidad: 'PEN' },
      { codigoInterno: '4005704', modelo: 'UVT1', varianteNombre: 'BOBINA MÍNIMO VOLTAJE 220V INT AIRE', precio: 1072.25, unidad: 'PEN' },
      { codigoInterno: '4105439', modelo: 'CC', varianteNombre: 'BOBINA CIERRE 200-250 VAC INT AIRE', precio: 1037.11, unidad: 'PEN' },
      { codigoInterno: '4105440', modelo: 'M', varianteNombre: 'MOTOR OPERADOR 200-250VAC INT AIRE', precio: 4737.03, unidad: 'PEN' },
      { codigoInterno: '4105442', modelo: 'MI', varianteNombre: 'ENCLAVAMIENTO MECÁNICO INT AIRE', precio: 6922.94, unidad: 'PEN' },
    ],
  },

  // 3. LS - GUARDAMOTORES MMS Y CONTACTORES MC / MINICONTACTORES GMR
  {
    codigoPadre: 'LS-GUARDAMOTORES-CONTACTORES-MC',
    nombre: 'Guardamotores MMS y Contactores / Minicontactores MC / GMR LS',
    marca: 'LS Protección y Control',
    categoria: 'GUARDAMOTORES',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Guardamotores magnetotérmicos serie MMS-32S, MMS-32H, MMS-63H (0.16A a 63A), contactores tripolares serie MC (MC9B a MC800A en bobinas 24V, 110V, 220V, 380V, 440V), minicontactores GMR-4M y accesorios de automatización (contactos aux, varistores, enclavamientos, adaptadores de condensadores y gabinetes MW).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4101321', modelo: 'MMS-32S-0.25', varianteNombre: 'GUARDAMOTOR 0.16 A 0.25 A', precio: 253.49, unidad: 'PEN' },
      { codigoInterno: '4101322', modelo: 'MMS-32S-0.4', varianteNombre: 'GUARDAMOTOR 0.25 A 0.4 A', precio: 253.49, unidad: 'PEN' },
      { codigoInterno: '4101323', modelo: 'MMS-32S-0.63', varianteNombre: 'GUARDAMOTOR 0.4 A 0.63 A', precio: 159.72, unidad: 'PEN' },
      { codigoInterno: '4101324', modelo: 'MMS-32S-1', varianteNombre: 'GUARDAMOTOR DE 0.63 A 1 A', precio: 185.78, unidad: 'PEN' },
      { codigoInterno: '4101325', modelo: 'MMS-32S-1.6', varianteNombre: 'GUARDAMOTOR 1.0 A 1.6 A', precio: 194.46, unidad: 'PEN' },
      { codigoInterno: '4101326', modelo: 'MMS-32S-2.5', varianteNombre: 'GUARDAMOTOR 1.6 A 2.5 A', precio: 194.46, unidad: 'PEN' },
      { codigoInterno: '4101327', modelo: 'MMS-32S-4', varianteNombre: 'GUARDAMOTOR DE 2.5 A 4 A', precio: 161.46, unidad: 'PEN' },
      { codigoInterno: '4101328', modelo: 'MMS-32S-6', varianteNombre: 'GUARDAMOTOR DE 4 A 6 A', precio: 163.20, unidad: 'PEN' },
      { codigoInterno: '4101329', modelo: 'MMS-32S-10', varianteNombre: 'GUARDAMOTOR DE 6 A 10 A', precio: 178.82, unidad: 'PEN' },
      { codigoInterno: '4101330', modelo: 'MMS-32S-13', varianteNombre: 'GUARDAMOTOR DE 9 A 13 A', precio: 159.06, unidad: 'PEN' },
      { codigoInterno: '4101331', modelo: 'MMS-32S-17', varianteNombre: 'GUARDAMOTOR DE 11 A 17 A', precio: 159.06, unidad: 'PEN' },
      { codigoInterno: '4101332', modelo: 'MMS-32S-22', varianteNombre: 'GUARDAMOTOR DE 14 A 22 A', precio: 180.37, unidad: 'PEN' },
      { codigoInterno: '4101333', modelo: 'MMS-32S-26', varianteNombre: 'GUARDAMOTOR DE 18 A 26 A', precio: 300.85, unidad: 'PEN' },
      { codigoInterno: '4101334', modelo: 'MMS-32S-32', varianteNombre: 'GUARDAMOTOR DE 22 A 32 A', precio: 376.34, unidad: 'PEN' },
      { codigoInterno: '4000082', modelo: 'MMS32H-10', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 6 A 10 A', precio: 355.54, unidad: 'PEN' },
      { codigoInterno: '4000090', modelo: 'MMS32H-13', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 9 A 13 A', precio: 529.82, unidad: 'PEN' },
      { codigoInterno: '4000091', modelo: 'MMS32H-17', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 11 A 17 A', precio: 529.82, unidad: 'PEN' },
      { codigoInterno: '4000092', modelo: 'MMS32H-22', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 14 A 22 A', precio: 414.94, unidad: 'PEN' },
      { codigoInterno: '4000096', modelo: 'MMS32H-26', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 18 A 26 A', precio: 414.94, unidad: 'PEN' },
      { codigoInterno: '4000097', modelo: 'MMS32H-32', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 22 A 32 A', precio: 485.99, unidad: 'PEN' },
      { codigoInterno: '4000098', modelo: 'MMS63H-40', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 28 A 40 A', precio: 536.02, unidad: 'PEN' },
      { codigoInterno: '4000099', modelo: 'MMS63H-50', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 34 A 50 A', precio: 568.79, unidad: 'PEN' },
      { codigoInterno: '4000100', modelo: 'MMS63H-63', varianteNombre: 'GUARDAMOTOR ALTA CAPACIDAD 45 A 63 A', precio: 600.07, unidad: 'PEN' },
      { codigoInterno: '4101335', modelo: 'FX', varianteNombre: 'CONTACTO AUXILIAR FRONTAL 1NA + 1NC', precio: 58.73, unidad: 'PEN' },
      { codigoInterno: '4101336', modelo: 'LX', varianteNombre: 'CONTACTO AUXILIAR LATERAL 1NA+1NC', precio: 85.47, unidad: 'PEN' },
      { codigoInterno: '4101338', modelo: 'LAM', varianteNombre: 'CONTACTO DE FALLA 1NA + 1NC', precio: 106.72, unidad: 'PEN' },
      { codigoInterno: '4101337', modelo: 'LA', varianteNombre: 'CONTACTO DE FALLA SOBRECARGA 1NA + 1NC', precio: 95.95, unidad: 'PEN' },
      { codigoInterno: '4017994', modelo: 'PB-322', varianteNombre: 'Barra de conex p/2 guard MMS32', precio: 82.46, unidad: 'PEN' },
      { codigoInterno: '4017995', modelo: 'PB-323', varianteNombre: 'Barra de conex p/3 guard MMS32', precio: 209.56, unidad: 'PEN' },
      { codigoInterno: '4017996', modelo: 'PB-324', varianteNombre: 'Barra de conex p/4 guard MMS32', precio: 223.06, unidad: 'PEN' },
      { codigoInterno: '4017997', modelo: 'PB-325', varianteNombre: 'Barra de conex p/5 guard MMS32', precio: 236.59, unidad: 'PEN' },
      { codigoInterno: '4017992', modelo: 'DA-22HA', varianteNombre: 'Bloque de union p/MMS32-H y MC 9-22', precio: 70.30, unidad: 'PEN' },
      { codigoInterno: '4017993', modelo: 'DA-32HA', varianteNombre: 'Bloque de union p/MMS32-H y MC 32-40', precio: 89.23, unidad: 'PEN' },
      { codigoInterno: '4004874', modelo: 'MC9B-24V', varianteNombre: 'CONTACTOR MC9B AC3 BOB 24V', precio: 68.29, unidad: 'PEN' },
      { codigoInterno: '4004871', modelo: 'MC9B-110V', varianteNombre: 'CONTACTOR MC9B AC3 BOB 110V', precio: 68.29, unidad: 'PEN' },
      { codigoInterno: '4004870', modelo: 'MC9B-220V', varianteNombre: 'CONTACTOR MC9B AC3 BOB 220V', precio: 68.29, unidad: 'PEN' },
      { codigoInterno: '4004872', modelo: 'MC9B-380V', varianteNombre: 'CONTACTOR MC9B AC3 BOB 380V', precio: 68.29, unidad: 'PEN' },
      { codigoInterno: '4004873', modelo: 'MC9B-440V', varianteNombre: 'CONTACTOR MC9B AC3 BOB 440V', precio: 68.29, unidad: 'PEN' },
      { codigoInterno: '4004879', modelo: 'MC12B-24V', varianteNombre: 'CONTACTOR MC12B AC3 BOB 24V', precio: 73.66, unidad: 'PEN' },
      { codigoInterno: '4004876', modelo: 'MC12B-110V', varianteNombre: 'CONTACTOR MC12B AC3 BOB 110V', precio: 73.66, unidad: 'PEN' },
      { codigoInterno: '4004875', modelo: 'MC12B-220V', varianteNombre: 'CONTACTOR MC12B AC3 BOB 220V', precio: 73.66, unidad: 'PEN' },
      { codigoInterno: '4004877', modelo: 'MC12B-380V', varianteNombre: 'CONTACTOR MC12B AC3 BOB 380V', precio: 73.66, unidad: 'PEN' },
      { codigoInterno: '4004878', modelo: 'MC12B-440V', varianteNombre: 'CONTACTOR MC12B AC3 BOB 440V', precio: 73.66, unidad: 'PEN' },
      { codigoInterno: '4004884', modelo: 'MC18B-24V', varianteNombre: 'CONTACTOR MC18B AC3 BOB 24V', precio: 93.98, unidad: 'PEN' },
      { codigoInterno: '4004881', modelo: 'MC18B-110V', varianteNombre: 'CONTACTOR MC18B AC3 BOB 110V', precio: 93.98, unidad: 'PEN' },
      { codigoInterno: '4004880', modelo: 'MC18B-220V', varianteNombre: 'CONTACTOR MC18B AC3 BOB 220V', precio: 93.98, unidad: 'PEN' },
      { codigoInterno: '4004882', modelo: 'MC18B-380V', varianteNombre: 'CONTACTOR MC18B AC3 BOB 380V', precio: 93.98, unidad: 'PEN' },
      { codigoInterno: '4004883', modelo: 'MC18B-440V', varianteNombre: 'CONTACTOR MC18B AC3 BOB 440V', precio: 93.98, unidad: 'PEN' },
      { codigoInterno: '4003658', modelo: 'MC-22B-24', varianteNombre: 'CONTACTOR MC22B AC3 1NA1NC 24V', precio: 133.16, unidad: 'PEN' },
      { codigoInterno: '4003659', modelo: 'MC-22B-110', varianteNombre: 'CONTACTOR MC22B AC3 1NA1NC 110V', precio: 133.16, unidad: 'PEN' },
      { codigoInterno: '4002353', modelo: 'MC-22B-220', varianteNombre: 'CONTACTOR MC 3P 22A 220VAC', precio: 133.16, unidad: 'PEN' },
      { codigoInterno: '4003660', modelo: 'MC-22B-380', varianteNombre: 'CONTACTOR MC22B AC3 1NA1NC 380V', precio: 133.16, unidad: 'PEN' },
      { codigoInterno: '4003661', modelo: 'MC-22B-440', varianteNombre: 'CONTACTOR MC22A AC3 1NA1NC 440V', precio: 133.16, unidad: 'PEN' },
      { codigoInterno: '4003662', modelo: 'MC-32A-24', varianteNombre: 'CONTACTOR 32A AC3 2NA2NC 24V', precio: 193.17, unidad: 'PEN' },
      { codigoInterno: '4003663', modelo: 'MC-32A-110', varianteNombre: 'CONTACTOR 32A AC3 2NA2NC 110V', precio: 193.17, unidad: 'PEN' },
      { codigoInterno: '4002354', modelo: 'MC32A-220', varianteNombre: 'CONTACTOR MC 3P 32A 220VAC', precio: 193.17, unidad: 'PEN' },
      { codigoInterno: '4003664', modelo: 'MC-32A-380', varianteNombre: 'CONTACTOR 32A AC3 2NA2NC 380V', precio: 193.17, unidad: 'PEN' },
      { codigoInterno: '4003665', modelo: 'MC-32A-440', varianteNombre: 'CONTACTOR 32A AC3 2NA2NC 440V', precio: 193.17, unidad: 'PEN' },
      { codigoInterno: '4003666', modelo: 'MC-40A-24', varianteNombre: 'CONTACTOR 40A AC3 2NA2NC 24V', precio: 226.98, unidad: 'PEN' },
      { codigoInterno: '4003580', modelo: 'MC-40A-110', varianteNombre: 'CONTACTOR 40A AC3 2NA2NC 110V', precio: 226.98, unidad: 'PEN' },
      { codigoInterno: '4002355', modelo: 'MC40A-220', varianteNombre: 'CONTACTOR MC 3P 40A 220VAC', precio: 226.98, unidad: 'PEN' },
      { codigoInterno: '4003667', modelo: 'MC-40A-380', varianteNombre: 'CONTACTOR 40A AC3 2NA2NC 380V', precio: 226.98, unidad: 'PEN' },
      { codigoInterno: '4003668', modelo: 'MC-40A-440', varianteNombre: 'CONTACTOR 40A AC3 2NA2NC 440V', precio: 226.98, unidad: 'PEN' },
      { codigoInterno: '4003669', modelo: 'MC 50A-24V', varianteNombre: 'CONTACTOR 50A AC3 2NA2NC 24V', precio: 475.67, unidad: 'PEN' },
      { codigoInterno: '4003582', modelo: 'MC 50A-110V', varianteNombre: 'CONTACTOR 50A AC3 2NA2NC 110V', precio: 475.67, unidad: 'PEN' },
      { codigoInterno: '4005583', modelo: 'MC 50A-220V LUG', varianteNombre: 'CONTACTOR MC 3P 50A 220VAC LUG', precio: 475.67, unidad: 'PEN' },
      { codigoInterno: '4003603', modelo: 'MC 50A-380V', varianteNombre: 'CONTACTOR 50A AC3 2NA2NC 380V', precio: 475.67, unidad: 'PEN' },
      { codigoInterno: '4003604', modelo: 'MC 50A-440V', varianteNombre: 'CONTACTOR 50A AC3 2NA2NC 440V', precio: 475.67, unidad: 'PEN' },
      { codigoInterno: '4003670', modelo: 'MC 65A-24V', varianteNombre: 'CONTACTOR 65A AC3 2NA2NC 24V', precio: 552.11, unidad: 'PEN' },
      { codigoInterno: '4003671', modelo: 'MC 65A-110V', varianteNombre: 'CONTACTOR 65A AC3 2NA2NC 110V', precio: 552.11, unidad: 'PEN' },
      { codigoInterno: '4005584', modelo: 'MC 65A-220V LUG', varianteNombre: 'CONTACTOR MC 3P 65A 220VAC LUG', precio: 552.11, unidad: 'PEN' },
      { codigoInterno: '4003672', modelo: 'MC 65A-380V', varianteNombre: 'CONTACTOR 65A AC3 2NA2NC 380V', precio: 552.11, unidad: 'PEN' },
      { codigoInterno: '4003673', modelo: 'MC 65A-440V', varianteNombre: 'CONTACTOR 65A AC3 2NA2NC 440V', precio: 552.11, unidad: 'PEN' },
      { codigoInterno: '4005705', modelo: 'MC 75A-110V', varianteNombre: 'CONTACTOR 75A AC3 110V', precio: 673.77, unidad: 'PEN' },
      { codigoInterno: '4005585', modelo: 'MC 75A-220V LUG', varianteNombre: 'CONTACTOR MC 3P 75A 220VAC LUG', precio: 673.77, unidad: 'PEN' },
      { codigoInterno: '4005706', modelo: 'MC 75A-380V', varianteNombre: 'CONTACTOR 75A AC3 380V', precio: 673.77, unidad: 'PEN' },
      { codigoInterno: '4005707', modelo: 'MC 75A-440V', varianteNombre: 'CONTACTOR 75A AC3 440V', precio: 673.77, unidad: 'PEN' },
      { codigoInterno: '4003674', modelo: 'MC 85A-24V', varianteNombre: 'CONTACTOR 85A AC3 2NA2NC 24V', precio: 866.73, unidad: 'PEN' },
      { codigoInterno: '4003675', modelo: 'MC 85A-110V', varianteNombre: 'CONTACTOR 85A AC3 2NA2NC 110V', precio: 866.73, unidad: 'PEN' },
      { codigoInterno: '4005586', modelo: 'MC 85A-220V LUG', varianteNombre: 'CONTACTOR MC 3P 85A 220VAC LUG', precio: 866.73, unidad: 'PEN' },
      { codigoInterno: '4003676', modelo: 'MC 85A-380V', varianteNombre: 'CONTACTOR 85A AC3 2NA2NC 380V', precio: 866.73, unidad: 'PEN' },
      { codigoInterno: '4003677', modelo: 'MC 85A-440V', varianteNombre: 'CONTACTOR 85A AC3 2NA2NC 440V', precio: 866.73, unidad: 'PEN' },
      { codigoInterno: '4005708', modelo: 'MC 100A-110V', varianteNombre: 'CONTACTOR 100A AC3 110V', precio: 1080.99, unidad: 'PEN' },
      { codigoInterno: '4005587', modelo: 'MC 100A-220V LUG', varianteNombre: 'CONTACTOR MC 3P 100A 220VAC LUG', precio: 1080.99, unidad: 'PEN' },
      { codigoInterno: '4005709', modelo: 'MC 100A-380V', varianteNombre: 'CONTACTOR 100A AC3 380V', precio: 1080.99, unidad: 'PEN' },
      { codigoInterno: '4005710', modelo: 'MC 100A-440V', varianteNombre: 'CONTACTOR 100A AC3 440V', precio: 1080.99, unidad: 'PEN' },
      { codigoInterno: '4002590', modelo: 'MC 130A-24V', varianteNombre: 'CONTACTOR 130A AC3 2NA2NC 110V', precio: 1345.89, unidad: 'PEN' },
      { codigoInterno: '4002361', modelo: 'MC 130A-220V', varianteNombre: 'CONTACTOR MC 3P 130A 220VAC', precio: 1345.89, unidad: 'PEN' },
      { codigoInterno: '4005830', modelo: 'MC 130A-380V', varianteNombre: 'CONTACTOR 130A AC3 2NA2NC 380V', precio: 1345.89, unidad: 'PEN' },
      { codigoInterno: '4003679', modelo: 'MC 150A-110V', varianteNombre: 'CONTACTOR 150A AC3 2NA2NC 110V', precio: 1535.50, unidad: 'PEN' },
      { codigoInterno: '4002362', modelo: 'MC 150A-220V', varianteNombre: 'CONTACTOR MC 3P 150A 220VAC', precio: 1535.50, unidad: 'PEN' },
      { codigoInterno: '4005832', modelo: 'MC 150A-380V', varianteNombre: 'CONTACTOR 150A AC3 2NA2NC 380V', precio: 1535.50, unidad: 'PEN' },
      { codigoInterno: '4002363', modelo: 'MC 185A', varianteNombre: 'CONTACTOR MC 3P 185A 220VAC', precio: 1791.98, unidad: 'PEN' },
      { codigoInterno: '4002364', modelo: 'MC 225A', varianteNombre: 'CONTACTOR MC 3P 225A 220VAC', precio: 2405.75, unidad: 'PEN' },
      { codigoInterno: '4002365', modelo: 'MC 330A', varianteNombre: 'CONTACTOR MC 3P 330A 220VAC', precio: 4685.44, unidad: 'PEN' },
      { codigoInterno: '4002366', modelo: 'MC 400A', varianteNombre: 'CONTACTOR MC 3P 400A 220VAC', precio: 5030.37, unidad: 'PEN' },
      { codigoInterno: '4002367', modelo: 'MC 630A', varianteNombre: 'CONTACTOR MC 3P 630A 220VAC', precio: 8585.35, unidad: 'PEN' },
      { codigoInterno: '4002368', modelo: 'MC 800A', varianteNombre: 'CONTACTOR MC 3P 800A 220VAC', precio: 11237.36, unidad: 'PEN' },
      { codigoInterno: '4002401', modelo: 'UA-1', varianteNombre: 'CONTACTO AUX LATERAL 1NA+1NC P/MC9 A MC150', precio: 72.05, unidad: 'PEN' },
      { codigoInterno: '4101397', modelo: 'AU-100', varianteNombre: 'CONTACTO AUX LATERAL 1NA+1NC P/MC180 A MC800', precio: 62.34, unidad: 'PEN' },
      { codigoInterno: '4002399', modelo: 'UR-02', varianteNombre: 'BLOQUE DE ENCLAV MECÁNICO P/MC9 A MC150', precio: 107.53, unidad: 'PEN' },
      { codigoInterno: '4105139', modelo: 'AR-600', varianteNombre: 'BLOQUE DE ENCLAV MECÁNICO P/MC500 A MC800', precio: 2510.99, unidad: 'PEN' },
      { codigoInterno: '4101395', modelo: 'AU-2', varianteNombre: 'CONTACTO AUX FRONT 1NA+1NC P/MC9 A MC150', precio: 50.27, unidad: 'PEN' },
      { codigoInterno: '4101399', modelo: 'AU-4 2NO+2NC', varianteNombre: 'CONTACTO AUX FRONT 2NA+2NC P/MC9 A MC150', precio: 84.09, unidad: 'PEN' },
      { codigoInterno: '4101398', modelo: 'AU-4 3NO+1NC', varianteNombre: 'CONTACTO AUX FRONT 3NA+1NC P/MC9 A MC150', precio: 84.11, unidad: 'PEN' },
      { codigoInterno: '4002981', modelo: 'US-13', varianteNombre: 'VARISTOR PARA MC9 A MC150 200-240VAC', precio: 43.00, unidad: 'PEN' },
      { codigoInterno: '4101360', modelo: 'AC-9', varianteNombre: 'ADAPTADOR P/CONTACTORES DE CONDENSADORES MC9', precio: 168.93, unidad: 'PEN' },
      { codigoInterno: '4101361', modelo: 'AC-50', varianteNombre: 'ADAPTADOR P/CONTACTORES DE CONDENSADORES MC50', precio: 223.45, unidad: 'PEN' },
      { codigoInterno: '4015193', modelo: 'AC-75', varianteNombre: 'ADAPTADOR P/CONTACTORES DE CONDENSADORES MC75', precio: 230.81, unidad: 'PEN' },
      { codigoInterno: '4105434', modelo: 'GMR-4M 4NO', varianteNombre: 'MINICONTACTOR AUXILIAR 16A 4NO 220V', precio: 73.70, unidad: 'PEN' },
      { codigoInterno: '4105433', modelo: 'GMR-4M 3NO1NC', varianteNombre: 'MINICONTACTOR AUXILIAR 16A 3NA+1NC 220V', precio: 71.33, unidad: 'PEN' },
      { codigoInterno: '4105432', modelo: 'GMR-4M 2NO2NC', varianteNombre: 'MINICONTACTOR AUXILIAR 16A 2NA+2NC 220V', precio: 71.27, unidad: 'PEN' },
      { codigoInterno: '4105140', modelo: 'AR-12M', varianteNombre: 'ENCLAV PARA MINICONTACTORES GMR-4M', precio: 25.11, unidad: 'PEN' },
      { codigoInterno: '4008331', modelo: 'MW-9MB', varianteNombre: 'GABINETE ARRANQUE DIRECTO S/EQ MC9B-22B', precio: 195.47, unidad: 'PEN' },
    ],
  },

  // 4. DEHN - SUPRESORES DE SOBRETENSIÓN DPS (FUERZA Y SEÑALES)
  {
    codigoPadre: 'DEHN-SUPRESORES-DPS',
    nombre: 'Supresores de Sobretensión Dehn DPS para Fuerza y Señales',
    marca: 'Dehn',
    categoria: 'SUPRESORES DE FUERZA',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Dispositivos de protección contra sobretensiones transitorias y rayos DEHNguard / DEHNventil tipo 1, tipo 2 y tipo 3 para líneas de fuerza, además de cartuchos y bases supresoras para señales de automatización (Profibus, analógicas/digitales y Ethernet CAT 6).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4017853', modelo: '961135', varianteNombre: 'DPS T1 1P 25kA Uc=320V FM', precio: 573.00, unidad: 'USD' },
      { codigoInterno: '4019890', modelo: '961175', varianteNombre: 'DPS T1 1P 25kA Uc=760V FM', precio: 891.00, unidad: 'USD' },
      { codigoInterno: '4017850', modelo: '952078', varianteNombre: 'DPS T2 1P 25kA Uc=48V', precio: 162.00, unidad: 'USD' },
      { codigoInterno: '4017854', modelo: '952093', varianteNombre: 'DPS T2 1P 40kA Uc=320V FM', precio: 188.00, unidad: 'USD' },
      { codigoInterno: '4020044', modelo: '952096', varianteNombre: 'DPS T2 1P 30kA Uc=600V FM', precio: 188.00, unidad: 'USD' },
      { codigoInterno: '4020659', modelo: '950102', varianteNombre: 'DPS T2 1P 30kA Uc=1000V', precio: 265.00, unidad: 'USD' },
      { codigoInterno: '4019608', modelo: '953204', varianteNombre: 'DPS T3 TN 2kA Uc=150V', precio: 185.00, unidad: 'USD' },
      { codigoInterno: '4018811', modelo: '953209', varianteNombre: 'DPS T3 TN 2kA Uc=150V FM', precio: 213.00, unidad: 'USD' },
      { codigoInterno: '4019441', modelo: '953200', varianteNombre: 'DPS T3 TN 3kA Uc=255V', precio: 185.00, unidad: 'USD' },
      { codigoInterno: '4020882', modelo: '953205', varianteNombre: 'DPS T3 TN 3kA Uc=255V FM', precio: 213.00, unidad: 'USD' },
      { codigoInterno: '4024530', modelo: '951115', varianteNombre: 'DPS T1+2 2P TT 50kA Uc=255V FM', precio: 1490.00, unidad: 'USD' },
      { codigoInterno: '4024531', modelo: '951305', varianteNombre: 'DPS T1+2 3P TNC 75kA Uc=255V FM', precio: 2022.00, unidad: 'USD' },
      { codigoInterno: '4021731', modelo: '951315', varianteNombre: 'DPS T1+2 4P TT 100kA Uc=255V FM', precio: 2817.00, unidad: 'USD' },
      { codigoInterno: '4024317', modelo: '941110', varianteNombre: 'DPS T1+2 2P TT 25kA Uc=255V COMP', precio: 653.00, unidad: 'USD' },
      { codigoInterno: '4021451', modelo: '941200', varianteNombre: 'DPS T1+2 2P TN 25kA Uc=255V COMP', precio: 580.00, unidad: 'USD' },
      { codigoInterno: '4020888', modelo: '941310', varianteNombre: 'DPS T1+2 4P TT 50kA Uc=255V COMP', precio: 1160.00, unidad: 'USD' },
      { codigoInterno: '4022723', modelo: '941400', varianteNombre: 'DPS T1+2 TNS 50kA Uc=255V COMP', precio: 1088.00, unidad: 'USD' },
      { codigoInterno: '4024532', modelo: '941300', varianteNombre: 'DPS T1+2 TNC 37.5kA Uc=255V COMP', precio: 839.00, unidad: 'USD' },
      { codigoInterno: '4017851', modelo: '920300', varianteNombre: 'BASE PARA DPS DE SEÑAL SIN DESCONEXION', precio: 77.00, unidad: 'USD' },
      { codigoInterno: '4018809', modelo: '920271', varianteNombre: 'CART DPS SEÑAL T1+2 2HILOS PROFIBUS DP', precio: 280.00, unidad: 'USD' },
      { codigoInterno: '4018654', modelo: '920222', varianteNombre: 'CART DPS SEÑAL T1+2 2HILOS Un=12V', precio: 268.00, unidad: 'USD' },
      { codigoInterno: '4018898', modelo: '920244', varianteNombre: 'CART DPS SEÑAL T1+2 2HILOS Un=24V Analog', precio: 250.00, unidad: 'USD' },
      { codigoInterno: '4017852', modelo: '920224', varianteNombre: 'CART DPS SEÑAL T1+2 2HILOS Un=24V Digit', precio: 264.00, unidad: 'USD' },
      { codigoInterno: '4022072', modelo: '920320', varianteNombre: 'CART DPS SEÑAL T1+2 4HILOS Un=5V', precio: 405.00, unidad: 'USD' },
      { codigoInterno: '4017848', modelo: '920344', varianteNombre: 'CART DPS SEÑAL T1+2 4HILOS Un=24V Analog', precio: 376.00, unidad: 'USD' },
      { codigoInterno: '4019598', modelo: '920324', varianteNombre: 'CART DPS SEÑAL T1+2 4HILOS Un=24V Digit', precio: 397.00, unidad: 'USD' },
      { codigoInterno: '4017849', modelo: '920327', varianteNombre: 'CART DPS SEÑAL T1+2 4HILOS Un=180V', precio: 405.00, unidad: 'USD' },
      { codigoInterno: '4018897', modelo: '920389', varianteNombre: 'CART DPS SEÑAL T1+2 4HILOS Un=250V', precio: 405.00, unidad: 'USD' },
      { codigoInterno: '4019883', modelo: '929941', varianteNombre: 'DPS DE CAMPO 2HILOS Un=24V M20', precio: 319.00, unidad: 'USD' },
      { codigoInterno: '4019732', modelo: '929970', varianteNombre: 'DPS DE CAMPO 4+1HILOS Un=24V 120/250V NPT', precio: 536.00, unidad: 'USD' },
      { codigoInterno: '4020656', modelo: '929951', varianteNombre: 'DPS DE CAMPO 4+1HILOS Un=24V 24V NPT', precio: 377.00, unidad: 'USD' },
      { codigoInterno: '4017740', modelo: '929121', varianteNombre: 'DPS SEÑAL ETHERNET RJ45 CAT 6 CLASE E', precio: 274.00, unidad: 'USD' },
      { codigoInterno: '4019884', modelo: '924017', varianteNombre: 'DPS SEÑAL SUB-D 9PINES PROFIBUS DP', precio: 367.00, unidad: 'USD' },
    ],
  },

  // 5. E-SAFE - CAJAS, TABLEROS PVC, CINTILLOS Y ESPIRALES
  {
    codigoPadre: 'ESAFE-TABLEROS-PVC-CINTILLOS',
    nombre: 'Tableros PVC, Cajas de Pase, Cintillos y Espirales E-Safe',
    marca: 'E-safe Tableros PVC',
    categoria: 'CAJAS Y TABLEROS PVC',
    familia: 'Accesorios',
    subfamilia: 'Adaptadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Tableros termoplásticos para empotrar/adosar (2W a 36W), cajas de pase IP sin/con conos, tapas de reserva DIN, cintillos de nylon (blanco/negro), portacintillos autoadhesivos y espiral envolvente para cables.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4101743', modelo: 'HG II 2P METAL', varianteNombre: 'CAJA PARA ADOSAR 2 POLOS S/ TAPA', precio: 6.21, unidad: 'PEN' },
      { codigoInterno: '4101744', modelo: 'HG II 4P METAL', varianteNombre: 'CAJA PARA ADOSAR 4 POLOS S/ TAPA', precio: 6.21, unidad: 'PEN' },
      { codigoInterno: '4005021', modelo: 'BSM 2W', varianteNombre: 'CAJA PARA ADOSAR 2 POLOS C/ TAPA', precio: 7.82, unidad: 'PEN' },
      { codigoInterno: '4008574', modelo: 'BSM 4W', varianteNombre: 'CAJA PARA ADOSAR 4 POLOS C/ TAPA', precio: 13.62, unidad: 'PEN' },
      { codigoInterno: '4005020', modelo: 'BSM 8W', varianteNombre: 'CAJA PARA ADOSAR 8 POLOS C/ TAPA', precio: 20.22, unidad: 'PEN' },
      { codigoInterno: '4008575', modelo: 'BSM 12W', varianteNombre: 'CAJA PARA ADOSAR 12 POLOS C/ TAPA', precio: 26.10, unidad: 'PEN' },
      { codigoInterno: '4101745', modelo: 'D6-HPK 2W', varianteNombre: 'TABLERO PARA EMPOTRAR 2 POLOS', precio: 7.82, unidad: 'PEN' },
      { codigoInterno: '4101746', modelo: 'D6-HPK 4W', varianteNombre: 'TABLERO PARA EMPOTRAR 4 POLOS', precio: 13.62, unidad: 'PEN' },
      { codigoInterno: '4101747', modelo: 'D6-HPK 6W', varianteNombre: 'TABLERO PARA EMPOTRAR 6 POLOS', precio: 15.20, unidad: 'PEN' },
      { codigoInterno: '4101748', modelo: 'D6-HPK 8W', varianteNombre: 'TABLERO PARA EMPOTRAR 8 POLOS', precio: 20.22, unidad: 'PEN' },
      { codigoInterno: '4101749', modelo: 'D6-HPK 12W', varianteNombre: 'TABLERO PARA EMPOTRAR 12 POLOS', precio: 26.10, unidad: 'PEN' },
      { codigoInterno: '4101751', modelo: 'D6-HPK 18W', varianteNombre: 'TABLERO PARA EMPOTRAR 18 POLOS', precio: 38.72, unidad: 'PEN' },
      { codigoInterno: '4101752', modelo: 'D6-HPK 24W', varianteNombre: 'TABLERO PARA EMPOTRAR 24 POLOS', precio: 62.10, unidad: 'PEN' },
      { codigoInterno: '4104683', modelo: 'D6-HPK 36W', varianteNombre: 'TABLERO PARA EMPOTRAR 36 POLOS', precio: 78.88, unidad: 'PEN' },
      { codigoInterno: '4104684-CONOS', modelo: '85X85X50', varianteNombre: 'CAJA DE PASE CON CONOS 85X85X50', precio: 7.24, unidad: 'PEN' },
      { codigoInterno: '4104685-SINCONOS', modelo: '85X85X50', varianteNombre: 'CAJA DE PASE SIN CONOS 85X85X50', precio: 7.24, unidad: 'PEN' },
      { codigoInterno: '4104686-CONOS', modelo: '100X100X70', varianteNombre: 'CAJA DE PASE CON CONOS 100X100X70', precio: 9.39, unidad: 'PEN' },
      { codigoInterno: '4104687-SINCONOS', modelo: '100X100X70', varianteNombre: 'CAJA DE PASE SIN CONOS 100X100X70', precio: 9.39, unidad: 'PEN' },
      { codigoInterno: '4104688-CONOS', modelo: '150X150X70', varianteNombre: 'CAJA DE PASE CON CONOS 150X150X70', precio: 12.42, unidad: 'PEN' },
      { codigoInterno: '4104689-SINCONOS', modelo: '150X150X70', varianteNombre: 'CAJA DE PASE SIN CONOS 150X150X70', precio: 12.42, unidad: 'PEN' },
      { codigoInterno: '4104690-CONOS', modelo: '150X110X70', varianteNombre: 'CAJA DE PASE CON CONOS 150X110X70', precio: 11.15, unidad: 'PEN' },
      { codigoInterno: '4104691-SINCONOS', modelo: '150X110X70', varianteNombre: 'CAJA DE PASE SIN CONOS 150X110X70', precio: 11.15, unidad: 'PEN' },
      { codigoInterno: '4104692-CONOS', modelo: '200X155X80', varianteNombre: 'CAJA DE PASE CON CONOS 200X155X80', precio: 20.22, unidad: 'PEN' },
      { codigoInterno: '4104693-SINCONOS', modelo: '200X155X80', varianteNombre: 'CAJA DE PASE SIN CONOS 200X155X80', precio: 20.22, unidad: 'PEN' },
      { codigoInterno: '4104694-CONOS', modelo: '200X200X80', varianteNombre: 'CAJA DE PASE CON CONOS 200X200X80', precio: 23.17, unidad: 'PEN' },
      { codigoInterno: '4104695-SINCONOS', modelo: '200X200X80', varianteNombre: 'CAJA DE PASE SIN CONOS 200X200X80', precio: 23.17, unidad: 'PEN' },
      { codigoInterno: '4104696-CONOS', modelo: '255X200X80', varianteNombre: 'CAJA DE PASE CON CONOS 255X200X80', precio: 32.13, unidad: 'PEN' },
      { codigoInterno: '4104697-SINCONOS', modelo: '255X200X80', varianteNombre: 'CAJA DE PASE SIN CONOS 255X200X80', precio: 32.13, unidad: 'PEN' },
      { codigoInterno: '4020956', modelo: 'TAP', varianteNombre: 'Tapa para reserva riel DIN', precio: 1.31, unidad: 'PEN' },
      { codigoInterno: '4006559', modelo: 'HS-100A WHITE', varianteNombre: 'CINTILLO BLANCO 2.5X100 (100U)', precio: 3.82, unidad: 'PEN' },
      { codigoInterno: '4006561', modelo: 'HS-150B WHITE', varianteNombre: 'CINTILLO BLANCO 3.6X150 (100U)', precio: 8.53, unidad: 'PEN' },
      { codigoInterno: '4006562', modelo: 'HS-180B WHITE', varianteNombre: 'CINTILLO BLANCO 3.6X180 (100U)', precio: 13.54, unidad: 'PEN' },
      { codigoInterno: '4006563', modelo: 'HS-200B WHITE', varianteNombre: 'CINTILLO BLANCO 3.6X200 (100U)', precio: 15.16, unidad: 'PEN' },
      { codigoInterno: '4006564', modelo: 'HS-200C WHITE', varianteNombre: 'CINTILLO BLANCO 4.8X200 (100U)', precio: 17.95, unidad: 'PEN' },
      { codigoInterno: '4006565', modelo: 'HS-250C WHITE', varianteNombre: 'CINTILLO BLANCO 4.8X250 (100U)', precio: 21.20, unidad: 'PEN' },
      { codigoInterno: '4006566', modelo: 'HS-300C WHITE', varianteNombre: 'CINTILLO BLANCO 4.8X300 (100U)', precio: 25.74, unidad: 'PEN' },
      { codigoInterno: '4006567', modelo: 'HS-370C WHITE', varianteNombre: 'CINTILLO BLANCO 4.8X370 (100U)', precio: 38.85, unidad: 'PEN' },
      { codigoInterno: '4006568', modelo: 'HS-530C WHITE', varianteNombre: 'CINTILLO BLANCO 4.8X530 (100U)', precio: 78.58, unidad: 'PEN' },
      { codigoInterno: '4006569', modelo: 'HS-370D WHITE', varianteNombre: 'CINTILLO BLANCO 7.6X370 (100U)', precio: 88.60, unidad: 'PEN' },
      { codigoInterno: '4006570', modelo: 'HS-400D WHITE', varianteNombre: 'CINTILLO BLANCO 7.6X400 (100U)', precio: 90.21, unidad: 'PEN' },
      { codigoInterno: '4006571', modelo: 'HS-100A BLACK', varianteNombre: 'CINTILLO NEGRO 2.5X100 (100U)', precio: 3.82, unidad: 'PEN' },
      { codigoInterno: '4006572', modelo: 'HS-150B BLACK', varianteNombre: 'CINTILLO NEGRO 3.6X150 (100U)', precio: 11.47, unidad: 'PEN' },
      { codigoInterno: '4006573', modelo: 'HS-200B BLACK', varianteNombre: 'CINTILLO NEGRO 3.6X200 (100U)', precio: 16.20, unidad: 'PEN' },
      { codigoInterno: '4006574', modelo: 'HS-200C BLACK', varianteNombre: 'CINTILLO NEGRO 4.8X200 (100U)', precio: 18.09, unidad: 'PEN' },
      { codigoInterno: '4006575', modelo: 'HS-250C BLACK', varianteNombre: 'CINTILLO NEGRO 4.8X250 (100U)', precio: 21.20, unidad: 'PEN' },
      { codigoInterno: '4006576', modelo: 'HS-300C BLACK', varianteNombre: 'CINTILLO NEGRO 4.8X300 (100U)', precio: 27.38, unidad: 'PEN' },
      { codigoInterno: '4006577', modelo: 'HS-370C BLACK', varianteNombre: 'CINTILLO NEGRO 4.8X370 (100U)', precio: 38.85, unidad: 'PEN' },
      { codigoInterno: '4006578', modelo: 'HS-400C BLACK', varianteNombre: 'CINTILLO NEGRO 4.8X400 (100U)', precio: 43.11, unidad: 'PEN' },
      { codigoInterno: '4006579', modelo: 'HS-300D BLACK', varianteNombre: 'CINTILLO NEGRO 7.6X300 (100U)', precio: 95.21, unidad: 'PEN' },
      { codigoInterno: '4006580', modelo: 'HS-370D BLACK', varianteNombre: 'CINTILLO NEGRO 7.6X370 (100U)', precio: 77.99, unidad: 'PEN' },
      { codigoInterno: '4006581', modelo: 'HS-550DL BLACK', varianteNombre: 'CINTILLO NEGRO 9.0X550 (100U)', precio: 158.62, unidad: 'PEN' },
      { codigoInterno: '4006582', modelo: 'HS-650DL BLACK', varianteNombre: 'CINTILLO NEGRO 9.0X650 (100U)', precio: 180.72, unidad: 'PEN' },
      { codigoInterno: '4006583', modelo: 'HS-760DL BLACK', varianteNombre: 'CINTILLO NEGRO 9.0X760 (100U)', precio: 299.02, unidad: 'PEN' },
      { codigoInterno: '4006592', modelo: 'HSP-20', varianteNombre: 'PORTACINTILLO 20X20 (100U)', precio: 21.34, unidad: 'PEN' },
      { codigoInterno: '4006591', modelo: 'HSP-25', varianteNombre: 'PORTACINTILLO 25X25 (100U)', precio: 34.73, unidad: 'PEN' },
      { codigoInterno: '4006594', modelo: 'HSP-30', varianteNombre: 'PORTACINTILLO 30X30 (100U)', precio: 53.41, unidad: 'PEN' },
      { codigoInterno: '4006584', modelo: 'HS-SWB-06', varianteNombre: 'ESPIRAL ENVOLVENTE DE 6MMX10MT', precio: 13.54, unidad: 'PEN' },
      { codigoInterno: '4006585', modelo: 'HS-SWB-08', varianteNombre: 'ESPIRAL ENVOLVENTE DE 8MMX10MT', precio: 13.24, unidad: 'PEN' },
      { codigoInterno: '4006586', modelo: 'HS-SWB-10', varianteNombre: 'ESPIRAL ENVOLVENTE DE 10MMX10MT', precio: 18.26, unidad: 'PEN' },
      { codigoInterno: '4006587', modelo: 'HS-SWB-12', varianteNombre: 'ESPIRAL ENVOLVENTE DE 12MMX10MT', precio: 22.96, unidad: 'PEN' },
      { codigoInterno: '4006588', modelo: 'HS-SWB-15', varianteNombre: 'ESPIRAL ENVOLVENTE DE 15MMX10MT', precio: 36.19, unidad: 'PEN' },
      { codigoInterno: '4006589', modelo: 'HS-SWB-19', varianteNombre: 'ESPIRAL ENVOLVENTE DE 19MMX10MT', precio: 44.15, unidad: 'PEN' },
    ],
  },

  // 6. EATON - INTERRUPTORES DE RIEL UNIPOLARES (1 POLO) MMC6 Y MMCM
  {
    codigoPadre: 'EATON-INTERRUPTORES-RIEL-1P',
    nombre: 'Interruptores Termomagnéticos Unipolares Eaton mMC6 (6kA) y mMCM (10kA)',
    marca: 'Eaton',
    categoria: 'INTERRUPTORES DE RIEL (1 POLO)',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores automáticos para riel DIN monopolares Eaton serie mMC6 (6kA 10A-63A) y serie mMCM (10kA 20A-63A) a 400V.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4005732', modelo: 'mMC6-C10/1', varianteNombre: 'mMC6 1X10A 6KA 400V', precio: 9.15, unidad: 'PEN' },
      { codigoInterno: '4005733', modelo: 'mMC6-C16/1', varianteNombre: 'mMC6 1X16A 6KA 400V', precio: 11.79, unidad: 'PEN' },
      { codigoInterno: '4005734', modelo: 'mMC6-C20/1', varianteNombre: 'mMC6 1X20A 6KA 400V', precio: 11.32, unidad: 'PEN' },
      { codigoInterno: '4005735', modelo: 'mMC6-C25/1', varianteNombre: 'mMC6 1X25A 6KA 400V', precio: 10.40, unidad: 'PEN' },
      { codigoInterno: '4005736', modelo: 'mMC6-C32/1', varianteNombre: 'mMC6 1X32A 6KA 400V', precio: 14.87, unidad: 'PEN' },
      { codigoInterno: '4005737', modelo: 'mMC6-C40/1', varianteNombre: 'mMC6 1X40A 6KA 400V', precio: 11.92, unidad: 'PEN' },
      { codigoInterno: '4005738', modelo: 'mMC6-C50/1', varianteNombre: 'mMC6 1X50A 6KA 400V', precio: 24.70, unidad: 'PEN' },
      { codigoInterno: '4005739', modelo: 'mMC6-C63/1', varianteNombre: 'mMC6 1X63A 6KA 400V', precio: 35.89, unidad: 'PEN' },
      { codigoInterno: '4004118', modelo: 'mMCM-C20/1', varianteNombre: 'mMCM 1X20A 10KA 400V', precio: 11.79, unidad: 'PEN' },
      { codigoInterno: '4004119', modelo: 'mMCM-C25/1', varianteNombre: 'mMCM 1X25A 10KA 400V', precio: 14.57, unidad: 'PEN' },
      { codigoInterno: '4004120', modelo: 'mMCM-C32/1', varianteNombre: 'mMCM 1X32A 10KA 400V', precio: 41.47, unidad: 'PEN' },
      { codigoInterno: '4004121', modelo: 'mMCM-C40/1', varianteNombre: 'mMCM 1X40A 10KA 400V', precio: 16.52, unidad: 'PEN' },
      { codigoInterno: '4004122', modelo: 'mMCM-C50/1', varianteNombre: 'mMCM 1X50A 10KA 400V', precio: 24.68, unidad: 'PEN' },
      { codigoInterno: '4004123', modelo: 'mMCM-C63/1', varianteNombre: 'mMCM 1X63A 10KA 400V', precio: 38.25, unidad: 'PEN' },
    ],
  },
];

async function main() {
  console.log('🚀 Cargando lote LS Susol, ACB AS, Guardamotores MMS, Contactores MC, Dehn, E-Safe y Eaton...');

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

  console.log('\n✅ Importación del nuevo lote completada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en script de importación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
