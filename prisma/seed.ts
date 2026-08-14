import { PrismaClient, TipoTransaccion, Rol, EstadoEquipo } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Las 11 familias oficiales del PDF
const FAMILIAS: { nombre: string; descripcion: string; subfamilias: string[] }[] = [
  { nombre: 'Equipos de Medición', descripcion: 'Instrumentos de medición eléctrica y física (megóhmetros, multímetros, termómetros, etc.).', subfamilias: ['Megómetros', 'Multímetros', 'Pinzas Amperimétricas', 'Cámaras Termográficas'] },
  { nombre: 'Herramientas Eléctricas', descripcion: 'Herramientas eléctricas portátiles e industriales (taladros, amoladoras, atornilladores).', subfamilias: ['Taladros', 'Atornilladores', 'Amoladoras', 'Sierras'] },
  { nombre: 'Equipos de Izaje', descripcion: 'Equipos para levantar y mover cargas (polipastos, montacargas, eslingas, tecles).', subfamilias: ['Polipastos', 'Tecles', 'Montacargas', 'Eslingas'] },
  { nombre: 'Equipos de Seguridad', descripcion: 'EPPs y equipos de protección para trabajo en altura y ambientes peligrosos.', subfamilias: ['Arnés de Seguridad', 'Cascos', 'Guantes Dieléctricos', 'Detectores de Gases'] },
  { nombre: 'Equipos de Termografía', descripcion: 'Cámaras termográficas y accesorios para inspección térmica.', subfamilias: ['Cámaras Térmicas', 'Accesorios'] },
  { nombre: 'Drones', descripcion: 'Drones y accesorios para inspección aérea industrial.', subfamilias: ['Drones Industriales', 'Baterías', 'Accesorios'] },
  { nombre: 'Equipos para Líneas Energizadas', descripcion: 'Herramientas y equipos para trabajos en líneas de media tensión energizadas.', subfamilias: ['Pértigas', 'Banquillos', 'Detectores de Tensión'] },
  { nombre: 'Escaleras', descripcion: 'Escaleras industriales de fibra de vidrio y aluminio.', subfamilias: ['Escaleras de Fibra', 'Escaleras de Aluminio', 'Escaleras Multiposición'] },
  { nombre: 'Grupos Electrógenos', descripcion: 'Generadores eléctricos diesel y gasolina de respaldo y obra.', subfamilias: ['Generadores Diesel', 'Generadores Gasolina', 'Tableros de Transferencia'] },
  { nombre: 'Equipos Especiales', descripcion: 'Equipos especializados: subestaciones, transformadores, celdas de MT.', subfamilias: ['Transformadores', 'Celdas de MT', 'Subestaciones'] },
  { nombre: 'Accesorios', descripcion: 'Accesorios complementarios: cables, conectores, adaptadores, kits.', subfamilias: ['Cables', 'Conectores', 'Adaptadores', 'Kits'] },
];

// Usuarios reales por área (contraseña inicial: Admin123! — se cambia desde el panel de Usuarios)
const USUARIOS: { nombre: string; email: string; rol: Rol }[] = [
  { nombre: 'Ing. Percy Loro', email: 'admin@hhtrent.com', rol: 'ADMINISTRADOR' },
  { nombre: 'Mg. Elena Morales', email: 'gerencia@hhtrent.com', rol: 'GERENCIA' },
  { nombre: 'Lic. Carlos Vega', email: 'comercial@hhtrent.com', rol: 'COMERCIAL' },
  { nombre: 'Ing. Ricardo Salas', email: 'logistica@hhtrent.com', rol: 'LOGISTICA' },
  { nombre: 'Ing. Lucía Paredes', email: 'operaciones@hhtrent.com', rol: 'OPERACIONES' },
  { nombre: 'CPC. Jorge Ramírez', email: 'contabilidad@hhtrent.com', rol: 'CONTABILIDAD' },
  { nombre: 'Téc. Marco Chunga', email: 'almacen@hhtrent.com', rol: 'ALMACEN' },
  { nombre: 'Srta. Ana Torres', email: 'consulta@hhtrent.com', rol: 'CONSULTA' },
];

