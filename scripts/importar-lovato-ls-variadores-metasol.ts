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
  // 1. LOVATO - EQUIPOS DE MEDICIÓN, CONTROL, REGULACIÓN Y AUTOMATIZACIÓN
  {
    codigoPadre: 'LOVATO-MEDICION-AUTOMATIZACION',
    nombre: 'Analizadores DMG, Controladores ATL, Relés de Nivel/Fase, Reguladores DCRL y Micro PLCs Lovato',
    marca: 'Lovato',
    categoria: 'ANALIZADORES Y MEDIDORES',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Equipos electrónicos Lovato Electric: analizadores de redes DMG600 a DMG900 con módulos EXP, controladores de transferencia ATL600/610, reguladores de factor de potencia DCRL5/8, relés de nivel LVM, relés de fase/tensión PMV, temporizadores TM, lámparas piloto LPMLM/LPMLB, portafusibles FB01B y Micro PLCs LRD con expansiones LRE y sondas 11SN1.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4013434', modelo: 'DMG600', varianteNombre: 'ANALIZADOR DE REDES DMG 600 96X96MM', precio: 925.76, unidad: 'PEN' },
      { codigoInterno: '4013950', modelo: 'DMG610', varianteNombre: 'ANALIZADOR DE REDES DMG 600 C/ RS-485', precio: 1205.23, unidad: 'PEN' },
      { codigoInterno: '4000066', modelo: 'DMG800', varianteNombre: 'ANALIZADOR DE REDES DMG 800 96X96MM', precio: 1986.33, unidad: 'PEN' },
      { codigoInterno: '4001822', modelo: 'DMG900', varianteNombre: 'ANALIZADOR DE REDES DMG 900 96X96MM', precio: 3505.20, unidad: 'PEN' },
      { codigoInterno: '4015434', modelo: 'EXP1002', varianteNombre: 'ENTRADAS DIGT Y 2 SALIDAS ESTÁTICAS', precio: 635.87, unidad: 'PEN' },
      { codigoInterno: '4002831', modelo: 'EXP1011', varianteNombre: 'PUERTO RS232', precio: 912.31, unidad: 'PEN' },
      { codigoInterno: '4000067', modelo: 'EXP1012', varianteNombre: 'PUERTO RS485 AISLADO', precio: 701.02, unidad: 'PEN' },
      { codigoInterno: '4010495', modelo: 'EXP1013', varianteNombre: 'PUERTO ETHERNET CON FUNCIÓN WEBSERVER', precio: 2645.01, unidad: 'PEN' },
      { codigoInterno: '4001823', modelo: 'EXP1030', varianteNombre: 'MEMORIA DATOS RELOJ CALENDARIO', precio: 1635.79, unidad: 'PEN' },
      { codigoInterno: '4015804', modelo: 'ATL600', varianteNombre: 'CONTROLADOR TRANSF 110/240VAC', precio: 2654.78, unidad: 'PEN' },
      { codigoInterno: '4013690', modelo: 'ATL610', varianteNombre: 'CONTROLADOR TRANSF 12/24VDC 110/240VAC', precio: 5500.45, unidad: 'PEN' },
      { codigoInterno: '4017562', modelo: 'LPMLM3', varianteNombre: 'LAMP PILOTO MONOB LED VERDE 230VAC', precio: 28.72, unidad: 'PEN' },
      { codigoInterno: '4017563', modelo: 'LPMLM4', varianteNombre: 'LAMP PILOTO MONOB LED ROJO 230VAC', precio: 28.72, unidad: 'PEN' },
      { codigoInterno: '4017564', modelo: 'LPMLM5', varianteNombre: 'LAMP PILOTO MONOB LED AMARILLO 230VAC', precio: 28.72, unidad: 'PEN' },
      { codigoInterno: '4020053', modelo: 'LPMLB3', varianteNombre: 'LAMP PILOTO MONOB LED VERDE 24VDC', precio: 28.72, unidad: 'PEN' },
      { codigoInterno: '4020054', modelo: 'LPMLB4', varianteNombre: 'LAMP PILOTO MONOB LED ROJO 24VDC', precio: 28.72, unidad: 'PEN' },
      { codigoInterno: '4002101', modelo: 'FB01B1P', varianteNombre: 'BASE PORTAFUSIBLE UNIPOLAR 10X38MM 690V', precio: 15.93, unidad: 'PEN' },
      { codigoInterno: '4101239', modelo: 'LVM20A240', varianteNombre: 'RELE NIVEL P LIQUIDO 220V 1NA/1NC', precio: 387.35, unidad: 'PEN' },
      { codigoInterno: '4101240', modelo: 'LVM40A240', varianteNombre: 'RELE NIVEL P LIQUIDO 220V 1NA1NC+1NA', precio: 917.82, unidad: 'PEN' },
      { codigoInterno: '4015803', modelo: 'DCRL5', varianteNombre: 'REG DE FP DE 5 PASOS EXP 7 PASOS', precio: 1255.87, unidad: 'PEN' },
      { codigoInterno: '4014179', modelo: 'DCRL8', varianteNombre: 'REG DE FP DE 8 PASOS EXP 14 PASOS', precio: 1789.81, unidad: 'PEN' },
      { codigoInterno: '4010285', modelo: 'EXP1006', varianteNombre: '2 SALIDAS DE RELÉ P/ REGULADOR FP', precio: 266.85, unidad: 'PEN' },
      { codigoInterno: '4017142', modelo: 'EXP1007', varianteNombre: '3 SALIDAS DE RELÉ P/ REGULACIÓN FP', precio: 516.49, unidad: 'PEN' },
      { codigoInterno: '4101242', modelo: 'PMV30A240', varianteNombre: 'RELE FALLA Y FASE MIN TENSION 208-240VAC', precio: 660.04, unidad: 'PEN' },
      { codigoInterno: '4101241', modelo: 'PMV40A575', varianteNombre: 'RELE SEC/FALTA DE FASE/ASIMET 380-575V', precio: 1075.47, unidad: 'PEN' },
      { codigoInterno: '4101219', modelo: 'PMV50A575', varianteNombre: 'RELE MIN Y MAX VOLT SEC Y FALTA DE FASE', precio: 1450.36, unidad: 'PEN' },
      { codigoInterno: '4008420', modelo: '11SN1', varianteNombre: 'SONDA UNIPOLAR PARA CONTROL DE LÍQUIDOS', precio: 49.18, unidad: 'PEN' },
      { codigoInterno: '4101236', modelo: 'TMP', varianteNombre: 'TEMP ON DELAY 0.1S-10MIN 24-240V', precio: 286.79, unidad: 'PEN' },
      { codigoInterno: '4101237', modelo: 'TMD', varianteNombre: 'TEMP OFF DELAY 0.06S-2MIN 24-240V', precio: 393.10, unidad: 'PEN' },
      { codigoInterno: '4101235', modelo: 'TMST', varianteNombre: 'TEMP P/Y-D 0.1S-10MIN 24-240VAC', precio: 415.00, unidad: 'PEN' },
      { codigoInterno: '4101238', modelo: 'TMM2', varianteNombre: 'TEMP MULTIF 0.1S-10MIN 12-240VAC', precio: 460.99, unidad: 'PEN' },
      { codigoInterno: '4017101', modelo: 'LRD12RD024', varianteNombre: 'PLC 24VDC 8DI 2AI 4RO', precio: 751.88, unidad: 'PEN' },
      { codigoInterno: '4017102', modelo: 'LRD20RD024', varianteNombre: 'PLC 24VDC 12DI 4AI 8RO', precio: 1135.81, unidad: 'PEN' },
      { codigoInterno: '4017103', modelo: 'LRD10RA240', varianteNombre: 'PLC 220VAC 6DI 4RO', precio: 769.82, unidad: 'PEN' },
      { codigoInterno: '4017104', modelo: 'LRD20RA240', varianteNombre: 'PLC 220VAC 12DI 8RO', precio: 1153.79, unidad: 'PEN' },
      { codigoInterno: '4017105', modelo: 'LRE08RD024', varianteNombre: 'MOD EXP 24VDC 4DI 4RO', precio: 478.45, unidad: 'PEN' },
      { codigoInterno: '4017106', modelo: 'LRE08RA240', varianteNombre: 'MOD EXP 220VAC 4DI 4RO', precio: 478.45, unidad: 'PEN' },
      { codigoInterno: '4017171', modelo: 'LRXC03', varianteNombre: 'CABLE DE CONEXIÓN USB A PLC', precio: 524.96, unidad: 'PEN' },
    ],
  },

  // 2. LS VARIADORES DE FRECUENCIA (M100, G100, H100) Y ACCESORIOS
  {
    codigoPadre: 'LS-VARIADORES-M100-G100-H100',
    nombre: 'Variadores de Frecuencia LS Series M100, G100, H100 y Accesorios',
    marca: 'LS Variadores',
    categoria: 'LS VARIADORES',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Variadores de velocidad LS Industrial Systems: M100 (220V 1F 1HP a 3HP), G100 (220V/480V 3F 1HP a 30HP Heavy Duty) y H100 (220V/480V HVAC/Bombas 7.5HP a 200HP) con teclados remotos, kits de montaje NEMA 4X y cables de comunicación.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4022705', modelo: 'LSLV0008M100-1EOFNS', varianteNombre: 'DRIVE M100 220V 1HP 4.2A', precio: 727.11, unidad: 'PEN' },
      { codigoInterno: '4022707', modelo: 'LSLV0015M100-1EOFNS', varianteNombre: 'DRIVE M100 220V 2HP 7.5A', precio: 860.79, unidad: 'PEN' },
      { codigoInterno: '4022708', modelo: 'LSLV0022M100-1EOFNS', varianteNombre: 'DRIVE M100 220V 3HP 10A', precio: 937.83, unidad: 'PEN' },
      { codigoInterno: '4106127', modelo: 'INV REMOTE 3M (LSLV-M100)', varianteNombre: 'Operator + 3m remote cable M100', precio: 171.00, unidad: 'PEN' },
      { codigoInterno: '4022015', modelo: 'LSLV0008G100-2EONN', varianteNombre: 'DRIVE G100 220V 1HP 5A HD', precio: 1162.39, unidad: 'PEN' },
      { codigoInterno: '4021651', modelo: 'LSLV0015G100-2EONN', varianteNombre: 'DRIVE G100 220V 2HP 8A HD', precio: 1247.86, unidad: 'PEN' },
      { codigoInterno: '4021652', modelo: 'LSLV0022G100-2EONN', varianteNombre: 'DRIVE G100 220V 3HP 11A HD', precio: 1487.18, unidad: 'PEN' },
      { codigoInterno: '4021653', modelo: 'LSLV0040G100-2EONN', varianteNombre: 'DRIVE G100 220V 5.4HP 17A HD', precio: 1641.03, unidad: 'PEN' },
      { codigoInterno: '4022110', modelo: 'LSLV0055G100-2EONN', varianteNombre: 'DRIVE G100 220V 7.5HP 24A HD', precio: 2478.63, unidad: 'PEN' },
      { codigoInterno: '4022111', modelo: 'LSLV0075G100-2EONN', varianteNombre: 'DRIVE G100 220V 10HP 32A HD', precio: 3162.39, unidad: 'PEN' },
      { codigoInterno: '4022475', modelo: 'INV,LSLV0110G100-2EONN', varianteNombre: 'DRIVE G100 220V 15HP 47A', precio: 4729.91, unidad: 'PEN' },
      { codigoInterno: '4022476', modelo: 'INV,LSLV0150G100-2EONN', varianteNombre: 'DRIVE G100 220V 20HP 60A', precio: 5288.89, unidad: 'PEN' },
      { codigoInterno: '4022477', modelo: 'INV,LSLV0185G100-2EONN', varianteNombre: 'DRIVE G100 220V 25HP 75A', precio: 6319.66, unidad: 'PEN' },
      { codigoInterno: '4022478', modelo: 'INV,LSLV0220G100-2EONN', varianteNombre: 'DRIVE G100 220V 30HP 88A', precio: 7560.68, unidad: 'PEN' },
      { codigoInterno: '4022112', modelo: 'LSLV0008G100-4EONN', varianteNombre: 'DRIVE G100 480V 1HP 2.5A HD', precio: 1299.15, unidad: 'PEN' },
      { codigoInterno: '4022113', modelo: 'LSLV0015G100-4EONN', varianteNombre: 'DRIVE G100 480V 2HP 4A HD', precio: 1572.65, unidad: 'PEN' },
      { codigoInterno: '4022114', modelo: 'LSLV0022G100-4EONN', varianteNombre: 'DRIVE G100 480V 3HP 5.5A HD', precio: 1692.31, unidad: 'PEN' },
      { codigoInterno: '4022115', modelo: 'LSLV0040G100-4EONN', varianteNombre: 'DRIVE G100 480V 5.4HP 9A HD', precio: 1965.81, unidad: 'PEN' },
      { codigoInterno: '4022116', modelo: 'LSLV0055G100-4EONN', varianteNombre: 'DRIVE G100 480V 7.5HP 12A HD', precio: 2478.63, unidad: 'PEN' },
      { codigoInterno: '4022117', modelo: 'LSLV0075G100-4EONN', varianteNombre: 'DRIVE G100 480V 10HP 16A HD', precio: 2735.04, unidad: 'PEN' },
      { codigoInterno: '4022479', modelo: 'INV,LSLV0110G100-4EONN', varianteNombre: 'DRIVE G100 480V 15HP 24A', precio: 3931.62, unidad: 'PEN' },
      { codigoInterno: '4022480', modelo: 'INV,LSLV0150G100-4EONN', varianteNombre: 'DRIVE G100 480V 20HP 31A', precio: 4752.14, unidad: 'PEN' },
      { codigoInterno: '4022481', modelo: 'INV,LSLV0185G100-4EONN', varianteNombre: 'DRIVE G100 480V 25HP 39A', precio: 5811.97, unidad: 'PEN' },
      { codigoInterno: '4022482', modelo: 'INV,LSLV0220G100-4EONN', varianteNombre: 'DRIVE G100 480V 30HP 45A', precio: 7076.92, unidad: 'PEN' },
      { codigoInterno: '4021654', modelo: 'REMOTE 3M (LSLV-G100)', varianteNombre: 'PANEL REMOTO G100 + CABLE 3M', precio: 171.00, unidad: 'PEN' },
      { codigoInterno: '4018528', modelo: 'LSLV0055H100-2CONN', varianteNombre: 'DRIVE H100 220V 7.5HP 22A', precio: 3882.60, unidad: 'PEN' },
      { codigoInterno: '4017682', modelo: 'LSLV0075H100-2CONN', varianteNombre: 'DRIVE H100 220V 10HP 30A', precio: 4816.16, unidad: 'PEN' },
      { codigoInterno: '4017298', modelo: 'LSLV0185H100-2CONN', varianteNombre: 'DRIVE H100 220V 25HP 69A', precio: 6836.57, unidad: 'PEN' },
      { codigoInterno: '4017299', modelo: 'LSLV0110H100-4COFN', varianteNombre: 'DRIVE H100 480V 15HP 24A EMC', precio: 5091.17, unidad: 'PEN' },
      { codigoInterno: '4017300', modelo: 'LSLV0150H100-4COFN', varianteNombre: 'DRIVE H100 480V 20HP 30A EMC', precio: 6553.02, unidad: 'PEN' },
      { codigoInterno: '4017301', modelo: 'LSLV0185H100-4COFN', varianteNombre: 'DRIVE H100 480V 25HP 38A EMC', precio: 7591.53, unidad: 'PEN' },
      { codigoInterno: '4017302', modelo: 'LSLV0220H100-4COFN', varianteNombre: 'DRIVE H100 480V 30HP 45A EMC', precio: 9219.83, unidad: 'PEN' },
      { codigoInterno: '4017303', modelo: 'LSLV0300H100-4COFN', varianteNombre: 'DRIVE H100 480V 40HP 61A EMC', precio: 9401.71, unidad: 'PEN' },
      { codigoInterno: '4017304', modelo: 'LSLV0370H100-4COND', varianteNombre: 'DRIVE H100 480V 50HP 75A DCR', precio: 11538.46, unidad: 'PEN' },
      { codigoInterno: '4017305', modelo: 'LSLV0450H100-4COND', varianteNombre: 'DRIVE H100 480V 60HP 91A DCR', precio: 13760.68, unidad: 'PEN' },
      { codigoInterno: '4017306', modelo: 'LSLV0550H100-4COND', varianteNombre: 'DRIVE H100 480V 75HP 107A DCR', precio: 16068.38, unidad: 'PEN' },
      { codigoInterno: '4018529', modelo: 'LSLV0750H100-4COFD', varianteNombre: 'DRIVE H100 480V 100HP 142A EMC DCR', precio: 22222.22, unidad: 'PEN' },
      { codigoInterno: '4018530', modelo: 'LSLV0900H100-4COFD', varianteNombre: 'DRIVE H100 480V 125HP 169A EMC DCR', precio: 23931.62, unidad: 'PEN' },
      { codigoInterno: '4018531', modelo: 'LSLV1100H100-4COFD', varianteNombre: 'DRIVE H100 480V 150HP 223A EMC DCR', precio: 30256.41, unidad: 'PEN' },
      { codigoInterno: '4018532', modelo: 'LSLV1320H100-4COFD', varianteNombre: 'DRIVE H100 480V 200HP 264A EMC DCR', precio: 31623.93, unidad: 'PEN' },
      { codigoInterno: '4001389', modelo: 'INV,IS7 REMOTE CABLE(3M)', varianteNombre: 'KIT MARCO H100 / IS7 + CABLE 3M', precio: 131.00, unidad: 'PEN' },
      { codigoInterno: '4017307', modelo: 'LM-S7M1', varianteNombre: 'KIT MARCO NEMA 4X IP66 IS7 H100', precio: 452.00, unidad: 'PEN' },
      { codigoInterno: '4017308', modelo: 'USB-301A', varianteNombre: 'CABLE USB PARA H100 3M', precio: 90.48, unidad: 'PEN' },
    ],
  },

  // 3. LS PROTECCIÓN Y CONTROL - INTERRUPTORES DE RIEL BKJ / BKH Y METASOL ABN / ABS
  {
    codigoPadre: 'LS-RIEL-BKJ-BKH-METASOL-ABN-ABS',
    nombre: 'Interruptores de Riel BKJ/BKH, Diferenciales RKJ/RKN y Caja Moldeada Metasol ABN/ABS LS',
    marca: 'LS Protección y Control',
    categoria: 'INTERRUPTORES DE RIEL (1 POLO) BKJ',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptores din en miniatura BKJ (6kA 1P-4P) y BKH (15kA 2P-3P 80A-125A), interruptores diferenciales RKN/RKJ (Tipo AC, Tipo A y Tipo B), e interruptores de caja moldeada Metasol ABN (fijos 15A-250A) y ABS (regulables 16A-250A en 50kA-85kA) con accesorios (AX, AL, SHT, UVT, HL y aisladores IB).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4021967', modelo: 'BKJ 1P C1', varianteNombre: 'BKJ 1X1A 6KA/415V', precio: 32.94, unidad: 'PEN' },
      { codigoInterno: '4021968', modelo: 'BKJ 1P C2', varianteNombre: 'BKJ 1X2A 6KA/415V', precio: 32.94, unidad: 'PEN' },
      { codigoInterno: '4021969', modelo: 'BKJ 1P C4', varianteNombre: 'BKJ 1X4A 6KA/415V', precio: 32.94, unidad: 'PEN' },
      { codigoInterno: '4021970', modelo: 'BKJ 1P C6', varianteNombre: 'BKJ 1X6A 6KA/415V', precio: 27.68, unidad: 'PEN' },
      { codigoInterno: '4021971', modelo: 'BKJ 1P C10', varianteNombre: 'BKJ 1X10A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021972', modelo: 'BKJ 1P C16', varianteNombre: 'BKJ 1X16A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021973', modelo: 'BKJ 1P C20', varianteNombre: 'BKJ 1X20A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021974', modelo: 'BKJ 1P C25', varianteNombre: 'BKJ 1X25A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021976', modelo: 'BKJ 1P C32', varianteNombre: 'BKJ 1X32A 6KA/415V', precio: 20.76, unidad: 'PEN' },
      { codigoInterno: '4021977', modelo: 'BKJ 1P C40', varianteNombre: 'BKJ 1X40A 6KA/415V', precio: 24.21, unidad: 'PEN' },
      { codigoInterno: '4021978', modelo: 'BKJ 1P C50', varianteNombre: 'BKJ 1X50A 6KA/415V', precio: 29.39, unidad: 'PEN' },
      { codigoInterno: '4021979', modelo: 'BKJ 2P C2', varianteNombre: 'BKJ 2X2A 6KA/415V', precio: 70.64, unidad: 'PEN' },
      { codigoInterno: '4021981', modelo: 'BKJ 2P C4', varianteNombre: 'BKJ 2X4A 6KA/415V', precio: 70.64, unidad: 'PEN' },
      { codigoInterno: '4021982', modelo: 'BKJ 2P C6', varianteNombre: 'BKJ 2X6A 6KA/415V', precio: 53.82, unidad: 'PEN' },
      { codigoInterno: '4021983', modelo: 'BKJ 2P C10', varianteNombre: 'BKJ 2X10A 6KA/415V', precio: 35.98, unidad: 'PEN' },
      { codigoInterno: '4021984', modelo: 'BKJ 2P C16', varianteNombre: 'BKJ 2X16A 6KA/415V', precio: 34.56, unidad: 'PEN' },
      { codigoInterno: '4021985', modelo: 'BKJ 2P C20', varianteNombre: 'BKJ 2X20A 6KA/415V', precio: 34.56, unidad: 'PEN' },
      { codigoInterno: '4021986', modelo: 'BKJ 2P C25', varianteNombre: 'BKJ 2X25A 6KA/415V', precio: 34.56, unidad: 'PEN' },
      { codigoInterno: '4021987', modelo: 'BKJ 2P C32', varianteNombre: 'BKJ 2X32A 6KA/415V', precio: 34.56, unidad: 'PEN' },
      { codigoInterno: '4021988', modelo: 'BKJ 2P C40', varianteNombre: 'BKJ 2X40A 6KA/415V', precio: 41.53, unidad: 'PEN' },
      { codigoInterno: '4021989', modelo: 'BKJ 2P C50', varianteNombre: 'BKJ 2X50A 6KA/415V', precio: 48.46, unidad: 'PEN' },
      { codigoInterno: '4021990', modelo: 'BKJ 2P C63', varianteNombre: 'BKJ 2X63A 6KA/415V', precio: 60.59, unidad: 'PEN' },
      { codigoInterno: '4101500', modelo: 'BKH 2P C 80A', varianteNombre: 'BKH 2X80A 15KA/415V', precio: 291.05, unidad: 'PEN' },
      { codigoInterno: '4101501', modelo: 'BKH 2P C 100A', varianteNombre: 'BKH 2X100A 15KA/415V', precio: 300.10, unidad: 'PEN' },
      { codigoInterno: '4101502', modelo: 'BKH 2P C 125A', varianteNombre: 'BKH 2X125A 15KA/415V', precio: 308.18, unidad: 'PEN' },
      { codigoInterno: '4021991', modelo: 'BKJ 3P C2', varianteNombre: 'BKJ 3X2A 6KA/415V', precio: 121.31, unidad: 'PEN' },
      { codigoInterno: '4021992', modelo: 'BKJ 3P C4', varianteNombre: 'BKJ 3X4A 6KA/415V', precio: 124.51, unidad: 'PEN' },
      { codigoInterno: '4021993', modelo: 'BKJ 3P C6', varianteNombre: 'BKJ 3X6A 6KA/415V', precio: 108.95, unidad: 'PEN' },
      { codigoInterno: '4021994', modelo: 'BKJ 3P C10', varianteNombre: 'BKJ 3X10A 6KA/415V', precio: 81.29, unidad: 'PEN' },
      { codigoInterno: '4021995', modelo: 'BKJ 3P C16', varianteNombre: 'BKJ 3X16A 6KA/415V', precio: 81.49, unidad: 'PEN' },
      { codigoInterno: '4021996', modelo: 'BKJ 3P C20', varianteNombre: 'BKJ 3X20A 6KA/415V', precio: 81.49, unidad: 'PEN' },
      { codigoInterno: '4021997', modelo: 'BKJ 3P C25', varianteNombre: 'BKJ 3X25A 6KA/415V', precio: 81.49, unidad: 'PEN' },
      { codigoInterno: '4021998', modelo: 'BKJ 3P C32', varianteNombre: 'BKJ 3X32A 6KA/415V', precio: 86.68, unidad: 'PEN' },
      { codigoInterno: '4021999', modelo: 'BKJ 3P C40', varianteNombre: 'BKJ 3X40A 6KA/415V', precio: 90.11, unidad: 'PEN' },
      { codigoInterno: '4022000', modelo: 'BKJ 3P C50', varianteNombre: 'BKJ 3X50A 6KA/415V', precio: 107.45, unidad: 'PEN' },
      { codigoInterno: '4022001', modelo: 'BKJ 3P C63', varianteNombre: 'BKJ 3X63A 6KA/415V', precio: 119.64, unidad: 'PEN' },
      { codigoInterno: '4101503', modelo: 'BKH 3P C 80A', varianteNombre: 'BKH 3X80A 15KA/415V', precio: 424.49, unidad: 'PEN' },
      { codigoInterno: '4101504', modelo: 'BKH 3P C 100A', varianteNombre: 'BKH 3X100A 15KA/415V', precio: 428.87, unidad: 'PEN' },
      { codigoInterno: '4101505', modelo: 'BKH 3P C 125A', varianteNombre: 'BKH 3X125A 15KA/415V', precio: 459.14, unidad: 'PEN' },
      { codigoInterno: '4023672', modelo: 'BKJ 4P C32', varianteNombre: 'BKJ 4X32A 6KA/415V', precio: 119.12, unidad: 'PEN' },
      { codigoInterno: '4023673', modelo: 'BKJ 4P C40', varianteNombre: 'BKJ 4X40A 6KA/415V', precio: 127.63, unidad: 'PEN' },
      { codigoInterno: '4023674', modelo: 'BKJ 4P C63', varianteNombre: 'BKJ 4X63A 6KA/415V', precio: 158.86, unidad: 'PEN' },
      { codigoInterno: '4023697', modelo: 'RKJ63HD-B 63 4P-B/30MA', varianteNombre: 'DIFERENCIAL RKJ-B 4X63 30MA TIPO B', precio: 2040.48, unidad: 'PEN' },
      { codigoInterno: '4101469', modelo: 'RKN-25-2 / 30mA', varianteNombre: 'DIFERENCIAL RKN 2X25A 30MA', precio: 113.27, unidad: 'PEN' },
      { codigoInterno: '4101470', modelo: 'RKN-40-2 / 30mA', varianteNombre: 'DIFERENCIAL RKN 2X40A 30MA', precio: 118.69, unidad: 'PEN' },
      { codigoInterno: '4101471', modelo: 'RKN-63-2 / 30mA', varianteNombre: 'DIFERENCIAL RKN 2X63A 30MA', precio: 156.37, unidad: 'PEN' },
      { codigoInterno: '4101472', modelo: 'RKN-25-4 / 30mA', varianteNombre: 'DIFERENCIAL RKN 4X25A 30MA', precio: 185.17, unidad: 'PEN' },
      { codigoInterno: '4101473', modelo: 'RKN-40-4 / 30mA', varianteNombre: 'DIFERENCIAL RKN 4X40A 30MA', precio: 190.85, unidad: 'PEN' },
      { codigoInterno: '4101474', modelo: 'RKN-63-4 / 30mA', varianteNombre: 'DIFERENCIAL RKN 4X63A 30MA', precio: 304.50, unidad: 'PEN' },
      { codigoInterno: '4007277', modelo: 'RKN-b-25-2 / 30mA - A', varianteNombre: 'DIFERENCIAL INMUNIZADO RKN-B 2X25A 30MA TIPO A', precio: 165.35, unidad: 'PEN' },
      { codigoInterno: '4007278', modelo: 'RKN-b-40-2 / 30mA - A', varianteNombre: 'DIFERENCIAL INMUNIZADO RKN-B 2X40A 30MA TIPO A', precio: 165.35, unidad: 'PEN' },
      { codigoInterno: '4007279', modelo: 'RKN-b-63-2 / 30mA - A', varianteNombre: 'DIFERENCIAL INMUNIZADO RKN-B 2X63A 30MA TIPO A', precio: 214.72, unidad: 'PEN' },
      { codigoInterno: '4007280', modelo: 'RKN-b-25-4 / 30mA - A', varianteNombre: 'DIFERENCIAL INMUNIZADO RKN-B 4X25A 30MA TIPO A', precio: 282.52, unidad: 'PEN' },
      { codigoInterno: '4007281', modelo: 'RKN-b-40-4 / 30mA - A', varianteNombre: 'DIFERENCIAL INMUNIZADO RKN-B 4X40A 30MA TIPO A', precio: 282.52, unidad: 'PEN' },
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
  console.log('🚀 Cargando lote Lovato, LS Variadores y LS Riel/Metasol...');

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

  console.log('\n✅ Importación completada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en script de importación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
