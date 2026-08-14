import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE PRODUCTOS PADRE CON VARIANTES (CLIMATIZACIÓN, BREMAS, DEHN, E-SAFE, EATON)
// =========================================================================

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

const GRUPOS_PRODUCTOS: GrupoProductoPadre[] = [
  // -----------------------------------------------------------------------
  // 1. ALFA - VENTILADORES PARA TABLEROS
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'ALFA-VENT-RAL7035',
    nombre: 'Ventilador con Filtro para Tableros Eléctricos RAL7035',
    marca: 'Alfa',
    categoria: 'Climatización de Tableros',
    familia: 'Climatización',
    subfamilia: 'Ventiladores de Tablero',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Sistema de ventilación forzada para refrigeración de tableros y armarios eléctricos. Grado de protección IP54, color gris RAL 7035, con filtro intercambiable de alta eficiencia.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4015645', modelo: 'ALFA1610BPB', varianteNombre: '60 m³/h · 115V · 150x150 mm', precio: 280.91, unidad: 'PEN' },
      { codigoInterno: '4015646', modelo: 'ALFA1600BPB', varianteNombre: '60 m³/h · 230V · 150x150 mm', precio: 280.91, unidad: 'PEN' },
      { codigoInterno: '4015647', modelo: 'ALFAB510BPB', varianteNombre: '120 m³/h · 115V · 204x204 mm', precio: 432.09, unidad: 'PEN' },
      { codigoInterno: '4015648', modelo: 'ALFAB500BPB', varianteNombre: '120 m³/h · 230V · 204x204 mm', precio: 432.09, unidad: 'PEN' },
      { codigoInterno: '4015649', modelo: 'ALFA2510BPB', varianteNombre: '260 m³/h · 115V · 250x250 mm', precio: 648.30, unidad: 'PEN' },
      { codigoInterno: '4015650', modelo: 'ALFA2500BPB', varianteNombre: '260 m³/h · 230V · 250x250 mm', precio: 648.30, unidad: 'PEN' },
      { codigoInterno: '4015651', modelo: 'ALFA3510BPB', varianteNombre: '570 m³/h · 115V · 325x325 mm', precio: 986.36, unidad: 'PEN' },
      { codigoInterno: '4015652', modelo: 'ALFA3500BPB', varianteNombre: '570 m³/h · 230V · 325x325 mm', precio: 888.84, unidad: 'PEN' },
    ],
  },

  // -----------------------------------------------------------------------
  // 2. ALFA - REJILLAS CON FILTRO
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'ALFA-REJ-RAL7035',
    nombre: 'Rejilla de Ventilación con Filtro RAL7035',
    marca: 'Alfa',
    categoria: 'Climatización de Tableros',
    familia: 'Climatización',
    subfamilia: 'Rejillas y Filtros',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Rejilla de salida de aire y ventilación pasiva con esterilla filtrante lavable para tableros eléctricos. Termoplástico autoextinguible RAL 7035.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4015653', modelo: 'ALFA1000BPB', varianteNombre: '150 x 150 mm', precio: 85.79, unidad: 'PEN' },
      { codigoInterno: '4015654', modelo: 'ALFAB000BPB', varianteNombre: '204 x 204 mm', precio: 201.00, unidad: 'PEN' },
      { codigoInterno: '4015655', modelo: 'ALFA2000BPB', varianteNombre: '250 x 250 mm', precio: 225.85, unidad: 'PEN' },
      { codigoInterno: '4015656', modelo: 'ALFA3000BPB', varianteNombre: '325 x 325 mm', precio: 254.75, unidad: 'PEN' },
    ],
  },

  // -----------------------------------------------------------------------
  // 3. ALFA - TERMOSTATOS DE TABLERO
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'ALFA-TERM-TABLERO',
    nombre: 'Termostato Mecánico Regulable para Tablero 0-60°C',
    marca: 'Alfa',
    categoria: 'Climatización de Tableros',
    familia: 'Climatización',
    subfamilia: 'Termostatos e Higrostatos',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Termostato bimetálico para control de temperatura en envolventes y tableros eléctricos. Rango 0-60°C, montaje directo en Riel DIN 35mm.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4009652', modelo: 'THV2', varianteNombre: 'Contacto NA (Azul - para Ventilación / Refrigeración)', precio: 253.74, unidad: 'PEN' },
      { codigoInterno: '4009653', modelo: 'THR2', varianteNombre: 'Contacto NC (Rojo - para Calefacción / Resistencias)', precio: 253.74, unidad: 'PEN' },
    ],
  },

  // -----------------------------------------------------------------------
  // 4. ALFA - RESISTENCIAS CALEFACTORAS
  // -----------------------------------------------------------------------
  {
    codigoPadre: 'ALFA-RESIST-SHT',
    nombre: 'Resistencia Calefactora Anticondensación para Tableros 110-250V (Serie SHT)',
    marca: 'Alfa',
    categoria: 'Climatización de Tableros',
    familia: 'Climatización',
    subfamilia: 'Resistencias Calefactoras',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Calefactor semiconductor PTC autorregulable con perfil de aluminio extruido anodizado para prevención de condensación y escarcha en tableros eléctricos. Tensión universal 110-250V AC/DC, fijación en Riel DIN.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4009654', modelo: 'SHT25', varianteNombre: 'Potencia 25W · 110-250V', precio: 285.92, unidad: 'PEN' },
      { codigoInterno: '4009655', modelo: 'SHT75', varianteNombre: 'Potencia 75W · 110-250V', precio: 449.11, unidad: 'PEN' },
      { codigoInterno: '4009656', modelo: 'SHT100', varianteNombre: 'Potencia 100W · 110-250V', precio: 469.43, unidad: 'PEN' },
      { codigoInterno: '4009657', modelo: 'SHT150', varianteNombre: 'Potencia 150W · 110-250V', precio: 619.56, unidad: 'PEN' },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando creación de Productos Padre y Variantes...');

  for (const grupo of GRUPOS_PRODUCTOS) {
    // 1. Familia
    let familia = await prisma.familia.findUnique({
      where: { nombre: grupo.familia },
    });
    if (!familia) {
      familia = await prisma.familia.create({
        data: { nombre: grupo.familia, descripcion: `Familia de ${grupo.familia}` },
      });
    }

    // 2. Subfamilia
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

    // Obtener precio mínimo para el padre
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

    console.log(`\n👑 [PADRE] ${padre.nombre} (Desde ${grupo.unidad} ${precioBase})`);

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

      console.log(`   🔹 [VARIANTE ${v.codigoInterno}] ${v.modelo} - ${v.varianteNombre} (${v.unidad} ${v.precio})`);
    }
  }

  console.log('\n🎉 ¡Productos y Variantes registrados exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error al registrar variantes:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
