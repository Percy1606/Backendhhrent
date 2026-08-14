import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTOS_ALFA = [
  // --- GRUPO 1: VENTILADORES CON FILTRO ---
  {
    codigoInterno: '4015645',
    modelo: 'ALFA1610BPB',
    nombre: 'Ventilador con Filtro 60 m³/h 115V (150x150 mm) RAL7035',
    marca: 'Alfa',
    precio: 280.91,
    categoria: 'Ventilación',
    subfamiliaNombre: 'Ventiladores con Filtro',
    descripcion: 'Ventilador con filtro antipolvo para tableros eléctricos y gabinetes industriales. Caudal de aire 60 m³/h, alimentación 115V AC, dimensiones de corte 150x150 mm. Acabado en termoplástico autoextinguible color Gris RAL7035 con grado de protección IP54.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    codigoInterno: '4015646',
    modelo: 'ALFA1600BPB',
    nombre: 'Ventilador con Filtro 60 m³/h 230V (150x150 mm) RAL7035',
    marca: 'Alfa',
    precio: 280.91,
    categoria: 'Ventilación',
    subfamiliaNombre: 'Ventiladores con Filtro',
    descripcion: 'Ventilador con filtro antipolvo para tableros eléctricos y gabinetes industriales. Caudal de aire 60 m³/h, alimentación 230V AC, dimensiones de corte 150x150 mm. Acabado en termoplástico autoextinguible color Gris RAL7035 con grado de protección IP54.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    codigoInterno: '4015647',
    modelo: 'ALFAB510BPB',
    nombre: 'Ventilador con Filtro 120 m³/h 115V (204x204 mm) RAL7035',
    marca: 'Alfa',
    precio: 432.09,
    categoria: 'Ventilación',
    subfamiliaNombre: 'Ventiladores con Filtro',
    descripcion: 'Ventilador con filtro antipolvo de caudal medio para envolventes eléctricas. Caudal de aire 120 m³/h, alimentación 115V AC, dimensiones de corte 204x204 mm. Fabricado en material termoplástico RAL7035 con estera filtrante lavable IP54.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    codigoInterno: '4015648',
    modelo: 'ALFAB500BPB',
    nombre: 'Ventilador con Filtro 120 m³/h 230V (204x204 mm) RAL7035',
    marca: 'Alfa',
    precio: 432.09,
    categoria: 'Ventilación',
    subfamiliaNombre: 'Ventiladores con Filtro',
    descripcion: 'Ventilador con filtro antipolvo de caudal medio para envolventes eléctricas. Caudal de aire 120 m³/h, alimentación 230V AC, dimensiones de corte 204x204 mm. Fabricado en material termoplástico RAL7035 con estera filtrante lavable IP54.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    codigoInterno: '4015649',
    modelo: 'ALFA2510BPB',
    nombre: 'Ventilador con Filtro 260 m³/h 115V (250x250 mm) RAL7035',
    marca: 'Alfa',
    precio: 648.30,
    categoria: 'Ventilación',
    subfamiliaNombre: 'Ventiladores con Filtro',
    descripcion: 'Ventilador con filtro de alto flujo para tableros de potencia y automatización. Caudal de aire 260 m³/h, alimentación 115V AC, dimensiones de corte 250x250 mm. Rejilla con cierre a presión y estera filtrante de alta retención IP54 RAL7035.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    codigoInterno: '4015650',
    modelo: 'ALFA2500BPB',
    nombre: 'Ventilador con Filtro 260 m³/h 230V (250x250 mm) RAL7035',
    marca: 'Alfa',
    precio: 648.30,
    categoria: 'Ventilación',
    subfamiliaNombre: 'Ventiladores con Filtro',
    descripcion: 'Ventilador con filtro de alto flujo para tableros de potencia y automatización. Caudal de aire 260 m³/h, alimentación 230V AC, dimensiones de corte 250x250 mm. Rejilla con cierre a presión y estera filtrante de alta retención IP54 RAL7035.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    codigoInterno: '4015651',
    modelo: 'ALFA3510BPB',
    nombre: 'Ventilador con Filtro 570 m³/h 115V (325x325 mm) RAL7035',
    marca: 'Alfa',
    precio: 986.36,
    categoria: 'Ventilación',
    subfamiliaNombre: 'Ventiladores con Filtro',
    descripcion: 'Ventilador industrial de gran capacidad para salas eléctricas y centros de control de motores (CCM). Caudal de aire 570 m³/h, alimentación 115V AC, dimensiones 325x325 mm. Máxima eficiencia de refrigeración forzada IP54 color RAL7035.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },
  {
    codigoInterno: '4015652',
    modelo: 'ALFA3500BPB',
    nombre: 'Ventilador con Filtro 570 m³/h 230V (325x325 mm) RAL7035',
    marca: 'Alfa',
    precio: 888.84,
    categoria: 'Ventilación',
    subfamiliaNombre: 'Ventiladores con Filtro',
    descripcion: 'Ventilador industrial de gran capacidad para salas eléctricas y centros de control de motores (CCM). Caudal de aire 570 m³/h, alimentación 230V AC, dimensiones 325x325 mm. Máxima eficiencia de refrigeración forzada IP54 color RAL7035.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
  },

  // --- GRUPO 2: REJILLAS CON FILTRO ---
  {
    codigoInterno: '4015653',
    modelo: 'ALFA1000BPB',
    nombre: 'Rejilla con Filtro Antipolvo 150x150 mm RAL7035',
    marca: 'Alfa',
    precio: 85.79,
    categoria: 'Rejillas',
    subfamiliaNombre: 'Rejillas y Filtros',
    descripcion: 'Rejilla de salida de aire y ventilación pasiva con filtro antipolvo para tableros. Dimensiones 150x150 mm, compatible con ventiladores ALFA16xx. Protección IP54, montaje por clip rápido sin tornillos en chapa, color Gris RAL7035.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
  },
  {
    codigoInterno: '4015654',
    modelo: 'ALFAB000BPB',
    nombre: 'Rejilla con Filtro Antipolvo 204x204 mm RAL7035',
    marca: 'Alfa',
    precio: 201.00,
    categoria: 'Rejillas',
    subfamiliaNombre: 'Rejillas y Filtros',
    descripcion: 'Rejilla de ventilación pasiva con filtro antipolvo intercambiable. Dimensiones 204x204 mm, compatible con ventiladores ALFAB5xx. Fabricada en ABS autoextinguible UL94V-0 color RAL7035 con protección IP54.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
  },
  {
    codigoInterno: '4015655',
    modelo: 'ALFA2000BPB',
    nombre: 'Rejilla con Filtro Antipolvo 250x250 mm RAL7035',
    marca: 'Alfa',
    precio: 225.85,
    categoria: 'Rejillas',
    subfamiliaNombre: 'Rejillas y Filtros',
    descripcion: 'Rejilla con filtro de aire de gran superficie. Dimensiones 250x250 mm, compatible con ventiladores ALFA25xx. Asegura un óptimo flujo de evacuación térmica en envolventes industriales IP54 RAL7035.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
  },
  {
    codigoInterno: '4015656',
    modelo: 'ALFA3000BPB',
    nombre: 'Rejilla con Filtro Antipolvo 325x325 mm RAL7035',
    marca: 'Alfa',
    precio: 254.75,
    categoria: 'Rejillas',
    subfamiliaNombre: 'Rejillas y Filtros',
    descripcion: 'Rejilla con filtro para alta disipación térmica en tableros y celdas. Dimensiones 325x325 mm, compatible con ventiladores ALFA35xx. Estructura robusta de fácil apertura frontal para cambio de estera filtrante.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
  },

  // --- GRUPO 3: TERMOSTATOS ---
  {
    codigoInterno: '4009652',
    modelo: 'THV2',
    nombre: 'Termostato Regulable 0-60°C Contacto NA (Ventilación)',
    marca: 'Alfa',
    precio: 253.74,
    categoria: 'Termostatos',
    subfamiliaNombre: 'Termostatos e Higrostatos',
    descripcion: 'Termostato electromecánico bimetálico para control de ventilación y refrigeración en tableros eléctricos. Rango de regulación de 0°C a +60°C. Contacto Normalmente Abierto (NA / Botón Azul). Montaje directo en Riel DIN 35mm.',
    imagenUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800',
  },
  {
    codigoInterno: '4009653',
    modelo: 'THR2',
    nombre: 'Termostato Regulable 0-60°C Contacto NC (Calefacción)',
    marca: 'Alfa',
    precio: 253.74,
    categoria: 'Termostatos',
    subfamiliaNombre: 'Termostatos e Higrostatos',
    descripcion: 'Termostato electromecánico bimetálico para control de resistencias calefactoras anticondensación. Rango de regulación de 0°C a +60°C. Contacto Normalmente Cerrado (NC / Botón Rojo). Montaje directo en Riel DIN 35mm.',
    imagenUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800',
  },

  // --- GRUPO 4: RESISTENCIAS CALEFACTORAS ---
  {
    codigoInterno: '4009654',
    modelo: 'SHT25',
    nombre: 'Resistencia Calefactora Anticondensación 25W 110-250V',
    marca: 'Alfa',
    precio: 285.92,
    categoria: 'Calefacción',
    subfamiliaNombre: 'Resistencias Calefactoras',
    descripcion: 'Resistencia calefactora semiconductora PTC autorregulable para prevención de condensación y humedad en tableros eléctricos. Potencia 25W, rango multitensión 110-250V AC/DC. Perfil de aluminio extruido anodizado con fijación a Riel DIN 35mm.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800',
  },
  {
    codigoInterno: '4009655',
    modelo: 'SHT75',
    nombre: 'Resistencia Calefactora Anticondensación 75W 110-250V',
    marca: 'Alfa',
    precio: 449.11,
    categoria: 'Calefacción',
    subfamiliaNombre: 'Resistencias Calefactoras',
    descripcion: 'Resistencia calefactora semiconductora PTC autorregulable para tableros eléctricos de mediano tamaño. Potencia 75W, rango multitensión 110-250V AC/DC. Evita la formación de agua y corrosión interna en gabinetes.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800',
  },
  {
    codigoInterno: '4009656',
    modelo: 'SHT100',
    nombre: 'Resistencia Calefactora Anticondensación 100W 110-250V',
    marca: 'Alfa',
    precio: 469.43,
    categoria: 'Calefacción',
    subfamiliaNombre: 'Resistencias Calefactoras',
    descripcion: 'Resistencia calefactora semiconductora de alta potencia 100W para envolventes exteriores e intemperie. Multitensión 110-250V AC/DC. Perfil disipador de aluminio con fijación Riel DIN.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800',
  },
  {
    codigoInterno: '4009657',
    modelo: 'SHT150',
    nombre: 'Resistencia Calefactora Anticondensación 150W 110-250V',
    marca: 'Alfa',
    precio: 619.56,
    categoria: 'Calefacción',
    subfamiliaNombre: 'Resistencias Calefactoras',
    descripcion: 'Resistencia calefactora semiconductora de máxima potencia 150W para grandes celdas y tableros en zonas de alta humedad. Multitensión 110-250V AC/DC, fijación en Riel DIN 35mm.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800',
  },
];

async function main() {
  console.log('🚀 Iniciando importación de productos Alfa para Venta...');

  // 1. Obtener o crear la Familia "Equipos Especiales"
  let familia = await prisma.familia.findUnique({
    where: { nombre: 'Equipos Especiales' },
  });

  if (!familia) {
    familia = await prisma.familia.create({
      data: {
        nombre: 'Equipos Especiales',
        descripcion: 'Equipos especializados: climatización de tableros, subestaciones, transformadores, celdas de MT.',
      },
    });
  }

  // 2. Crear las subfamilias necesarias si no existen
  const subfamiliasNombres = [
    'Ventiladores con Filtro',
    'Rejillas y Filtros',
    'Termostatos e Higrostatos',
    'Resistencias Calefactoras',
  ];

  const subfamiliasMap = new Map<string, string>();

  for (const nombre of subfamiliasNombres) {
    let subfamilia = await prisma.subfamilia.findUnique({
      where: {
        familiaId_nombre: {
          familiaId: familia.id,
          nombre,
        },
      },
    });

    if (!subfamilia) {
      subfamilia = await prisma.subfamilia.create({
        data: {
          nombre,
          familiaId: familia.id,
        },
      });
    }

    subfamiliasMap.set(nombre, subfamilia.id);
  }

  // 3. Insertar cada producto
  let creados = 0;
  for (const prod of PRODUCTOS_ALFA) {
    const subfamiliaId = subfamiliasMap.get(prod.subfamiliaNombre);

    await prisma.equipo.upsert({
      where: { codigoInterno: prod.codigoInterno },
      update: {
        nombre: prod.nombre,
        modelo: prod.modelo,
        marca: prod.marca,
        precio: prod.precio,
        tipo: TipoTransaccion.VENTA,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        categoria: prod.categoria,
        descripcion: prod.descripcion,
        imagenUrl: prod.imagenUrl,
        unidad: 'Unidad',
        ubicacion: 'Almacén Central',
        familiaId: familia.id,
        subfamiliaId: subfamiliaId,
      },
      create: {
        codigoInterno: prod.codigoInterno,
        nombre: prod.nombre,
        modelo: prod.modelo,
        marca: prod.marca,
        precio: prod.precio,
        tipo: TipoTransaccion.VENTA,
        estado: EstadoEquipo.DISPONIBLE,
        disponible: true,
        categoria: prod.categoria,
        descripcion: prod.descripcion,
        imagenUrl: prod.imagenUrl,
        unidad: 'Unidad',
        ubicacion: 'Almacén Central',
        familiaId: familia.id,
        subfamiliaId: subfamiliaId,
      },
    });

    console.log(`  ✅ [${prod.codigoInterno}] ${prod.nombre} - S/ ${prod.precio}`);
    creados++;
  }

  console.log(`\n🎉 Total de productos importados con éxito: ${creados}`);
}

main()
  .catch((e) => {
    console.error('❌ Error en importación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