// Equipos del catálogo existente enriquecidos con campos del Maestro General
const EQUIPOS = [
  {
    nombre: 'Generador Eléctrico Diesel 50kVA - Trifásico',
    categoria: 'Generadores',
    familia: 'Grupos Electrógenos',
    subfamilia: 'Generadores Diesel',
    marca: 'Caterpillar',
    modelo: 'DE50S',
    serie: 'GEN-50KVA-001',
    anio: 2023,
    proveedor: 'Distribuidor Oficial Cat Perú',
    costo: 38000,
    valorComercial: 45000,
    valorReposicion: 52000,
    descripcion: 'Generador diésel insonorizado 50kVA trifásico 220V/440V. Equipos certificados con mantenimientos rigurosos para minería e industria.',
    precio: 4500.0,
    unidad: '/ mes',
    ubicacion: 'Piura',
    tipo: TipoTransaccion.ALQUILER,
    imagenUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800',
  },
  {
    nombre: 'Taladro Percutor Industrial Heavy Duty 1200W',
    categoria: 'Taladros',
    familia: 'Herramientas Eléctricas',
    subfamilia: 'Taladros',
    marca: 'Bosch',
    modelo: 'GBH 2-26',
    serie: 'TLD-1200-014',
    anio: 2024,
    proveedor: 'Truper Perú',
    costo: 780,
    valorComercial: 1250,
    valorReposicion: 1350,
    descripcion: 'Taladro percutor de alta potencia 1200W para trabajo pesado en concreto y estructuras metálicas. Incluye empuñadura antivibración.',
    precio: 1250.0,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.VENTA,
    imagenUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800',
  },
  {
    nombre: 'Transformador de Media Tensión 500kVA',
    categoria: 'Subestaciones',
    familia: 'Equipos Especiales',
    subfamilia: 'Transformadores',
    marca: 'TMC Sudamerica',
    modelo: 'TMT-500-22.9',
    serie: 'TRF-500-007',
    anio: 2022,
    proveedor: 'TMC Sudamerica',
    costo: 185000,
    valorComercial: 220000,
    valorReposicion: 260000,
    descripcion: 'Transformador de distribución 500kVA 22.9kV / 0.44kV para subestaciones industriales y mineras. Fabricación bajo norma IEC.',
    precio: null,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.PROYECTO,
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
  {
    nombre: 'Subestación Móvil Compacta 10kV / 0.44kV',
    categoria: 'Subestaciones',
    familia: 'Equipos Especiales',
    subfamilia: 'Subestaciones',
    marca: 'Siemens',
    modelo: 'MOV-10-044',
    serie: 'SEM-10KV-002',
    anio: 2023,
    proveedor: 'Siemens Perú',
    costo: 420000,
    valorComercial: 500000,
    valorReposicion: 580000,
    descripcion: 'Subestación eléctrica móvil sobre remolque compacta 10kV a 0.44kV equipada con celdas de protección y medición.',
    precio: 8200.0,
    unidad: '/ mes',
    ubicacion: 'Piura',
    tipo: TipoTransaccion.ALQUILER,
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    nombre: 'Ormazabal Celda Modular GIS cgmcosmos 24kV',
    categoria: 'Celdas Modulares GIS / Media Tensión',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    marca: 'Ormazabal',
    modelo: 'cgmcosmos 24kV',
    serie: 'CEL-GIS-011',
    anio: 2024,
    proveedor: 'Ormazabal Perú',
    costo: 11500,
    valorComercial: 15500,
    valorReposicion: 17500,
    descripcion: 'Celda de media tensión aislada en gas SF6 herméticamente sellada. Modelo cgmcosmos 24kV con enclavamientos mecánicos y resistencia al arco interno (IEC 62271-200).',
    precio: 15500.0,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.VENTA,
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
  },
  {
    nombre: 'Siemens Celda Modular SIMOSEC 24kV',
    categoria: 'Celdas Modulares AIS / Media Tensión',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    marca: 'Siemens',
    modelo: 'SIMOSEC 24kV',
    serie: 'CEL-AIS-005',
    anio: 2023,
    proveedor: 'Siemens Perú',
    costo: 13500,
    valorComercial: 17000,
    valorReposicion: 19000,
    descripcion: 'Celda modular de aislamiento en aire SIMOSEC hasta 24kV y 1250A. Diseño extensible con interruptor automático en vacío para protección y maniobra.',
    precio: null,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.PROYECTO,
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
  },
  {
    nombre: 'TMC Sudamerica Transformador Seco 1000kVA 20kV',
    categoria: 'Transformadores Secos',
    familia: 'Equipos Especiales',
    subfamilia: 'Transformadores',
    marca: 'TMC Sudamerica',
    modelo: 'TST-1000-20',
    serie: 'TRF-SECO-003',
    anio: 2024,
    proveedor: 'TMC Sudamerica',
    costo: 21000,
    valorComercial: 28500,
    valorReposicion: 32000,
    descripcion: 'Transformador seco encapsulado en resina epoxi TMC de 1000kVA, 20kV/22.9kV a 440V. Alta resistencia al fuego (Clase F1) y bajas pérdidas operativas.',
    precio: 28500.0,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.VENTA,
    imagenUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800',
  },
  {
    nombre: 'Euromold Conector Hermético T-Body 480TB 630A 24kV',
    categoria: 'Conectores y Terminaciones MT',
    familia: 'Accesorios',
    subfamilia: 'Conectores',
    marca: 'Euromold',
    modelo: '480TB/G-02195TBAi',
    serie: 'CON-TBODY-021',
    anio: 2024,
    proveedor: 'Euromold Perú',
    costo: 620,
    valorComercial: 850,
    valorReposicion: 950,
    descripcion: 'Conector separable estanco 3xK480TB/G-02195TBAi para cables de media tensión hasta 24kV 630A. Aislamiento premoldeado en EPDM.',
    precio: 850.0,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.VENTA,
    imagenUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=800',
  },
  {
    nombre: 'Euromold Terminación Termocontraíble MONOi 24kV',
    categoria: 'Conectores y Terminaciones MT',
    familia: 'Accesorios',
    subfamilia: 'Conectores',
    marca: 'Euromold',
    modelo: '3x24MONOi1.95Ai',
    serie: 'TER-MONOi-009',
    anio: 2024,
    proveedor: 'Euromold Perú',
    costo: 310,
    valorComercial: 420,
    valorReposicion: 470,
    descripcion: 'Terminación termocontraíble para uso interior 3x24MONOi1.95Ai. Alta resistencia dieléctrica y facilidad de montaje para cables subterráneos.',
    precio: 420.0,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.VENTA,
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    nombre: 'LS Electric Interruptor en Aire Metasol ACB 1600A',
    categoria: 'Protección Eléctrica Baja Tensión',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    marca: 'LS Electric',
    modelo: 'Metasol ACB 1600A',
    serie: 'ACB-1600-001',
    anio: 2023,
    proveedor: 'LS Electric Perú',
    costo: 7800,
    valorComercial: 9800,
    valorReposicion: 11000,
    descripcion: 'Interruptor de potencia en aire (ACB) LS Metasol trifásico de 1600A con unidad de protección electrónica y alta capacidad de ruptura en cortocircuito.',
    precio: 9800.0,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.VENTA,
    imagenUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800',
  },
  {
    nombre: 'LS Electric Variador de Frecuencia G100 15HP / 11kW',
    categoria: 'Arranque Electrónico de Motores',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    marca: 'LS Electric',
    modelo: 'G100 15HP',
    serie: 'VFD-G100-004',
    anio: 2024,
    proveedor: 'LS Electric Perú',
    costo: 2600,
    valorComercial: 3450,
    valorReposicion: 3900,
    descripcion: 'Inversor/Variador de velocidad vectorial LS G100 trifásico 380-480V 15HP. Ideal para bombas, ventiladores e industrias de procesamiento.',
    precio: 3450.0,
    unidad: '/ mes',
    ubicacion: 'Piura',
    tipo: TipoTransaccion.ALQUILER,
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
  },
  {
    nombre: 'Megómetro Digital Fluke 1507',
    categoria: 'Equipos de Medición',
    familia: 'Equipos de Medición',
    subfamilia: 'Megómetros',
    marca: 'Fluke',
    modelo: '1507',
    serie: 'HTR-MEG-001-SER',
    anio: 2024,
    proveedor: 'Fluke Perú',
    costo: 4200,
    valorComercial: 5200,
    valorReposicion: 5800,
    descripcion: 'Megómetro digital de aislamiento Fluke 1507 con tensiones de prueba 50V a 1000V, medición de resistencia de aislamiento hasta 10GΩ y prueba de polarización (DAR/PI).',
    precio: 320.0,
    unidad: '/ mes',
    ubicacion: 'Piura',
    tipo: TipoTransaccion.ALQUILER,
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
  },
  {
    nombre: 'Alicate Pelacable Automático 8" Truper 17360',
    categoria: 'Herramientas Manuales e Industriales',
    familia: 'Herramientas Eléctricas',
    subfamilia: 'Taladros',
    marca: 'Truper',
    modelo: '17360',
    serie: 'PEL-17360-012',
    anio: 2024,
    proveedor: 'Truper Perú',
    costo: 85,
    valorComercial: 114.75,
    valorReposicion: 130,
    descripcion: 'Pelacable automático de 8 pulgadas Truper profesional con función de desaislado de precisión de 0.2 a 6mm², cortador de cable integrado y 15% OFF.',
    precio: 114.75,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.VENTA,
    imagenUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800',
  },
  {
    nombre: 'Escalera Multiposición 16 Peldaños Articulada 4x4 Stanley',
    categoria: 'Equipos de Altura y Seguridad',
    familia: 'Escaleras',
    subfamilia: 'Escaleras Multiposición',
    marca: 'Stanley',
    modelo: '16 Peldaños 4x4',
    serie: 'ESC-STAN-016',
    anio: 2023,
    proveedor: 'Stanley Perú',
    costo: 390,
    valorComercial: 519.75,
    valorReposicion: 580,
    descripcion: 'Escalera articulada multipropósito 16 peldaños en estructura de aluminio Stanley. Capacidad de carga 150kg con bloqueo de seguridad reforzado.',
    precio: 519.75,
    unidad: null,
    ubicacion: 'Piura',
    tipo: TipoTransaccion.VENTA,
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    nombre: 'Dron Industrial DJI Matrice 350 RTK',
    categoria: 'Drones',
    familia: 'Drones',
    subfamilia: 'Drones Industriales',
    marca: 'DJI',
    modelo: 'Matrice 350 RTK',
    serie: 'DRN-M350-001',
    anio: 2024,
    proveedor: 'DJI Enterprise Perú',
    costo: 45000,
    valorComercial: 58000,
    valorReposicion: 64000,
    descripcion: 'Dron industrial de inspección DJI Matrice 350 RTK con cámara térmica/visual, alcance IP55 y capacidad de vuelo en condiciones adversas para inspección de líneas de MT.',
    precio: 1800.0,
    unidad: '/ mes',
    ubicacion: 'Piura',
    tipo: TipoTransaccion.ALQUILER,
    imagenUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800',
  },
  {
    nombre: 'Cámara Termográfica Fluke TiS60+',
    categoria: 'Equipos de Termografía',
    familia: 'Equipos de Termografía',
    subfamilia: 'Cámaras Térmicas',
    marca: 'Fluke',
    modelo: 'TiS60+',
    serie: 'CAM-TERM-003',
    anio: 2024,
    proveedor: 'Fluke Perú',
    costo: 9500,
    valorComercial: 12500,
    valorReposicion: 13800,
    descripcion: 'Cámara termográfica Fluke TiS60+ con resolución 384x288 píxeles, sensibilidad térmica 0.04°C y enfoque automático para inspección de subestaciones.',
    precio: 550.0,
    unidad: '/ mes',
    ubicacion: 'Piura',
    tipo: TipoTransaccion.ALQUILER,
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
];

async function main() {
  console.log('🌱 Seeding database bd_hhtrent...');

  // Limpiar en orden de dependencias
  await prisma.documentoEquipo.deleteMany({});
  await prisma.historialEquipo.deleteMany({});
  await prisma.auditoriaLog.deleteMany({});
  await prisma.cotizacionItem.deleteMany({});
  await prisma.cotizacion.deleteMany({});
  await prisma.equipo.deleteMany({});
  await prisma.subfamilia.deleteMany({});
  await prisma.familia.deleteMany({});
  await prisma.usuario.deleteMany({});

  // 1. Familias y subfamilias
  const familiaIds = new Map<string, string>();
  const subfamiliaIds = new Map<string, string>();

  for (const fam of FAMILIAS) {
    const creada = await prisma.familia.create({
      data: { nombre: fam.nombre, descripcion: fam.descripcion },
    });
    familiaIds.set(fam.nombre, creada.id);

    for (const sub of fam.subfamilias) {
      const subCreada = await prisma.subfamilia.create({
        data: { nombre: sub, familiaId: creada.id },
      });
      subfamiliaIds.set(`${fam.nombre}::${sub}`, subCreada.id);
    }
  }

  // 2. Usuarios por rol
  const passwordHash = await bcrypt.hash('Admin123!', 10);
  for (const usr of USUARIOS) {
    await prisma.usuario.create({
      data: { ...usr, passwordHash },
    });
  }

  // 3. Equipos con código interno HTR-MEG-XXX
  let contador = 0;
  for (const eq of EQUIPOS) {
    contador++;
    const codigo = `HTR-MEG-${String(contador).padStart(3, '0')}`;
    const familiaId = familiaIds.get(eq.familia);
    const subfamiliaId = subfamiliaIds.get(`${eq.familia}::${eq.subfamilia}`);

    await prisma.equipo.create({
      data: {
        codigoInterno: codigo,
        nombre: eq.nombre,
        familiaId,
        subfamiliaId,
        marca: eq.marca,
        modelo: eq.modelo,
        serie: eq.serie,
        anio: eq.anio,
        proveedor: eq.proveedor,
        costo: eq.costo,
        valorComercial: eq.valorComercial,
        valorReposicion: eq.valorReposicion,
        estado: EstadoEquipo.DISPONIBLE,
        ubicacion: eq.ubicacion,
        categoria: eq.categoria,
        descripcion: eq.descripcion,
        precio: eq.precio,
        unidad: eq.unidad,
        tipo: eq.tipo,
        imagenUrl: eq.imagenUrl,
        disponible: true,
      },
    });
    console.log(`  ✅ ${codigo} - ${eq.nombre}`);
  }

  console.log(`\n🎉 Seed completado: ${FAMILIAS.length} familias, ${USUARIOS.length} usuarios, ${EQUIPOS.length} equipos.`);
  console.log('🔑 Usuario admin: admin@hhtrent.com / Admin123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
