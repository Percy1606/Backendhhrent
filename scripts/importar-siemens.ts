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
  // 1. SIEMENS - PERIFERIAS ET 200SP
  {
    codigoPadre: 'SIE-ET200SP-SISTEMA',
    nombre: 'Sistema de Periferia Descentralizada SIMATIC ET 200SP',
    marca: 'Siemens',
    categoria: 'Periferias ET 200SP',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Sistema I/O modular de alta velocidad SIMATIC ET 200SP con módulos de interfaz Profinet/Profibus, bloques de bornes BaseUnit y módulos I/O digitales/analógicos.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1023605', modelo: '6ES7155-6AU02-0BN0', varianteNombre: 'mód. de interfaz PROFINET IM 155-6 PN ST', precio: 761.86, unidad: 'USD' },
      { codigoInterno: '1020207', modelo: '6ES7155-6BA01-0CN0', varianteNombre: 'bundle PROFIBUS IM, IM 155-6DP HF', precio: 828.86, unidad: 'USD' },
      { codigoInterno: '1016733', modelo: '6ES7193-6AR00-0AA0', varianteNombre: 'adaptador de bus BA 2xRJ45', precio: 207.21, unidad: 'USD' },
      { codigoInterno: '1023606', modelo: '6ES7155-6AA02-0BN0', varianteNombre: 'bundle IM 155-6 PN ST y bus BA 2x RJ45', precio: 956.61, unidad: 'USD' },
      { codigoInterno: '1013058', modelo: '6ES7193-6BP00-0BA0', varianteNombre: 'Bloque bornes tipo A0 gris, push-in, mismo potencial', precio: 40.51, unidad: 'USD' },
      { codigoInterno: '1013057', modelo: '6ES7193-6BP00-0DA0', varianteNombre: 'Bloque bornes tipo A0 blancas, push-in, nuevo grupo', precio: 73.23, unidad: 'USD' },
      { codigoInterno: '1013127', modelo: '6ES7131-6BH01-0BA0', varianteNombre: 'mód. entradas digitales, DI 16x 24V DC Standard', precio: 272.65, unidad: 'USD' },
      { codigoInterno: '1023607', modelo: '6ES7131-6BF01-0BA0', varianteNombre: 'mód. entradas digitales, DI 8x 24VDC Standard', precio: 158.92, unidad: 'USD' },
      { codigoInterno: '1013128', modelo: '6ES7132-6BH01-0BA0', varianteNombre: 'mód. salidas digitales, 16 x DQ 24V DC/0,5A St', precio: 318.61, unidad: 'USD' },
      { codigoInterno: '1023608', modelo: '6ES7132-6BF01-0BA0', varianteNombre: 'mód. salidas digitales, 8 x DQ 24V DC/0,5A St', precio: 207.21, unidad: 'USD' },
      { codigoInterno: '1016522', modelo: '6ES7134-6GD01-0BA1', varianteNombre: 'mód. entradas analógicas, 4 x AI 2-/4-Wire St', precio: 526.60, unidad: 'USD' },
      { codigoInterno: '1013129', modelo: '6ES7134-6GF00-0AA1', varianteNombre: 'mód. entrada analógica, 8 x AI 2-/4-Wire Ba', precio: 674.61, unidad: 'USD' },
      { codigoInterno: '1023609', modelo: '6ES7134-6JD00-0CA1', varianteNombre: 'mód. entrada analógica, 4xAI RTD/TC HF', precio: 699.54, unidad: 'USD' },
      { codigoInterno: '1013055', modelo: '6ES7134-6TD00-0CA1', varianteNombre: 'mod. entrada analóg. HART, 4 x AI 2-WIRE HART HF', precio: 988.55, unidad: 'USD' },
      { codigoInterno: '1013056', modelo: '6ES7135-6HD00-0BA1', varianteNombre: 'módulo de salida analógico, 4 x AQ', precio: 699.54, unidad: 'USD' },
    ],
  },

  // 2. SIEMENS - HMI BASIC PANEL
  {
    codigoPadre: 'SIE-HMI-BASIC-PANEL',
    nombre: 'Paneles de Operador SIMATIC HMI Basic Panel',
    marca: 'Siemens',
    categoria: 'HMI Basic Panel',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Paneles táctiles panorámicos KTP400 y KTP700 de la serie SIMATIC HMI Basic Panel para tareas de supervisión compactas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
    variantes: [
      { codigoInterno: '1013059', modelo: '6AV2123-2DB03-0AX0', varianteNombre: 'KTP400 Basic, Basic Panel 4"', precio: 965.18, unidad: 'USD' },
      { codigoInterno: '1009869', modelo: '6AV2123-2GB03-0AX0', varianteNombre: 'KTP700 Basic, Basic Panel 7"', precio: 1775.34, unidad: 'USD' },
    ],
  },

  // 3. SIEMENS - HMI COMFORT PANEL
  {
    codigoPadre: 'SIE-HMI-COMFORT-PANEL',
    nombre: 'Paneles de Operador SIMATIC HMI Comfort Panel',
    marca: 'Siemens',
    categoria: 'HMI Comfort Panel',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Paneles HMI de altas prestaciones serie Comfort Panel en pantallas táctiles de 7", 9" y 12".',
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
    variantes: [
      { codigoInterno: '1023245', modelo: '6AV2124-0GC01-0AX0', varianteNombre: 'TP700 Comfort, Comfort Panel 7"', precio: 3087.18, unidad: 'USD' },
      { codigoInterno: '1021260', modelo: '6AV2124-0JC01-0AX0', varianteNombre: 'TP900 Comfort, Comfort Panel 9"', precio: 5211.51, unidad: 'USD' },
      { codigoInterno: '1014722', modelo: '6AV2124-0MC01-0AX0', varianteNombre: 'TP1200 Comfort, Comfort Panel 12"', precio: 6743.80, unidad: 'USD' },
    ],
  },

  // 4. SIEMENS - HMI UNIFIED BASIC PANEL
  {
    codigoPadre: 'SIE-HMI-UNIFIED-BASIC',
    nombre: 'Paneles de Operador SIMATIC HMI Unified Basic Panel',
    marca: 'Siemens',
    categoria: 'HMI Unified Basic Panel',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Paneles multitáctiles SIMATIC HMI Unified Basic MTP700 equipados con sistema WinCC Unified.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
    variantes: [
      { codigoInterno: '1023611', modelo: '6AV2123-3GB32-0AW0', varianteNombre: 'MTP700, Unified Basic Panel 7"', precio: 1691.21, unidad: 'USD' },
    ],
  },

  // 5. SIEMENS - HMI UNIFIED COMFORT PANEL
  {
    codigoPadre: 'SIE-HMI-UNIFIED-COMFORT',
    nombre: 'Paneles de Operador SIMATIC HMI Unified Comfort Panel',
    marca: 'Siemens',
    categoria: 'HMI Unified Confort Panel',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Paneles de alto rendimiento multitáctil MTP700, MTP1000 y MTP1200 de la tecnología SIMATIC HMI Unified Comfort.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
    variantes: [
      { codigoInterno: '1023613', modelo: '6AV2128-3GB06-0AX1', varianteNombre: 'MTP700, Unified Comfort Panel 7"', precio: 3081.72, unidad: 'USD' },
      { codigoInterno: '1020501', modelo: '6AV2128-3KB06-0AX1', varianteNombre: 'MTP1000, Unified Comfort Panel 10"', precio: 5094.66, unidad: 'USD' },
      { codigoInterno: '1023612', modelo: '6AV2128-3MB06-0AX1', varianteNombre: 'MTP1200, Unified Comfort Panel 12"', precio: 6567.75, unidad: 'USD' },
    ],
  },

  // 6. SIEMENS - FUENTES LOGO! POWER
  {
    codigoPadre: 'SIE-LOGO-POWER-24V',
    nombre: 'Fuentes de Alimentación LOGO!POWER 24VDC',
    marca: 'Siemens',
    categoria: 'Fuentes de Alimentación - Logo! Power',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Fuentes de alimentación conmutadas ultra compuestas LOGO!POWER 24V DC en capacidades de 1.3A, 2.5A y 4A.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '1020793', modelo: '6EP3331-6SB00-0AY0', varianteNombre: '24VDC / 1.3 A (IN: 100-240V)', precio: 104.39, unidad: 'USD' },
      { codigoInterno: '1023246', modelo: '6EP3332-6SB00-0AY0', varianteNombre: '24VDC / 2.5 A (IN: 100-240V AC)', precio: 139.44, unidad: 'USD' },
      { codigoInterno: '1023248', modelo: '6EP3333-6SB00-0AY0', varianteNombre: '24VDC / 4.0 A (IN: 100-240V AC)', precio: 187.74, unidad: 'USD' },
    ],
  },

  // 7. SIEMENS - FUENTES SITOP PSU4200
  {
    codigoPadre: 'SIE-SITOP-PSU4200-24V',
    nombre: 'Fuentes de Alimentación Básicas SITOP PSU4200 24VDC',
    marca: 'Siemens',
    categoria: 'Fuentes de Alimentación Básicas SITOP PSU4200',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Fuentes de alimentación industriales monofásicas SITOP PSU4200 24V DC de 3A, 5A y 10A.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '1023251', modelo: '6EP3332-3SB00-0AX0', varianteNombre: '1AC 24VDC/3A (IN: 120/240 VAC)', precio: 123.86, unidad: 'USD' },
      { codigoInterno: '1023249', modelo: '6EP3333-3SB00-0AX0', varianteNombre: '1AC 24VDC/5A (IN: 120/240 VAC)', precio: 174.50, unidad: 'USD' },
      { codigoInterno: '1023250', modelo: '6EP3334-3SB00-0AX0', varianteNombre: '1AC 24VDC/10A (IN: 120/240 VAC)', precio: 273.43, unidad: 'USD' },
    ],
  },

  // 8. SIEMENS - FUENTES SITOP PSU6200
  {
    codigoPadre: 'SIE-SITOP-PSU6200-24V',
    nombre: 'Fuentes de Alimentación Estándar SITOP PSU6200 24VDC',
    marca: 'Siemens',
    categoria: 'Fuentes de Alimentación Estándar SITOP PSU6200',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Fuentes estandarizadas con diagnóstico y LED indicador SITOP PSU6200 24V DC de 5A, 10A y 20A.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '1017342', modelo: '6EP3333-7SB00-0AX0', varianteNombre: 'MONOFÁSICA 24VDC/5A (IN: 120-240 VAC)', precio: 287.45, unidad: 'USD' },
      { codigoInterno: '1018064', modelo: '6EP3334-7SB00-3AX0', varianteNombre: 'MONOFÁSICA 24VDC/10A (IN: 120-240 VAC)', precio: 442.47, unidad: 'USD' },
      { codigoInterno: '1023247', modelo: '6EP3336-7SB00-3AX0', varianteNombre: 'MONOFÁSICA 24VDC/20A (IN: 120-240 VAC)', precio: 592.82, unidad: 'USD' },
    ],
  },

  // 9. SIEMENS - FUENTE SITOP PSU8200 & MODULOS DE SELECTIVIDAD
  {
    codigoPadre: 'SIE-SITOP-PSU8200-ACC',
    nombre: 'Fuente SITOP PSU8200 y Módulos de Selectividad PSE200U',
    marca: 'Siemens',
    categoria: 'Fuentes de Alimentación Avanzada SITOP PSU8200',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Fuentes de alimentación avanzadas SITOP PSU8200 de 20A y módulos de corte selectivo de 4 canales 4x3A para circuitos de 24VDC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '1014385', modelo: '6EP1336-3BA10', varianteNombre: 'Fuente SITOP PSU8200 MONOF, 24VDC/20A', precio: 692.53, unidad: 'USD' },
      { codigoInterno: '1015031', modelo: '6EP1961-2BA11', varianteNombre: 'MOD CORTE SELEC SITOP PSE200U, 4X3A (señal. Común)', precio: 314.72, unidad: 'USD' },
      { codigoInterno: '1018574', modelo: '6EP1961-2BA31', varianteNombre: 'MOD CORTE SELEC SITOP PSE200U, 4X3A (señal. por canal)', precio: 279.66, unidad: 'USD' },
    ],
  },

  // 10. SIEMENS - SWITCHES SCALANCE NO ADMINISTRABLES Y ADMINISTRABLES
  {
    codigoPadre: 'SIE-SCALANCE-SWITCHES',
    nombre: 'Switches Industriales SCALANCE XB000 / XC200',
    marca: 'Siemens',
    categoria: 'Switches Administrables',
    familia: 'Accesorios',
    subfamilia: 'Adaptadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Switches industriales para redes de automatización Ethernet/PROFINET no administrables (5 y 8 puertos) y administrables con puertos SFP.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '1023253', modelo: '6GK5005-0BA00-1AB2', varianteNombre: 'SCALANCE XB005, No Admin. 5 puertos RJ45', precio: 295.24, unidad: 'USD' },
      { codigoInterno: '1021259', modelo: '6GK5008-0BA10-1AB2', varianteNombre: 'SCALANCE XB008, No Admin. 8 puertos RJ45', precio: 401.96, unidad: 'USD' },
      { codigoInterno: '1023252', modelo: '6GK5206-2BS00-2AC2', varianteNombre: 'SCALANCE XC206-2SFP Admin. 6 x RJ45; 2 x SFP', precio: 2062.79, unidad: 'USD' },
    ],
  },

  // 11. SIEMENS MOTORES - IEC IE2 1800 RPM (4 POLOS)
  {
    codigoPadre: 'SIE-MOT-1LE0-1800RPM',
    nombre: 'Motor Trifásico Siemens 1LE0 IE2 1800RPM (4 Polos)',
    marca: 'Siemens',
    categoria: 'MOTORES IEC IE2 1800RPM',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Motores trifásicos de inducción estándar IEC eficiencia IE2 1800RPM (4P), multitensión 220/380/440V desde 0.75HP hasta 150HP.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1016701', modelo: '1LE0141-0DB26-4AA4-Z D80', varianteNombre: '0.75HP · 4P · 220/380/440V', precio: 194.63, unidad: 'USD' },
      { codigoInterno: '1016702', modelo: '1LE0141-0DB36-4AA4-Z D80', varianteNombre: '1HP · 4P · 220/380/440V', precio: 227.24, unidad: 'USD' },
      { codigoInterno: '1016703', modelo: '1LE0141-0EB06-4AA4-Z D80', varianteNombre: '1.5HP · 4P · 220/380/440V', precio: 257.00, unidad: 'USD' },
      { codigoInterno: '1016704', modelo: '1LE0141-0EB46-4AA4-Z D80', varianteNombre: '2HP · 4P · 220/380/440V', precio: 302.33, unidad: 'USD' },
      { codigoInterno: '1016705', modelo: '1LE0141-0EB86-4AA4-Z D80', varianteNombre: '3HP · 4P · 220/380/440V', precio: 351.66, unidad: 'USD' },
      { codigoInterno: '1016706', modelo: '1LE0141-1AB56-4AA4-Z D80', varianteNombre: '4HP · 4P · 220/380/440V', precio: 448.38, unidad: 'USD' },
      { codigoInterno: '1016707', modelo: '1LE0141-1AB86-4AA4-Z D80', varianteNombre: '5HP · 4P · 220/380/440V', precio: 517.32, unidad: 'USD' },
      { codigoInterno: '1016708', modelo: '1LE0141-1BB86-4AA4-Z D80', varianteNombre: '7.5HP · 4P · 220/380/440V', precio: 688.43, unidad: 'USD' },
      { codigoInterno: '1016709', modelo: '1LE0141-1CB26-4AA4-Z D80', varianteNombre: '10HP · 4P · 220/380/440V', precio: 829.98, unidad: 'USD' },
      { codigoInterno: '1016710', modelo: '1LE0141-1CB86-4AA4-Z D80', varianteNombre: '15HP · 4P · 220/380/440V', precio: 1091.09, unidad: 'USD' },
      { codigoInterno: '1014904', modelo: '1LE0141-1DB46-4AA4-Z D80', varianteNombre: '20HP · 4P · 220/380/440V', precio: 1957.52, unidad: 'USD' },
      { codigoInterno: '1014905', modelo: '1LE0141-1DB86-4AA4-Z D80', varianteNombre: '25HP · 4P · 220/380/440V', precio: 2049.57, unidad: 'USD' },
      { codigoInterno: '1014906', modelo: '1LE0141-1EB46-4AA4-Z D80', varianteNombre: '30HP · 4P · 220/380/440V', precio: 2470.48, unidad: 'USD' },
      { codigoInterno: '1014907', modelo: '1LE0141-2AB46-4AA4-Z D80', varianteNombre: '40HP · 4P · 220/380/440V', precio: 3807.20, unidad: 'USD' },
      { codigoInterno: '1014908', modelo: '1LE0141-2AB86-4AA4-Z D80', varianteNombre: '50HP · 4P · 220/380/440V', precio: 4462.76, unidad: 'USD' },
      { codigoInterno: '1014915', modelo: '1LE0141-2BB26-4AA4-Z D80', varianteNombre: '60HP · 4P · 220/380/440V', precio: 6017.48, unidad: 'USD' },
      { codigoInterno: '1014916', modelo: '1LE0141-2BB86-4AA4-Z D80', varianteNombre: '75HP · 4P · 220/380/440V', precio: 6367.27, unidad: 'USD' },
      { codigoInterno: '1014917', modelo: '1LE0141-2CB86-4AA4-Z D80', varianteNombre: '100HP · 4P · 220/380/440V', precio: 9463.29, unidad: 'USD' },
      { codigoInterno: '1014918', modelo: '1LE0141-2DB23-3AA4-Z D80', varianteNombre: '125HP · 4P · 440V', precio: 12499.01, unidad: 'USD' },
      { codigoInterno: '1014919', modelo: '1LE0141-2DB83-3AA4-Z D80', varianteNombre: '150HP · 4P · 440V', precio: 15534.72, unidad: 'USD' },
    ],
  },

  // 12. SIEMENS MOTORES - IEC IE2 3600 RPM (2 POLOS)
  {
    codigoPadre: 'SIE-MOT-1LE0-3600RPM',
    nombre: 'Motor Trifásico Siemens 1LE0 IE2 3600RPM (2 Polos)',
    marca: 'Siemens',
    categoria: 'MOTORES IEC IE2 3600RPM',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Motores trifásicos de inducción estándar IEC eficiencia IE2 3600RPM (2P) desde 1HP hasta 150HP.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '1016692', modelo: '1LE0141-0DA26-4AA4-Z D80', varianteNombre: '1HP · 2P · 220/380/440V', precio: 198.49, unidad: 'USD' },
      { codigoInterno: '1016693', modelo: '1LE0141-0DA36-4AA4-Z D80', varianteNombre: '1.5HP · 2P · 220/380/440V', precio: 225.02, unidad: 'USD' },
      { codigoInterno: '1016694', modelo: '1LE0141-0DA86-4AA4-Z D80', varianteNombre: '2HP · 2P · 220/380/440V', precio: 256.34, unidad: 'USD' },
      { codigoInterno: '1016695', modelo: '1LE0141-0EA46-4AA4-Z D80', varianteNombre: '3HP · 2P · 220/380/440V', precio: 383.06, unidad: 'USD' },
      { codigoInterno: '1016696', modelo: '1LE0141-0EA86-4AA4-Z D80', varianteNombre: '4HP · 2P · 220/380/440V', precio: 439.53, unidad: 'USD' },
      { codigoInterno: '1016697', modelo: '1LE0141-1AA86-4AA4-Z D80', varianteNombre: '5HP · 2P · 220/380/440V', precio: 542.41, unidad: 'USD' },
      { codigoInterno: '1016698', modelo: '1LE0141-1BA86-4AA4-Z D80', varianteNombre: '7.5HP · 2P · 220/380/440V', precio: 685.88, unidad: 'USD' },
      { codigoInterno: '1016699', modelo: '1LE0141-1CA16-4AA4-Z D80', varianteNombre: '10HP · 2P · 220/380/440V', precio: 719.04, unidad: 'USD' },
      { codigoInterno: '1016700', modelo: '1LE0141-1CA86-4AA4-Z D80', varianteNombre: '15HP · 2P · 220/380/440V', precio: 930.86, unidad: 'USD' },
      { codigoInterno: '1014920', modelo: '1LE0141-1DA36-4AA4-Z D80', varianteNombre: '20HP · 2P · 220/380/440V', precio: 1403.81, unidad: 'USD' },
      { codigoInterno: '1014921', modelo: '1LE0141-1DA46-4AA4-Z D80', varianteNombre: '25HP · 2P · 220/380/440V', precio: 1575.31, unidad: 'USD' },
      { codigoInterno: '1014922', modelo: '1LE0141-1DA86-4AA4-Z D80', varianteNombre: '30HP · 2P · 220/380/440V', precio: 2706.83, unidad: 'USD' },
      { codigoInterno: '1014923', modelo: '1LE0141-2AA46-4AA4-Z D80', varianteNombre: '40HP · 2P · 220/380/440V', precio: 3970.12, unidad: 'USD' },
      { codigoInterno: '1014924', modelo: '1LE0141-2AA56-4AA4-Z D80', varianteNombre: '50HP · 2P · 220/380/440V', precio: 5045.61, unidad: 'USD' },
      { codigoInterno: '1014925', modelo: '1LE0141-2BA26-4AA4-Z D80', varianteNombre: '60HP · 2P · 220/380/440V', precio: 5615.04, unidad: 'USD' },
      { codigoInterno: '1014926', modelo: '1LE0141-2BA86-4AA4-Z D80', varianteNombre: '75HP · 2P · 220/380/440V', precio: 6747.79, unidad: 'USD' },
      { codigoInterno: '1014927', modelo: '1LE0141-2CA86-4AA4-Z D80', varianteNombre: '100HP · 2P · 220/380/440V', precio: 9357.91, unidad: 'USD' },
      { codigoInterno: '1014928', modelo: '1LE0141-2DA23-3AA4-Z D80', varianteNombre: '125HP · 2P · 440V', precio: 9914.36, unidad: 'USD' },
      { codigoInterno: '1014929', modelo: '1LE0141-2DA83-3AA4-Z D80', varianteNombre: '150HP · 2P · 440V', precio: 12323.79, unidad: 'USD' },
    ],
  },

  // 13. SIEMENS MOTORES - BRIDAS
  {
    codigoPadre: 'SIE-BRIDAS-MOTORES',
    nombre: 'Bridas de Montaje para Motores Siemens Frame 80M a 250M',
    marca: 'Siemens',
    categoria: 'BRIDAS',
    familia: 'Accesorios',
    subfamilia: 'Adaptadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Bridas de adaptación para motores eléctricos trifásicos Siemens en tamaños de carcasa Frame 80M a 250M.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '1012728', modelo: 'LMH:101358877.1U', varianteNombre: 'BRIDA FRAME 80M', precio: 27.45, unidad: 'USD' },
      { codigoInterno: '1012729', modelo: 'LMH:101359005.1U', varianteNombre: 'BRIDA FRAME 90L', precio: 35.17, unidad: 'USD' },
      { codigoInterno: '1012730', modelo: 'LMH:101359013.1U', varianteNombre: 'BRIDA FRAME 100L', precio: 71.88, unidad: 'USD' },
      { codigoInterno: '1012731', modelo: 'LMH:101359022.1U', varianteNombre: 'BRIDA FRAME 112M', precio: 102.76, unidad: 'USD' },
      { codigoInterno: '1012734', modelo: 'LMH:101359033.1U', varianteNombre: 'BRIDA FRAME 132S', precio: 118.13, unidad: 'USD' },
      { codigoInterno: '1012735', modelo: 'LMH:101359045.1U', varianteNombre: 'BRIDA FRAME 160L', precio: 228.83, unidad: 'USD' },
      { codigoInterno: '1012736', modelo: 'LMH:101359058.1U', varianteNombre: 'BRIDA FRAME 180M', precio: 297.57, unidad: 'USD' },
      { codigoInterno: '1012737', modelo: 'LMH:101359069.1U', varianteNombre: 'BRIDA FRAME 200L', precio: 532.70, unidad: 'USD' },
      { codigoInterno: '1012738', modelo: 'LMH:101359080.1U', varianteNombre: 'BRIDA FRAME 225M', precio: 647.58, unidad: 'USD' },
      { codigoInterno: '1012739', modelo: 'LMH:101359092.1U', varianteNombre: 'BRIDA FRAME 250 M', precio: 761.90, unidad: 'USD' },
    ],
  },
];

async function main() {
  console.log('🚀 Cargando catálogo Siemens...');

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

  console.log('\n✅ Importación de Siemens completada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en script de importación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
