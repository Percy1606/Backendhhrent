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
  // 1. EATON - INTERRUPTORES DE RIEL Y DIFERENCIALES
  {
    codigoPadre: 'EATON-INTERRUPTORES-RIEL-DIFERENCIALES',
    nombre: 'Interruptores de Riel mMC6, mMCM, mMCT y Diferenciales mRCM Eaton',
    marca: 'Eaton',
    categoria: 'INTERRUPTORES DE RIEL (2 POLOS)',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores automáticos para riel DIN bipolares serie mMC6 (6kA), mMCM (10kA), mMCT (20kA 80A-125A), y diferenciales mRCM (estándar e inmunizados Tipo A).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4005740', modelo: 'mMC6-C10/2', varianteNombre: 'mMC6 2X10A 6KA 400V', precio: 25.57, unidad: 'PEN' },
      { codigoInterno: '4005744', modelo: 'mMC6-C32/2', varianteNombre: 'mMC6 2X32A 6KA 400V', precio: 20.91, unidad: 'PEN' },
      { codigoInterno: '4005745', modelo: 'mMC6-C40/2', varianteNombre: 'mMC6 2X40A 6KA 400V', precio: 26.85, unidad: 'PEN' },
      { codigoInterno: '4005746', modelo: 'mMC6-C50/2', varianteNombre: 'mMC6 2X50A 6KA 400V', precio: 47.85, unidad: 'PEN' },
      { codigoInterno: '4005747', modelo: 'mMC6-C63/2', varianteNombre: 'mMC6 2X63A 6KA 400V', precio: 48.60, unidad: 'PEN' },
      { codigoInterno: '4004128', modelo: 'mMCM-C10/2', varianteNombre: 'mMCM 2X10A 10KA 400V', precio: 38.67, unidad: 'PEN' },
      { codigoInterno: '4004132', modelo: 'mMCM-C32/2', varianteNombre: 'mMCM 2X32A 10KA 400V', precio: 21.57, unidad: 'PEN' },
      { codigoInterno: '4004134', modelo: 'mMCM-C50/2', varianteNombre: 'mMCM 2X50A 10KA 400V', precio: 76.34, unidad: 'PEN' },
      { codigoInterno: '4005756', modelo: 'mMCT-C080/2', varianteNombre: 'mMCT 2X80A 20KA 400V', precio: 155.64, unidad: 'PEN' },
      { codigoInterno: '4005758', modelo: 'mMCT-C125/2', varianteNombre: 'mMCT 2X125A 20KA 400V', precio: 156.32, unidad: 'PEN' },
      { codigoInterno: '4010751', modelo: 'mRCM-63/2/03', varianteNombre: 'DIFERENCIAL mRCM 2X63A 300MA', precio: 82.51, unidad: 'PEN' },
      { codigoInterno: '4004442', modelo: 'mRCM-63/2/003-A', varianteNombre: 'DIFERENCIAL INMUNIZADO mRCM 2X63A 30MA', precio: 145.72, unidad: 'PEN' },
      { codigoInterno: '4004445', modelo: 'mRCM-63/4/003-A', varianteNombre: 'DIFERENCIAL INMUNIZADO mRCM 4X63A 30MA', precio: 197.55, unidad: 'PEN' },
    ],
  },

  // 2. EATON - INTERRUPTORES DE CAJA MOLDEADA BZM Y LZM CON ACCESORIOS
  {
    codigoPadre: 'EATON-CAJA-MOLDEADA-BZM-LZM',
    nombre: 'Interruptores de Caja Moldeada Eaton BZM (Fijos) y LZM (Regulables) y Accesorios',
    marca: 'Eaton',
    categoria: 'INTERRUPTORES DE CAJA MOLDEADA FIJOS',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores termo-magnéticos y electrónicos en caja moldeada serie BZM (fijos 16A-250A) y LZM (regulables 20A-1000A en 55kA, 90kA y 100kA), junto con accesorios (bobinas NZM, motores operadores NZM-XR, enclavamientos XMVR y bloqueos por candado XKAV).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4011761', modelo: 'BZMB1-2-A63', varianteNombre: 'BZMB1 2P 63A 50KA/220V', precio: 313.20, unidad: 'PEN' },
      { codigoInterno: '4004381', modelo: 'BZMB1-A16', varianteNombre: 'BZMB1 3P 16A 50KA/220V', precio: 191.13, unidad: 'PEN' },
      { codigoInterno: '4004382', modelo: 'BZMB1-A20', varianteNombre: 'BZMB1 3P 20A 50KA/220V', precio: 204.47, unidad: 'PEN' },
      { codigoInterno: '4004383', modelo: 'BZMB1-A25', varianteNombre: 'BZMB1 3P 25A 50KA/220V', precio: 248.76, unidad: 'PEN' },
      { codigoInterno: '4004384', modelo: 'BZMB1-A32', varianteNombre: 'BZMB1 3P 32A 50KA/220V', precio: 203.32, unidad: 'PEN' },
      { codigoInterno: '4004386', modelo: 'BZMB1-A50', varianteNombre: 'BZMB1 3P 50A 50KA/220V', precio: 214.19, unidad: 'PEN' },
      { codigoInterno: '4004387', modelo: 'BZMB1-A63', varianteNombre: 'BZMB1 3P 63A 50KA/220V', precio: 204.16, unidad: 'PEN' },
      { codigoInterno: '4004439', modelo: 'BZMB2-A250', varianteNombre: 'BZMB2 3P 250A 50KA/220V', precio: 677.38, unidad: 'PEN' },
      { codigoInterno: '4006825', modelo: 'BZMB1-4-A20', varianteNombre: 'BZMB1 4P 20A 50KA/220V', precio: 431.53, unidad: 'PEN' },
      { codigoInterno: '4006828', modelo: 'BZMB1-4-A40', varianteNombre: 'BZMB1 4P 40A 50KA/220V', precio: 464.06, unidad: 'PEN' },
      { codigoInterno: '4006831', modelo: 'BZMB1-4-A80', varianteNombre: 'BZMB1 4P 80A 50KA/220V', precio: 509.65, unidad: 'PEN' },
      { codigoInterno: '4004147', modelo: 'LZMC1-A20', varianteNombre: 'LZMC1 3P 20A 55KA/220V', precio: 305.89, unidad: 'PEN' },
      { codigoInterno: '4004148', modelo: 'LZMC1-A25', varianteNombre: 'LZMC1 3P 25A 55KA/220V', precio: 270.22, unidad: 'PEN' },
      { codigoInterno: '4004149', modelo: 'LZMC1-A32', varianteNombre: 'LZMC1 3P 32A 55KA/220V', precio: 287.32, unidad: 'PEN' },
      { codigoInterno: '4004150', modelo: 'LZMC1-A40', varianteNombre: 'LZMC1 3P 40A 55KA/220V', precio: 279.11, unidad: 'PEN' },
      { codigoInterno: '4004151', modelo: 'LZMC1-A50', varianteNombre: 'LZMC1 3P 50A 55KA/220V', precio: 256.08, unidad: 'PEN' },
      { codigoInterno: '4004152', modelo: 'LZMC1-A63', varianteNombre: 'LZMC1 3P 63A 55KA/220V', precio: 286.45, unidad: 'PEN' },
      { codigoInterno: '4004153', modelo: 'LZMC1-A80', varianteNombre: 'LZMC1 3P 80A 55KA/220V', precio: 269.44, unidad: 'PEN' },
      { codigoInterno: '4004157', modelo: 'LZMS1-A25', varianteNombre: 'LZMS1 3P 25A 90KA/220V', precio: 472.24, unidad: 'PEN' },
      { codigoInterno: '4004158', modelo: 'LZMS1-A32', varianteNombre: 'LZMS1 3P 32A 90KA/220V', precio: 272.52, unidad: 'PEN' },
      { codigoInterno: '4004159', modelo: 'LZMS1-A40', varianteNombre: 'LZMS1 3P 40A 90KA/220V', precio: 272.50, unidad: 'PEN' },
      { codigoInterno: '4004160', modelo: 'LZMS1-A50', varianteNombre: 'LZMS1 3P 50A 90KA/220V', precio: 313.81, unidad: 'PEN' },
      { codigoInterno: '4004162', modelo: 'LZMS1-A80', varianteNombre: 'LZMS1 3P 80A 90KA/220V', precio: 271.06, unidad: 'PEN' },
      { codigoInterno: '4004172', modelo: 'LZMS4-AE1000', varianteNombre: 'ELECTRONICO LZM 3P 1000A 100KA/220V', precio: 5582.48, unidad: 'PEN' },
      { codigoInterno: '4013742', modelo: 'LZMC1-4-A80', varianteNombre: 'LZMC1 4P 80A 55KA/220V', precio: 526.61, unidad: 'PEN' },
      { codigoInterno: '4004396', modelo: 'NZM2/3-XA208-250', varianteNombre: 'BOBINA DISP 208-250AC/DC LZM2/3', precio: 312.97, unidad: 'PEN' },
      { codigoInterno: '4004393', modelo: 'NZM2/3-XU208-240', varianteNombre: 'BOBINA MIN 208-240AC LZM2/3', precio: 230.64, unidad: 'PEN' },
      { codigoInterno: '4006503', modelo: 'NZM4-XU208-240AC', varianteNombre: 'BOBINA MIN 240V LZM4', precio: 353.77, unidad: 'PEN' },
      { codigoInterno: '4004394', modelo: 'NZM4-XU208-240', varianteNombre: 'BOBINA MIN 600V LZM4', precio: 281.70, unidad: 'PEN' },
      { codigoInterno: '4004402', modelo: 'NZM2-XR208-240AC', varianteNombre: 'MOTOR OPERADOR 230V LZM2', precio: 2930.83, unidad: 'PEN' },
      { codigoInterno: '4004403', modelo: 'NZM3-XR208-240AC', varianteNombre: 'MOTOR OPERADOR 230V LZM3', precio: 2796.03, unidad: 'PEN' },
      { codigoInterno: '4004404', modelo: 'NZM4-XR208-240AC', varianteNombre: 'MOTOR OPERADOR 230V LZM4', precio: 3489.64, unidad: 'PEN' },
      { codigoInterno: '4007217', modelo: 'NZM3-XMVR', varianteNombre: 'ENCLAVAMIENTO MECÁNICO LZM3', precio: 1032.96, unidad: 'PEN' },
      { codigoInterno: '4005505', modelo: 'NZM2/3-XKAV', varianteNombre: 'BLOCK PARA CANDADO LZM2/LZM3', precio: 123.81, unidad: 'PEN' },
    ],
  },

  // 3. EATON - GUARDAMOTORES PKZM Y ACCESORIOS
  {
    codigoPadre: 'EATON-GUARDAMOTORES-PKZM',
    nombre: 'Guardamotores Magnetotérmicos Eaton PKZM01, PKZM0, PKZM4 y Accesorios',
    marca: 'Eaton',
    categoria: 'GUARDAMOTORES CAPACIDAD ESTANDAR',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Guardamotores para protección de motores series PKZM01 (con pulsador), PKZM0 y PKZM4 (de 0.1A hasta 65A), junto con contactos auxiliares NHI/AGM, cajas plásticas CI-PKZ01, bloques de conexión y limitadores de corriente.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4004229', modelo: 'PKZM01-0,16', varianteNombre: 'PKZM01 0.1 - 0.16A', precio: 83.89, unidad: 'PEN' },
      { codigoInterno: '4004230', modelo: 'PKZM01-0,25', varianteNombre: 'PKZM01 0.16 - 0.25A', precio: 87.85, unidad: 'PEN' },
      { codigoInterno: '4004223', modelo: 'PKZM01-10', varianteNombre: 'PKZM01 6.3 - 10A', precio: 109.94, unidad: 'PEN' },
      { codigoInterno: '4004224', modelo: 'PKZM01-12', varianteNombre: 'PKZM01 8 - 12A', precio: 112.92, unidad: 'PEN' },
      { codigoInterno: '4004225', modelo: 'PKZM01-16', varianteNombre: 'PKZM01 10 - 16A', precio: 110.87, unidad: 'PEN' },
      { codigoInterno: '4007220', modelo: 'PKZM0-1', varianteNombre: 'PKZM0 ALTA CAPACIDAD 0.63 - 1A', precio: 96.18, unidad: 'PEN' },
      { codigoInterno: '4007226', modelo: 'PKZM0-12', varianteNombre: 'PKZM0 ALTA CAPACIDAD 8 - 12A', precio: 120.81, unidad: 'PEN' },
      { codigoInterno: '4007136', modelo: 'PKZM4-50', varianteNombre: 'PKZM4 ALTA CAPACIDAD 40 - 50A', precio: 477.10, unidad: 'PEN' },
      { codigoInterno: '4007228', modelo: 'PKZM4-58', varianteNombre: 'PKZM4 ALTA CAPACIDAD 50 - 58A', precio: 517.72, unidad: 'PEN' },
      { codigoInterno: '4007229', modelo: 'PKZM4-63', varianteNombre: 'PKZM4 ALTA CAPACIDAD 55 - 65A', precio: 515.29, unidad: 'PEN' },
      { codigoInterno: '4004453', modelo: 'NHI-E-10-PKZ0', varianteNombre: 'CONTACTO AUX FRONTAL 1NA', precio: 13.67, unidad: 'PEN' },
      { codigoInterno: '4004452', modelo: 'AGM2-10-PKZ0', varianteNombre: 'CONTACTO AUX ALARMA TRIP 2NA', precio: 32.21, unidad: 'PEN' },
      { codigoInterno: '4005526', modelo: 'CI-PKZ01', varianteNombre: 'CAJA PARA GUARDAMOTOR PKZM01', precio: 29.89, unidad: 'PEN' },
      { codigoInterno: '4007213', modelo: 'PKZM0-XM32DE', varianteNombre: 'BLOQUE DE CONEX P/PKZ Y DILM17-DILM32', precio: 5.28, unidad: 'PEN' },
      { codigoInterno: '4007214', modelo: 'PKZM4-XM65DE', varianteNombre: 'BLOQUE DE CONEX P/PKZ Y DILM40-DILM65', precio: 28.03, unidad: 'PEN' },
      { codigoInterno: '4007215', modelo: 'CL-PKZ0', varianteNombre: 'LIMITADOR DE CORRIENTE P/ PKZ', precio: 73.62, unidad: 'PEN' },
    ],
  },

  // 4. EATON - CONTACTORES DILM/DILK/DILER Y RELÉS ZB
  {
    codigoPadre: 'EATON-CONTACTORES-DILM-RELES-ZB',
    nombre: 'Contactores Potencia/Capacitivos DILM/DILK, Minicontactores DILER y Relés ZB Eaton',
    marca: 'Eaton',
    categoria: 'CONTACTORES',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Contactores tripolares de potencia DILM (9A a 500A), contactores para condensadores DILK, minicontactores DILER y relés térmicos de sobrecarga serie ZB12, ZB32, ZB65 y ZB150 con accesorios (contactos aux DILA/DILM, varistores, temporizadores y enclavamientos mecánicos XVB/281196).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4004175', modelo: 'DILM 9-24V 1NA', varianteNombre: 'DILM 3X9A 24V 1NA', precio: 40.60, unidad: 'PEN' },
      { codigoInterno: '4004180', modelo: 'DILM 12A-110V 1NC', varianteNombre: 'DILM 3X12A 110V 1NC', precio: 40.58, unidad: 'PEN' },
      { codigoInterno: '4005686', modelo: 'DILM 25A-24V 1NC', varianteNombre: 'DILM 3X25A 24V 1NC', precio: 86.59, unidad: 'PEN' },
      { codigoInterno: '4004187', modelo: 'DILM 25A-220V 1NC', varianteNombre: 'DILM 3X25A 220V 1NC', precio: 119.64, unidad: 'PEN' },
      { codigoInterno: '4004190', modelo: 'DILM 32A-220V 1NC', varianteNombre: 'DILM 3X32A 220V 1NC', precio: 113.10, unidad: 'PEN' },
      { codigoInterno: '4004191', modelo: 'DILM 40A-220V 1NA', varianteNombre: 'DILM 3X40A 220V 1NA', precio: 244.10, unidad: 'PEN' },
      { codigoInterno: '4016489', modelo: 'DILM50(RDC24)', varianteNombre: 'DILM 3X50A 24VDC', precio: 497.94, unidad: 'PEN' },
      { codigoInterno: '4004192', modelo: 'DILM 50A-110V 1NC', varianteNombre: 'DILM 3X50A 110V 1NC', precio: 366.51, unidad: 'PEN' },
      { codigoInterno: '4004197', modelo: 'DILM 80A-220V 1NA', varianteNombre: 'DILM 3X80A 220V 1NA', precio: 384.79, unidad: 'PEN' },
      { codigoInterno: '4007137', modelo: 'DILM115(RAC440)', varianteNombre: 'DILM 3X115A 380-440V', precio: 625.46, unidad: 'PEN' },
      { codigoInterno: '4011751', modelo: 'DILM185A/22(RAC120)', varianteNombre: 'DILM 3X185A 100-120V 2NA2NC', precio: 1416.99, unidad: 'PEN' },
      { codigoInterno: '4004206', modelo: 'DILM 250A-110V', varianteNombre: 'DILM 3X250A 110V 2NA2NC', precio: 1432.24, unidad: 'PEN' },
      { codigoInterno: '4005727', modelo: 'DILM 300A-110V', varianteNombre: 'DILM 3X300A 110V 2NA2NC', precio: 1875.04, unidad: 'PEN' },
      { codigoInterno: '4004208', modelo: 'DILM 300A-220V', varianteNombre: 'DILM 3X300A 220V 2NA2NC', precio: 2809.47, unidad: 'PEN' },
      { codigoInterno: '4008130', modelo: 'DILM400/22(RAC500)', varianteNombre: 'DILM 3X400A 250-500V 2NA2NC', precio: 2966.72, unidad: 'PEN' },
      { codigoInterno: '4004210', modelo: 'DILM 500A-220V', varianteNombre: 'DILM 3X500A 220V 2NA2NC', precio: 3449.36, unidad: 'PEN' },
      { codigoInterno: '4004211', modelo: 'DILK12-11', varianteNombre: 'CONTACTOR CONDENSADOR 7.5 KVAR 220V', precio: 135.94, unidad: 'PEN' },
      { codigoInterno: '4004212', modelo: 'DILK20-11', varianteNombre: 'CONTACTOR CONDENSADOR 11 KVAR 220V', precio: 184.42, unidad: 'PEN' },
      { codigoInterno: '4004214', modelo: 'DILK33-11', varianteNombre: 'CONTACTOR CONDENSADOR 20 KVAR 220V', precio: 262.70, unidad: 'PEN' },
      { codigoInterno: '4007236', modelo: 'DILER-40, 220V', varianteNombre: 'MINICONTACTOR AUXILIAR 10A 4NA', precio: 26.45, unidad: 'PEN' },
      { codigoInterno: '4004432', modelo: 'DILA-XHI40', varianteNombre: 'CONTACTO AUX FRONTAL DILM7-DILM32 4NA', precio: 33.23, unidad: 'PEN' },
      { codigoInterno: '4004430', modelo: 'DILM32-XHI11-S', varianteNombre: 'CONTACTO AUX LATERAL DILM17-DILM32 1NA1NC', precio: 37.13, unidad: 'PEN' },
      { codigoInterno: '4005508', modelo: 'DILM150-XHI11', varianteNombre: 'CONTACTO AUX FRONTAL DILM40-DILM150 1NA1NC', precio: 9.39, unidad: 'PEN' },
      { codigoInterno: '4005512', modelo: 'DILM1000-XHI11-SI', varianteNombre: 'CONTACTO AUX LATERAL DILM40-DILM225 1NA1NC SI', precio: 35.16, unidad: 'PEN' },
      { codigoInterno: '4005521', modelo: 'DILM1000-XHI11-SA', varianteNombre: 'CONTACTO AUX LATERAL DILM40-DILM225 1NA1NC SA', precio: 37.83, unidad: 'PEN' },
      { codigoInterno: '4005514', modelo: 'DILM32-XSPV240', varianteNombre: 'VARISTOR DILM17-DILM32 130-240VAC', precio: 15.94, unidad: 'PEN' },
      { codigoInterno: '4005515', modelo: 'DILM95-XSPV240', varianteNombre: 'VARISTOR DILM40-DILM95 130-240VAC', precio: 18.12, unidad: 'PEN' },
      { codigoInterno: '4005516', modelo: 'DILM32-XTEE11', varianteNombre: 'TEMP ON DELAY DILM7-DILM38', precio: 158.56, unidad: 'PEN' },
      { codigoInterno: '4005517', modelo: 'DILM32-XTEY20', varianteNombre: 'TEMP ESTRELLA TRIANGULO DILM7-DILM38', precio: 173.83, unidad: 'PEN' },
      { codigoInterno: '4005518', modelo: 'DILM32-XVB', varianteNombre: 'BLOQUEO MECÁNICO DILM7-DILM72', precio: 0.79, unidad: 'PEN' },
      { codigoInterno: '4005519', modelo: 'DILM150-XVB', varianteNombre: 'BLOQUEO MECÁNICO DILM80-DILM170', precio: 49.05, unidad: 'PEN' },
      { codigoInterno: '4005520', modelo: 'DILM500-XMB', varianteNombre: 'BLOQUEO MECÁNICO DILM185-DILM500', precio: 56.18, unidad: 'PEN' },
      { codigoInterno: '4007230', modelo: '281196', varianteNombre: 'ENCLAV MECÁNICO DILM7-DILM15', precio: 10.33, unidad: 'PEN' },
      { codigoInterno: '4007231', modelo: '281197', varianteNombre: 'ENCLAV MECÁNICO DILM17-DILM38', precio: 17.88, unidad: 'PEN' },
      { codigoInterno: '4007232', modelo: '281198', varianteNombre: 'ENCLAV MECÁNICO DILM40-DILM72', precio: 19.51, unidad: 'PEN' },
      { codigoInterno: '4004248', modelo: 'ZB12-1', varianteNombre: 'RELÉ TERMICO 0.6-1A', precio: 88.63, unidad: 'PEN' },
      { codigoInterno: '4004263', modelo: 'ZB12-1,6', varianteNombre: 'RELÉ TERMICO 1-1.6A', precio: 91.55, unidad: 'PEN' },
      { codigoInterno: '4004267', modelo: 'ZB12-10', varianteNombre: 'RELÉ TERMICO 6-10A', precio: 102.17, unidad: 'PEN' },
      { codigoInterno: '4004268', modelo: 'ZB12-12', varianteNombre: 'RELÉ TERMICO 9-12A', precio: 76.66, unidad: 'PEN' },
      { codigoInterno: '4007219', modelo: 'ZB32-10', varianteNombre: 'RELÉ TERMICO 6-10A ZB32', precio: 76.79, unidad: 'PEN' },
      { codigoInterno: '4004269', modelo: 'ZB32-16', varianteNombre: 'RELÉ TERMICO 10-16A ZB32', precio: 94.15, unidad: 'PEN' },
      { codigoInterno: '4004270', modelo: 'ZB32-24', varianteNombre: 'RELÉ TERMICO 16-24A ZB32', precio: 189.93, unidad: 'PEN' },
      { codigoInterno: '4004271', modelo: 'ZB32-32', varianteNombre: 'RELÉ TERMICO 24-32A ZB32', precio: 153.31, unidad: 'PEN' },
      { codigoInterno: '4004281', modelo: 'ZB32-38', varianteNombre: 'RELÉ TERMICO 32-38A ZB32', precio: 190.91, unidad: 'PEN' },
      { codigoInterno: '4004272', modelo: 'ZB65-40', varianteNombre: 'RELÉ TERMICO 24-40A ZB65', precio: 186.90, unidad: 'PEN' },
      { codigoInterno: '4004274', modelo: 'ZB65-65', varianteNombre: 'RELÉ TERMICO 57-65A ZB65', precio: 238.06, unidad: 'PEN' },
      { codigoInterno: '4004275', modelo: 'ZB150-70', varianteNombre: 'RELÉ TERMICO 50-70A ZB150', precio: 279.60, unidad: 'PEN' },
      { codigoInterno: '4010811', modelo: 'ZB150-150/KK', varianteNombre: 'RELÉ TERMICO 120-150A ZB150', precio: 375.81, unidad: 'PEN' },
      { codigoInterno: '4005522', modelo: 'ZB32-XEZ', varianteNombre: 'BASE MONTAJE EN RIEL ZB32', precio: 29.12, unidad: 'PEN' },
      { codigoInterno: '4005523', modelo: 'ZB65-XEZ', varianteNombre: 'BASE MONTAJE EN RIEL ZB65', precio: 37.04, unidad: 'PEN' },
    ],
  },

  // 5. EATON - PILOTOS Y PULSADORES M22
  {
    codigoPadre: 'EATON-PILOTOS-PULSADORES-M22',
    nombre: 'Lámparas Piloto LED, Pulsadores, Selectores y Accesorios M22 Eaton',
    marca: 'Eaton',
    categoria: 'LAMPARAS PILOTO',
    familia: 'Accesorios',
    subfamilia: 'Adaptadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Elementos de mando y señalización serie M22 RMQ-Titan (pilotos luminosos LED M22-L/M22-CLED 12-30V y 85-264V, pulsadores rasantes M22-D/DL, selectores con llave M22-WS, bloques de contactos M22-CK y capuchas protectoras IP65).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4004988', modelo: 'M22-L-Y', varianteNombre: 'PILOTO LUMIN LED S/LAMP AMARILLO', precio: 14.67, unidad: 'PEN' },
      { codigoInterno: '4004991', modelo: 'M22-CLED-R', varianteNombre: 'BLOQUE LAMPARA LED 12-30V ROJO', precio: 25.93, unidad: 'PEN' },
      { codigoInterno: '4004992', modelo: 'M22-CLED-G', varianteNombre: 'BLOQUE LAMPARA LED 12-30V VERDE', precio: 25.47, unidad: 'PEN' },
      { codigoInterno: '4004993', modelo: 'M22-CLED230-W', varianteNombre: 'BLOQUE LAMPARA LED 85-264V BLANCO', precio: 38.01, unidad: 'PEN' },
      { codigoInterno: '4004994', modelo: 'M22-CLED230-R', varianteNombre: 'BLOQUE LAMPARA LED 85-264V ROJO', precio: 37.86, unidad: 'PEN' },
      { codigoInterno: '4005533', modelo: 'M22-CLED230-W-LED', varianteNombre: 'BLOQUE LAMPARA LED 85-264V BLANCO M22LED', precio: 28.05, unidad: 'PEN' },
      { codigoInterno: '4004971', modelo: 'M22-D-S', varianteNombre: 'PULSADOR RASANTE NEGRO M22-D-S', precio: 14.67, unidad: 'PEN' },
      { codigoInterno: '4004982', modelo: 'M22-DL-Y', varianteNombre: 'PULSADOR RAS LUMINO S/LAMP AMARILLO', precio: 15.97, unidad: 'PEN' },
      { codigoInterno: '4004979', modelo: 'M22-WS', varianteNombre: 'SELECTOR C/LLAVE 2 POS 0-1 FIJAS', precio: 81.55, unidad: 'PEN' },
      { codigoInterno: '4004997', modelo: 'M22-CK20', varianteNombre: 'BLOQUE DE CONTACTOS 2NA M22-CK20', precio: 16.63, unidad: 'PEN' },
      { codigoInterno: '4005530', modelo: 'M22-T-D', varianteNombre: 'CAPUCHA IP65 PARA PULSADOR M22-T-D', precio: 6.28, unidad: 'PEN' },
    ],
  },
];

async function main() {
  console.log('🚀 Cargando lote completo de productos Eaton (Riel, BZM, LZM, PKZM, DILM, ZB, M22)...');

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

  console.log('\n✅ Importación de productos Eaton completada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en script de importación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
