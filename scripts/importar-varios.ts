import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA FINAL - CROUSE HINDS, DUPRO, EUROMOLD, ERICO, E-SAFE, INTELLI
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

const GRUPOS_VARIOS: GrupoProductoPadre[] = [
  // -----------------------------------------------------------------------
  // CROUSE HINDS
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'CH-INTERRUPTOR-AFU',
    nombre: 'Interruptor AFU para Control de Faja',
    marca: 'Crouse Hinds',
    categoria: 'Aparatos Anti-explosión y Control',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Interruptores y Control Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Interruptor de emergencia accionado por cable o tracción de faja transportadora para zonas clasificadas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008702', modelo: 'AFU0333 05', varianteNombre: '1S1 Derecho 15 Lbs', precio: 335.00 },
      { codigoInterno: '4008703', modelo: 'AFU0333 50', varianteNombre: '1S1 Izquierdo 15 Lbs', precio: 335.00 },
      { codigoInterno: '4008704', modelo: 'AFU0333 55', varianteNombre: 'Control Doble Faja 15 Lbs', precio: 1480.00 },
    ],
  },
  {
    codigoPadre: 'CH-ENCHUFE-APJ',
    nombre: 'Enchufe Industrial Arktite APJ Style 2 NEMA 4',
    marca: 'Crouse Hinds',
    categoria: 'Enchufes y Tomacorrientes Industriales',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Arktite NEMA 4',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Clavija / Enchufe industrial estanque Arktite de aluminio resistente a la corrosión NEMA 4 / 4X.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007442', modelo: 'APJ3485', varianteNombre: '3x30A+T 3W4P 600V NEMA 4', precio: 240.00 },
      { codigoInterno: '4007444', modelo: 'APJ6485', varianteNombre: '3x60A+T 3W4P 600V NEMA 4', precio: 350.00 },
      { codigoInterno: '4007446', modelo: 'APJ10487', varianteNombre: '3x100A+T 3W4P 600V NEMA 4', precio: 420.00 },
    ],
  },
  {
    codigoPadre: 'CH-TOMA-AR',
    nombre: 'Tomacorriente para Empotrar Arktite AR NEMA 4',
    marca: 'Crouse Hinds',
    categoria: 'Enchufes y Tomacorrientes Industriales',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Arktite NEMA 4',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Receptáculo / Tomacorriente hembra empotrable de aluminio serie Arktite para trabajo pesado.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007443', modelo: 'AR342', varianteNombre: '3x30A+T 3W4P 600V NEMA 4', precio: 180.00 },
      { codigoInterno: '4007445', modelo: 'AR642', varianteNombre: '3x60A+T 3W4P 600V NEMA 4', precio: 260.00 },
      { codigoInterno: '4007447', modelo: 'AR1042', varianteNombre: '3x100A+T 3W4P 600V NEMA 4', precio: 230.00 },
    ],
  },
  {
    codigoPadre: 'CH-CES-TOMACORRIENTE',
    nombre: 'Tomacorriente CES / CESD Explosion Proof',
    marca: 'Crouse Hinds',
    categoria: 'Aparatos Anti-explosión y Control',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Interruptores y Control Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tomacorriente a prueba de explosión serie CES / CESD con cortacircuito para áreas peligrosas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008682', modelo: 'CESD2214', varianteNombre: '30A 120-240V 3W4P 1H 3/4"', precio: 610.00 },
      { codigoInterno: '4008684', modelo: 'CES4234', varianteNombre: '60A 120-240V 3W4P 3H 1 1/4"', precio: 670.00 },
      { codigoInterno: '4008685', modelo: 'CESD4234', varianteNombre: '60A 120-240V 3W4P 1H 1 1/4"', precio: 670.00 },
    ],
  },
  {
    codigoPadre: 'CH-CPH-ENCHUFE',
    nombre: 'Enchufe CPH para Receptáculo CES / CESD Explosion Proof',
    marca: 'Crouse Hinds',
    categoria: 'Aparatos Anti-explosión y Control',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Interruptores y Control Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Clavija / Enchufe de seguridad CPH anti-chispa para tomacorrientes CES/CESD.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008683', modelo: 'CPH7914', varianteNombre: '30A 120-240V 3W4P', precio: 360.00 },
      { codigoInterno: '4008686', modelo: 'CPH7934', varianteNombre: '60A 120-240V 3W4P', precio: 360.00 },
    ],
  },
  {
    codigoPadre: 'CH-CHICO-COMPUESTOS',
    nombre: 'Compuesto Sellante y Fibra de Retención Chico',
    marca: 'Crouse Hinds',
    categoria: 'Selladores y Masillas Anti-explosión',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Selladores y Masillas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Compuesto sellante de fraguado rápido Chico A y fibra de relleno Chico X para sellos EYS en áreas explosion proof.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007393', modelo: 'CHICO A4', varianteNombre: 'Sellante Chico A 1 lb', precio: 26.00 },
      { codigoInterno: '4007394', modelo: 'CHICO A05', varianteNombre: 'Sellante Chico A 5 lb', precio: 50.00 },
      { codigoInterno: '4007395', modelo: 'CHICO X6', varianteNombre: 'Fibra Chico X 8 oz', precio: 82.00 },
      { codigoInterno: '4007396', modelo: 'CHICO X7', varianteNombre: 'Fibra Chico X 1 lb', precio: 108.00 },
    ],
  },
  {
    codigoPadre: 'CH-DSD-CUBIERTAS',
    nombre: 'Cubierta con Estación de Control Serie DSD',
    marca: 'Crouse Hinds',
    categoria: 'Aparatos Anti-explosión y Control',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Interruptores y Control Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cubierta frontal con botonera / selector / parada de emergencia para cajas de control EDS explosion proof.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008693', modelo: 'DSD926 SA HN OF AU', varianteNombre: 'Selector 3Pos MAN-OFF-AUTO', precio: 278.00 },
      { codigoInterno: '4008694', modelo: 'DSD918 S769 EM-SP', varianteNombre: 'Pulsador de Emergencia Hongo', precio: 500.00 },
      { codigoInterno: '4008692', modelo: 'DSD922', varianteNombre: 'Botón Doble START-STOP', precio: 500.00 },
    ],
  },
  {
    codigoPadre: 'CH-DRENADOR-ECD',
    nombre: 'Drenador Purga Universal ECD 1/2"',
    marca: 'Crouse Hinds',
    categoria: 'Accesorios Conduit Explosion Proof',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Accesorios y Drenes Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Dren / Respiradero automático de condensación de 1/2" en acero para cajas explosion proof.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008691', modelo: 'ECD15', varianteNombre: 'Drenador Universal 1/2" NPT', precio: 50.00 },
    ],
  },
  {
    codigoPadre: 'CH-ECGJH-TUBERIA-FLEX',
    nombre: 'Tubería Flexible Flexible Anti-explosión ECGJH con Malla Inox',
    marca: 'Crouse Hinds',
    categoria: 'Tuberías y Conexiones Flexibles Especiales',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería Flexible Anti-explosión',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Acoplamiento flexible de acero inoxidable con trenzado exterior para vibraciones o desalineaciones en áreas explosivas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007424', modelo: 'ECGJH112', varianteNombre: 'Diámetro 1/2" x 12" (350mm)', precio: 180.00 },
      { codigoInterno: '4008666', modelo: 'ECGJH136', varianteNombre: 'Diámetro 1/2" x 36" (914mm)', precio: 185.00 },
      { codigoInterno: '4007425', modelo: 'ECGJH115', varianteNombre: 'Diámetro 1/2" x 15" (380mm)', precio: 220.00 },
      { codigoInterno: '4007426', modelo: 'ECGJH118', varianteNombre: 'Diámetro 1/2" x 18" (457mm)', precio: 275.00 },
      { codigoInterno: '4008667', modelo: 'ECGJH236', varianteNombre: 'Diámetro 3/4" x 36" (914mm)', precio: 280.00 },
      { codigoInterno: '4011622', modelo: 'ECGJH212', varianteNombre: 'Diámetro 3/4" x 12" (304mm)', precio: 290.00 },
      { codigoInterno: '4007432', modelo: 'ECGJH318', varianteNombre: 'Diámetro 1" x 18" (457mm)', precio: 300.00 },
      { codigoInterno: '4007427', modelo: 'ECGJH215', varianteNombre: 'Diámetro 3/4" x 15" (380mm)', precio: 360.00 },
      { codigoInterno: '4007428', modelo: 'ECGJH218', varianteNombre: 'Diámetro 3/4" x 18" (457mm)', precio: 365.00 },
      { codigoInterno: '4007429', modelo: 'ECGJH221', varianteNombre: 'Diámetro 3/4" x 21" (533mm)', precio: 390.00 },
      { codigoInterno: '4008668', modelo: 'ECGJH224', varianteNombre: 'Diámetro 3/4" x 24" (610mm)', precio: 430.00 },
      { codigoInterno: '4011140', modelo: 'ECGJH518', varianteNombre: 'Diámetro 1 1/2" x 18" (457mm)', precio: 550.00 },
      { codigoInterno: '4007430', modelo: 'ECGJH230', varianteNombre: 'Diámetro 3/4" x 30" (762mm)', precio: 560.00 },
      { codigoInterno: '4011141', modelo: 'ECGJH521', varianteNombre: 'Diámetro 1 1/2" x 21" (533mm)', precio: 610.00 },
      { codigoInterno: '4011142', modelo: 'ECGJH618', varianteNombre: 'Diámetro 2" x 18" (457mm)', precio: 1110.00 },
    ],
  },
  {
    codigoPadre: 'CH-EDS-CUERPOS',
    nombre: 'Cuerpo de Caja para Botonera Serie EDS / EDSC',
    marca: 'Crouse Hinds',
    categoria: 'Aparatos Anti-explosión y Control',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Interruptores y Control Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cuerpo de fundición de aluminio para estaciones de control serie EDS / EDSC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008680', modelo: 'EDS271 SA', varianteNombre: '1 Caja 1 Hub 3/4" Aluminio', precio: 67.00 },
      { codigoInterno: '4008699', modelo: 'EDSC271 SA', varianteNombre: '1 Caja 2 Hubs 3/4" Aluminio', precio: 70.00 },
      { codigoInterno: '4008700', modelo: 'EDSC272 SA', varianteNombre: '2 Cajas 2 Hubs 3/4" Aluminio', precio: 70.00 },
    ],
  },
  {
    codigoPadre: 'CH-EL-CODO-90',
    nombre: 'Codo 90° Hembra/Hembra NPT Serie EL',
    marca: 'Crouse Hinds',
    categoria: 'Accesorios Conduit Explosion Proof',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Accesorios y Drenes Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Codo de hierro maleable a 90° rosca hembra NPT clase 1 div 1 para tubería conduit rígida.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007397', modelo: 'EL19', varianteNombre: 'Diámetro 1/2" H/H', precio: 70.00 },
      { codigoInterno: '4007398', modelo: 'EL29', varianteNombre: 'Diámetro 3/4" H/H', precio: 70.00 },
      { codigoInterno: '4007399', modelo: 'EL39', varianteNombre: 'Diámetro 1" H/H', precio: 70.00 },
      { codigoInterno: '4011144', modelo: 'EL59', varianteNombre: 'Diámetro 1 1/2" H/H', precio: 90.00 },
      { codigoInterno: '4011145', modelo: 'EL69', varianteNombre: 'Diámetro 2" H/H', precio: 100.00 },
    ],
  },
  {
    codigoPadre: 'CH-ENP-ENCHUFE',
    nombre: 'Enchufe de Seguridad NEMA Serie ENP',
    marca: 'Crouse Hinds',
    categoria: 'Enchufes y Tomacorrientes Industriales',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Arktite NEMA 4',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Clavija macho serie ENP para áreas hospitalarias o peligrosas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008676', modelo: 'ENP5201', varianteNombre: '20A 125V NEMA 5-20P', precio: 128.00 },
      { codigoInterno: '4007448', modelo: 'ENP6202', varianteNombre: '20A 250V NEMA 6-20P', precio: 132.00 },
    ],
  },
  {
    codigoPadre: 'CH-ENR-TOMACORRIENTE',
    nombre: 'Tomacorriente Serie ENR NEMA (Empotrar / Adosar)',
    marca: 'Crouse Hinds',
    categoria: 'Enchufes y Tomacorrientes Industriales',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Conectores Arktite NEMA 4',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tomacorriente hembra anti-chispa serie ENR para adosar o empotrar en zonas clasificadas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008679', modelo: 'ENR6202', varianteNombre: 'Empotrar 20A 250V NEMA 6-20R', precio: 215.00 },
      { codigoInterno: '4008678', modelo: 'ENR5201', varianteNombre: 'Empotrar 20A 125V NEMA 5-20R', precio: 220.00 },
      { codigoInterno: '4008677', modelo: 'ENR21201', varianteNombre: 'Adosar 20A 125V NEMA 5-20R 3/4"', precio: 380.00 },
      { codigoInterno: '4007449', modelo: 'ENR21202', varianteNombre: 'Adosar 20A 250V NEMA 6-20R 3/4"', precio: 540.00 },
    ],
  },
  {
    codigoPadre: 'CH-EYS-SELLADOR',
    nombre: 'Conector Sellador Universal Horizontal/Vertical EYS NPT',
    marca: 'Crouse Hinds',
    categoria: 'Selladores y Masillas Anti-explosión',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Selladores y Masillas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Sello cortafuego anti-explosión vertical / horizontal en hierro maleable roscado H/M para sellado de tubería conduit.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007433', modelo: 'EYS116', varianteNombre: 'Diámetro 1/2" H/M', precio: 26.00 },
      { codigoInterno: '4007434', modelo: 'EYS216', varianteNombre: 'Diámetro 3/4" H/M', precio: 28.00 },
      { codigoInterno: '4007435', modelo: 'EYS316', varianteNombre: 'Diámetro 1" H/M', precio: 46.00 },
      { codigoInterno: '4007436', modelo: 'EYS56', varianteNombre: 'Diámetro 1 1/2" H/M', precio: 82.00 },
      { codigoInterno: '4007437', modelo: 'EYS66', varianteNombre: 'Diámetro 2" H/M', precio: 140.00 },
      { codigoInterno: '4008663', modelo: 'EYS86', varianteNombre: 'Diámetro 3" H/M', precio: 160.00 },
    ],
  },
  {
    codigoPadre: 'CH-FSQC-TOMACORRIENTE',
    nombre: 'Tomacorriente FSQC Interlocked Class 1 Div 1',
    marca: 'Crouse Hinds',
    categoria: 'Aparatos Anti-explosión y Control',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Interruptores y Control Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tomacorriente con interruptor enclavado de seguridad FSQC a prueba de explosión.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008673', modelo: 'FSQC2430', varianteNombre: '3W4P 30A 3/4" CL1DIV1', precio: 580.00 },
      { codigoInterno: '4008674', modelo: 'FSQC3430', varianteNombre: '3W4P 30A 1" CL1DIV1', precio: 600.00 },
      { codigoInterno: '4008675', modelo: 'FSQC5640', varianteNombre: '3W4P 60A 1 1/2" CL1DIV1', precio: 650.00 },
    ],
  },
  {
    codigoPadre: 'CH-GUA-CAJAS-REDONDAS',
    nombre: 'Caja de Derivación Redonda con Tapa Roscada Serie GUA (GUA/GUAB/GUAC/GUAL/GUAT/GUAX)',
    marca: 'Crouse Hinds',
    categoria: 'Cajas y Condulets Heavy Duty',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Condulets Heavy Duty HDG',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Caja de empalme / derivación circular en hierro maleable con tapa roscada para áreas clasificadas explosion proof.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007387', modelo: 'GUAB16', varianteNombre: 'Tipo LB 1/2"', precio: 56.65 },
      { codigoInterno: '4007372', modelo: 'GUAC16', varianteNombre: 'Tipo C 1/2"', precio: 60.00 },
      { codigoInterno: '4007377', modelo: 'GUAL16', varianteNombre: 'Tipo L 1/2"', precio: 70.00 },
      { codigoInterno: '4007378', modelo: 'GUAL26', varianteNombre: 'Tipo L 3/4"', precio: 70.00 },
      { codigoInterno: '4007382', modelo: 'GUAT16', varianteNombre: 'Tipo T 1/2"', precio: 70.00 },
      { codigoInterno: '4007383', modelo: 'GUAT26', varianteNombre: 'Tipo T 3/4"', precio: 70.00 },
      { codigoInterno: '4007373', modelo: 'GUAC26', varianteNombre: 'Tipo C 3/4"', precio: 70.04 },
      { codigoInterno: '4007388', modelo: 'GUAB26', varianteNombre: 'Tipo LB 3/4"', precio: 72.10 },
      { codigoInterno: '4007390', modelo: 'GUAX16', varianteNombre: 'Tipo X 1/2"', precio: 75.00 },
      { codigoInterno: '4007391', modelo: 'GUAX26', varianteNombre: 'Tipo X 3/4"', precio: 75.00 },
      { codigoInterno: '4007379', modelo: 'GUAL36', varianteNombre: 'Tipo L 1"', precio: 76.00 },
      { codigoInterno: '4007374', modelo: 'GUAC36', varianteNombre: 'Tipo C 1"', precio: 77.25 },
      { codigoInterno: '4007384', modelo: 'GUAT36', varianteNombre: 'Tipo T 1"', precio: 80.00 },
      { codigoInterno: '4007392', modelo: 'GUAX36', varianteNombre: 'Tipo X 1"', precio: 80.00 },
      { codigoInterno: '4007389', modelo: 'GUAB36', varianteNombre: 'Tipo LB 1"', precio: 82.40 },
      { codigoInterno: '4007375', modelo: 'GUAC59', varianteNombre: 'Tipo C 1 1/2"', precio: 210.00 },
      { codigoInterno: '4007376', modelo: 'GUAC69', varianteNombre: 'Tipo C 2"', precio: 210.00 },
      { codigoInterno: '4007380', modelo: 'GUAL59', varianteNombre: 'Tipo L 1 1/2"', precio: 215.00 },
      { codigoInterno: '4007381', modelo: 'GUAL69', varianteNombre: 'Tipo L 2"', precio: 220.00 },
      { codigoInterno: '4007385', modelo: 'GUAT59', varianteNombre: 'Tipo T 1 1/2"', precio: 240.00 },
      { codigoInterno: '4007386', modelo: 'GUAT69', varianteNombre: 'Tipo T 2"', precio: 250.00 },
    ],
  },
  {
    codigoPadre: 'CH-HTL-LUBRICANTE',
    nombre: 'Lubricante HTL para Uniones a Alta Temperatura (4 oz)',
    marca: 'Crouse Hinds',
    categoria: 'Selladores y Masillas Anti-explosión',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Selladores y Masillas',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Grasa lubricante y selladora de roscas HTL para roscas NPT en áreas corrosivas o de alta temperatura.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4009462', modelo: 'HTL4', varianteNombre: 'Frasco 4 oz', precio: 34.00 },
    ],
  },
  {
    codigoPadre: 'CH-PLG-TAPONES',
    nombre: 'Tapón Hexagonal de Hierro Maleable PLG Class 1 Div 1',
    marca: 'Crouse Hinds',
    categoria: 'Accesorios Conduit Explosion Proof',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Accesorios y Drenes Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tapón roscado macho de cabeza hexagonal en hierro maleable para sellar entradas no utilizadas en cajas explosion proof.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008687', modelo: 'PLG1', varianteNombre: 'Diámetro 1/2" NPT', precio: 2.20 },
      { codigoInterno: '4008688', modelo: 'PLG2', varianteNombre: 'Diámetro 3/4" NPT', precio: 3.80 },
      { codigoInterno: '4008689', modelo: 'PLG3', varianteNombre: 'Diámetro 1" NPT', precio: 4.00 },
      { codigoInterno: '4008690', modelo: 'PLG5', varianteNombre: 'Diámetro 1 1/2" NPT', precio: 4.60 },
      { codigoInterno: '4011146', modelo: 'PLG6', varianteNombre: 'Diámetro 2" NPT', precio: 10.50 },
    ],
  },
  {
    codigoPadre: 'CH-RE-REDUCCIONES',
    nombre: 'Reducción Bushing Roscada NPT Serie RE',
    marca: 'Crouse Hinds',
    categoria: 'Accesorios Conduit Explosion Proof',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Accesorios y Drenes Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Reducción Bushing roscada macho-hembra de hierro maleable / acero para adaptación de diámetros NPT.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007413', modelo: 'RE43', varianteNombre: 'Medida 1 1/4" a 1"', precio: 5.50 },
      { codigoInterno: '4007410', modelo: 'RE21', varianteNombre: 'Medida 3/4" a 1/2"', precio: 5.80 },
      { codigoInterno: '4007411', modelo: 'RE31', varianteNombre: 'Medida 1" a 1/2"', precio: 6.00 },
      { codigoInterno: '4007412', modelo: 'RE32', varianteNombre: 'Medida 1" a 3/4"', precio: 6.00 },
      { codigoInterno: '4007414', modelo: 'RE52', varianteNombre: 'Medida 1 1/2" a 3/4"', precio: 11.00 },
      { codigoInterno: '4007415', modelo: 'RE53', varianteNombre: 'Medida 1 1/2" a 1"', precio: 11.00 },
      { codigoInterno: '4007417', modelo: 'RE64', varianteNombre: 'Medida 2" a 1 1/4"', precio: 11.00 },
      { codigoInterno: '4007418', modelo: 'RE65', varianteNombre: 'Medida 2" a 1 1/2"', precio: 15.00 },
      { codigoInterno: '4007419', modelo: 'RE75', varianteNombre: 'Medida 2 1/2" a 1 1/2"', precio: 15.00 },
      { codigoInterno: '4007416', modelo: 'RE63', varianteNombre: 'Medida 2" a 1"', precio: 16.50 },
      { codigoInterno: '4008661', modelo: 'RE83', varianteNombre: 'Medida 3" a 1"', precio: 31.00 },
      { codigoInterno: '4007420', modelo: 'RE86', varianteNombre: 'Medida 3" a 2"', precio: 31.00 },
      { codigoInterno: '4008662', modelo: 'RE87', varianteNombre: 'Medida 3" a 2 1/2"', precio: 31.00 },
    ],
  },
  {
    codigoPadre: 'CH-REC-CAMPANAS',
    nombre: 'Reducción Tipo Campana Roscada NPT Serie REC',
    marca: 'Crouse Hinds',
    categoria: 'Accesorios Conduit Explosion Proof',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Accesorios y Drenes Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Reducción hembra-hembra tipo campana cónica en hierro maleable.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4011147', modelo: 'REC32', varianteNombre: 'Medida 1" a 3/4"', precio: 20.00 },
      { codigoInterno: '4007423', modelo: 'REC52', varianteNombre: 'Medida 1 1/2" a 3/4"', precio: 20.00 },
      { codigoInterno: '4011148', modelo: 'REC53', varianteNombre: 'Medida 1 1/2" a 1"', precio: 20.00 },
      { codigoInterno: '4007422', modelo: 'REC31', varianteNombre: 'Medida 1" a 1/2"', precio: 25.00 },
      { codigoInterno: '4007421', modelo: 'REC21', varianteNombre: 'Medida 3/4" a 1/2"', precio: 35.00 },
      { codigoInterno: '4011150', modelo: 'REC605', varianteNombre: 'Medida 2" a 1 1/2"', precio: 50.00 },
      { codigoInterno: '4011149', modelo: 'REC603', varianteNombre: 'Medida 2" a 1"', precio: 55.00 },
    ],
  },
  {
    codigoPadre: 'CH-UNF-UNIONES',
    nombre: 'Unión Doble Hembra/Hembra NPT Serie UNF (Zinc Electrolítico)',
    marca: 'Crouse Hinds',
    categoria: 'Accesorios Conduit Explosion Proof',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Accesorios y Drenes Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Unión universal de 3 piezas Hembra/Hembra roscada NPT para ensamble/desmonte rápido de tubos.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007400', modelo: 'UNF105', varianteNombre: 'Diámetro 1/2" H/H', precio: 10.50 },
      { codigoInterno: '4007401', modelo: 'UNF205', varianteNombre: 'Diámetro 3/4" H/H', precio: 18.50 },
      { codigoInterno: '4007402', modelo: 'UNF305', varianteNombre: 'Diámetro 1" H/H', precio: 30.00 },
      { codigoInterno: '4007404', modelo: 'UNF605', varianteNombre: 'Diámetro 2" H/H', precio: 56.00 },
      { codigoInterno: '4007403', modelo: 'UNF505', varianteNombre: 'Diámetro 1 1/2" H/H', precio: 61.00 },
    ],
  },
  {
    codigoPadre: 'CH-UNY-UNIONES',
    nombre: 'Unión Doble Hembra/Macho NPT Serie UNY (Zinc Electrolítico)',
    marca: 'Crouse Hinds',
    categoria: 'Accesorios Conduit Explosion Proof',
    familia: 'Fitinería y Conectores',
    subfamilia: 'Accesorios y Drenes Explosion Proof',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Unión universal de 3 piezas Hembra/Macho roscada NPT a prueba de explosión.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4007405', modelo: 'UNY105', varianteNombre: 'Diámetro 1/2" H/M', precio: 14.00 },
      { codigoInterno: '4007406', modelo: 'UNY205', varianteNombre: 'Diámetro 3/4" H/M', precio: 20.50 },
      { codigoInterno: '4007407', modelo: 'UNY305', varianteNombre: 'Diámetro 1" H/M', precio: 32.00 },
      { codigoInterno: '4007409', modelo: 'UNY605', varianteNombre: 'Diámetro 2" H/M', precio: 190.00 },
    ],
  },

  // -----------------------------------------------------------------------
  // DUPRO
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'DUPRO-TUBO-EMT',
    nombre: 'Tubo Conduit de Fierro Galvanizado EMT x 3M',
    marca: 'Dupro',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit liviano EMT de acero galvanizado x 3 metros.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4014322', modelo: 'DUPROEMT-50', varianteNombre: 'Diámetro 1/2" x 3M', precio: 2.77 },
      { codigoInterno: '4014326', modelo: 'DUPROEMT-150', varianteNombre: 'Diámetro 1 1/2" x 3M', precio: 10.07 },
      { codigoInterno: '4018581', modelo: 'DUPROEMT-300', varianteNombre: 'Diámetro 3" x 3M', precio: 25.98 },
    ],
  },
  {
    codigoPadre: 'DUPRO-TUBO-IMC',
    nombre: 'Tubo Conduit de Fierro Galvanizado IMC x 3M',
    marca: 'Dupro',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit de espesor intermedio IMC de acero galvanizado x 3 metros.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4014330', modelo: 'DUPROIMC-1', varianteNombre: 'Diámetro 1" x 3M', precio: 9.15 },
    ],
  },
  {
    codigoPadre: 'DUPRO-CURVA-IMC',
    nombre: 'Curva 90° Conduit Galvanizado IMC',
    marca: 'Dupro',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Curva 90° de acero galvanizado para tubo IMC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4014345', modelo: 'DUPROELBOWIMC-63', varianteNombre: 'Diámetro 1" IMC', precio: 2.75 },
    ],
  },
  {
    codigoPadre: 'DUPRO-TUBO-FLEX-PVC',
    nombre: 'Tubería Flexible Pesada con Forro de PVC (Rollo 50M)',
    marca: 'Dupro',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Prensaestopas y Conectores Herméticos',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Manguera / Tubo metálico flexible pesado recubierto en PVC hermético por metro.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4018551', modelo: 'DFLEX SAP 11/4"', varianteNombre: 'Diámetro 1 1/4" (Metro)', precio: 2.91 },
    ],
  },

  // -----------------------------------------------------------------------
  // EUROMOLD
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'EUROMOLD-TERMINACION-24KV',
    nombre: 'Terminación Termocontraíble Unipolar 24kV + Kit MT',
    marca: 'Euromold',
    categoria: 'Terminaciones y Empalmes de Media Tensión',
    familia: 'Cables y Accesorios MT',
    subfamilia: 'Terminaciones Termocontraíbles 24kV',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Terminal exterior / interior termocontraíble para cables unipolares de media tensión 24kV con kit de puesta a tierra.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025317', modelo: '3x24MONOi1.95Ai', varianteNombre: 'Interior 24kV (25-95) mm2', precio: 253.00 },
      { codigoInterno: '4025319', modelo: '3x24MONOe1.95Ai', varianteNombre: 'Exterior 24kV (25-95) mm2', precio: 258.00 },
      { codigoInterno: '4025318', modelo: '3x24MONOi1.240Ai', varianteNombre: 'Interior 24kV (70-240) mm2', precio: 287.00 },
      { codigoInterno: '4025320', modelo: '3x24MONOe1.240Ai', varianteNombre: 'Exterior 24kV (70-240) mm2', precio: 290.00 },
    ],
  },
  {
    codigoPadre: 'EUROMOLD-TERMINAL-PERNO-FUSIBLE',
    nombre: 'Terminal de Pernos Fusibles para Media Tensión',
    marca: 'Euromold',
    categoria: 'Terminaciones y Empalmes de Media Tensión',
    familia: 'Cables y Accesorios MT',
    subfamilia: 'Terminaciones Termocontraíbles 24kV',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Terminal mecánico de par de apriete autocontrolado por perno fusible para conexión de conductores de MT.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4025375', modelo: 'C16-95 x 12', varianteNombre: 'Rango 16-95 mm2 x 12', precio: 16.00 },
      { codigoInterno: '4025376', modelo: 'C70-240 x 12', varianteNombre: 'Rango 70-240 mm2 x 12', precio: 24.00 },
    ],
  },

  // -----------------------------------------------------------------------
  // ERICO
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'ERICO-GEM-CEMENTO-CONDUCTIVO',
    nombre: 'Cemento Conductivo GEM para Sistema de Puesta a Tierra (11.3 kg)',
    marca: 'Erico',
    categoria: 'Sistemas de Puesta a Tierra',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Mejoradores de Suelo y Cemento Conductivo',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Material de reemplazo de tierra altamente conductivo (GEM) que reduce permanentemente la resistencia del pozo a tierra.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4011523', modelo: 'GEM25A', varianteNombre: 'Bolsa de 11.3 kg (25 lb)', precio: 53.00 },
    ],
  },

  // -----------------------------------------------------------------------
  // E-SAFE TUBERÍAS
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'ESAFE-TUBO-EMT',
    nombre: 'Tubo Conduit de Fierro Galvanizado EMT x 3M',
    marca: 'E-Safe Tuberías',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Tubería y Accesorios Conduit',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo conduit liviano EMT de fierro galvanizado de 3 metros.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4020492', modelo: 'EMT-75', varianteNombre: 'Diámetro 3/4" x 3M', precio: 4.43 },
      { codigoInterno: '4020493', modelo: 'EMT-100', varianteNombre: 'Diámetro 1" x 3M', precio: 6.41 },
      { codigoInterno: '4020497', modelo: 'EMT-250', varianteNombre: 'Diámetro 2 1/2" x 3M', precio: 20.47 },
    ],
  },
  {
    codigoPadre: 'ESAFE-TUBO-FLEX-LIVIANA',
    nombre: 'Tubería Flexible Liviana de Acero con Forro de PVC (PFC)',
    marca: 'E-Safe Tuberías',
    categoria: 'Tuberías y Canalización Conduit',
    familia: 'Canalizaciones y Bandejas',
    subfamilia: 'Prensaestopas y Conectores Herméticos',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tubo metálico flexible engargolado liviano revestido con forro exterior de PVC hermético (precio por metro).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4018554', modelo: 'PFC-050G', varianteNombre: 'Diámetro 1/2" (Rollo 50m)', precio: 0.72 },
      { codigoInterno: '4018555', modelo: 'PFC-075G', varianteNombre: 'Diámetro 3/4" (Rollo 50m)', precio: 0.92 },
      { codigoInterno: '4018556', modelo: 'PFC-100G', varianteNombre: 'Diámetro 1" (Rollo 50m)', precio: 1.18 },
      { codigoInterno: '4018557', modelo: 'PFC-125G', varianteNombre: 'Diámetro 1 1/4" (Rollo 25m)', precio: 1.86 },
      { codigoInterno: '4018558', modelo: 'PFC-150G', varianteNombre: 'Diámetro 1 1/2" (Rollo 25m)', precio: 2.45 },
      { codigoInterno: '4018559', modelo: 'PFC-200G', varianteNombre: 'Diámetro 2" (Rollo 25m)', precio: 4.37 },
    ],
  },

  // -----------------------------------------------------------------------
  // INTELLI
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'INTELLI-VARILLA-COPPERWELD',
    nombre: 'Varilla de Puesta a Tierra Copperweld 254u UL',
    marca: 'Intelli',
    categoria: 'Sistemas de Puesta a Tierra',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Varillas de Tierra y Conectores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Electrodo / Varilla de puesta a tierra de acero revestido de cobre de 254 micras con certificación UL.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024933', modelo: 'IH-858', varianteNombre: 'Diámetro 5/8" x 2.4M 254u UL', precio: 31.20 },
      { codigoInterno: '4024935', modelo: 'IH-834', varianteNombre: 'Diámetro 3/4" x 2.4M 254u UL', precio: 37.60 },
      { codigoInterno: '4024934', modelo: 'IH-1034', varianteNombre: 'Diámetro 3/4" x 3.0M 254u UL', precio: 45.60 },
    ],
  },
  {
    codigoPadre: 'INTELLI-CONECTOR-VARILLA',
    nombre: 'Conector de Bronce / Bronce Reforzado para Varilla Copperweld',
    marca: 'Intelli',
    categoria: 'Sistemas de Puesta a Tierra',
    familia: 'Protección Eléctrica y Pozo Tierra',
    subfamilia: 'Varillas de Tierra y Conectores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Grapas / Conectores de presión de aleación de cobre para unión de cable a varilla de puesta a tierra.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024938', modelo: 'TH-58', varianteNombre: 'Conector Varilla 5/8"', precio: 1.64 },
      { codigoInterno: '4024936', modelo: 'TH-34', varianteNombre: 'Conector Varilla 3/4"', precio: 2.10 },
      { codigoInterno: '4024939', modelo: 'TH-58R', varianteNombre: 'Conector Varilla 5/8" Reforzado', precio: 3.10 },
      { codigoInterno: '4024937', modelo: 'TH-34R', varianteNombre: 'Conector Varilla 3/4" Reforzado', precio: 4.30 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación de Marcas Varias (Crouse Hinds, Dupro, Euromold, Erico, E-Safe, Intelli)...');

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_VARIOS) {
    // 1. Obtener o crear la Familia
    let familia = await prisma.familia.findUnique({
      where: { nombre: grupo.familia },
    });

    if (!familia) {
      familia = await prisma.familia.create({
        data: {
          nombre: grupo.familia,
          descripcion: 'Productos de canalización, protección a tierra y fitinería eléctrica.',
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

    console.log(`\n📦 [PADRE] [${padre.marca}] ${padre.nombre} (${padre.codigoInterno})`);
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

  console.log(`\n🎉 Importación de marcas varias completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando Marcas Varias:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
