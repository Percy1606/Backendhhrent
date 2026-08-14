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

const GRUPOS_BREMAS: GrupoProductoPadre[] = [
  // 1. M-0-A
  {
    codigoPadre: 'BREMAS-M0A',
    nombre: 'Conmutador Selector Manual - 0 - Automático (M-0-A)',
    marca: 'Bremas',
    categoria: 'Conmutadores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Conmutadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador rotativo de leva Bremas para selección de modo Manual - Desconectado - Automático (M-0-A). Ideal para automatización de bombas, ventiladores y tableros de control.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
    variantes: [
      { codigoInterno: '4001567', modelo: 'CR0120005RT4A', varianteNombre: '1 Polo · 12A', precio: 109.24, unidad: 'PEN' },
      { codigoInterno: '4001568', modelo: 'CR0120006RT4A', varianteNombre: '2 Polos · 12A', precio: 141.47, unidad: 'PEN' },
      { codigoInterno: '4100071', modelo: 'CA0120007W20', varianteNombre: '3 Polos · 12A (Fijación W20)', precio: 163.03, unidad: 'PEN' },
      { codigoInterno: '4001569', modelo: 'CR0120007RT4A', varianteNombre: '3 Polos · 12A', precio: 171.60, unidad: 'PEN' },
    ],
  },

  // 2. CONMUTADOR 1-0-2 (1P y 2P)
  {
    codigoPadre: 'BREMAS-102-1P2P',
    nombre: 'Conmutador de Transferencia 1-0-2 Unipolar y Bipolar (12A - 100A)',
    marca: 'Bremas',
    categoria: 'Conmutadores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Conmutadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador de leva para selección de fuentes 1-0-2 en sistemas monofásicos y bipolares.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
    variantes: [
      { codigoInterno: '4001562', modelo: 'CR0120005RT4', varianteNombre: '1P · 12A', precio: 108.99, unidad: 'PEN' },
      { codigoInterno: '4020945', modelo: 'CR0160005RT4', varianteNombre: '1P · 16A', precio: 115.94, unidad: 'PEN' },
      { codigoInterno: '4100031', modelo: 'CA0250005PL2', varianteNombre: '1P · 25A', precio: 167.78, unidad: 'PEN' },
      { codigoInterno: '4021462', modelo: 'CR0120006RT4', varianteNombre: '2P · 12A', precio: 136.82, unidad: 'PEN' },
      { codigoInterno: '4022014', modelo: 'CR0160006RT6', varianteNombre: '2P · 16A', precio: 150.35, unidad: 'PEN' },
      { codigoInterno: '4021463', modelo: 'CR0250006RT6', varianteNombre: '2P · 25A', precio: 231.92, unidad: 'PEN' },
      { codigoInterno: '4100041', modelo: 'CA0400006PL2', varianteNombre: '2P · 40A (PL2)', precio: 447.60, unidad: 'PEN' },
      { codigoInterno: '4001571', modelo: 'CR0400006RT6', varianteNombre: '2P · 40A (RT6)', precio: 471.15, unidad: 'PEN' },
      { codigoInterno: '4100048', modelo: 'CA0500006PL3', varianteNombre: '2P · 50A', precio: 745.68, unidad: 'PEN' },
      { codigoInterno: '4100055', modelo: 'CA0630006PL3', varianteNombre: '2P · 63A', precio: 795.28, unidad: 'PEN' },
      { codigoInterno: '4100062', modelo: 'CA1000006PL4', varianteNombre: '2P · 100A', precio: 1736.88, unidad: 'PEN' },
    ],
  },

  // 3. CONMUTADOR 1-0-2 (3P y 4P)
  {
    codigoPadre: 'BREMAS-102-3P4P',
    nombre: 'Conmutador de Transferencia 1-0-2 Tripolar y Tetrapolar (12A - 100A)',
    marca: 'Bremas',
    categoria: 'Conmutadores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Conmutadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador de leva para transferencia de líneas y redes trifásicas (3P y 4P) de alta capacidad.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
    variantes: [
      { codigoInterno: '4100009', modelo: 'CA0120007PL1', varianteNombre: '3P · 12A', precio: 149.79, unidad: 'PEN' },
      { codigoInterno: '4021464', modelo: 'CR0160007RT6', varianteNombre: '3P · 16A', precio: 187.83, unidad: 'PEN' },
      { codigoInterno: '4021080', modelo: 'CR0250007RT6', varianteNombre: '3P · 25A', precio: 303.78, unidad: 'PEN' },
      { codigoInterno: '4021076', modelo: 'CR0320007RT6', varianteNombre: '3P · 32A', precio: 381.48, unidad: 'PEN' },
      { codigoInterno: '4021612', modelo: 'CR0400007RT6', varianteNombre: '3P · 40A', precio: 616.87, unidad: 'PEN' },
      { codigoInterno: '4100049', modelo: 'CA0500007PL3', varianteNombre: '3P · 50A', precio: 927.26, unidad: 'PEN' },
      { codigoInterno: '4100056', modelo: 'CA0630007PL3', varianteNombre: '3P · 63A', precio: 1066.34, unidad: 'PEN' },
      { codigoInterno: '4100063', modelo: 'CA1000007PL4', varianteNombre: '3P · 100A', precio: 2332.28, unidad: 'PEN' },
      { codigoInterno: '4100072', modelo: 'CA0120039PL1', varianteNombre: '4P · 12A', precio: 235.18, unidad: 'PEN' },
      { codigoInterno: '4100076', modelo: 'CA0250039PL2', varianteNombre: '4P · 25A', precio: 457.54, unidad: 'PEN' },
      { codigoInterno: '4100078', modelo: 'CA0500039PL3', varianteNombre: '4P · 50A', precio: 1085.57, unidad: 'PEN' },
      { codigoInterno: '4100080', modelo: 'CA0630039PL3', varianteNombre: '4P · 63A', precio: 1342.29, unidad: 'PEN' },
    ],
  },

  // 4. CONMUTADOR 1-0-2 CON RETORNO POR RESORTE
  {
    codigoPadre: 'BREMAS-102-RETORNO',
    nombre: 'Conmutador 1-0-2 con Retorno Automático a Cero por Resorte',
    marca: 'Bremas',
    categoria: 'Conmutadores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Conmutadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador de acción momentánea con retorno por resorte al punto cero al soltar la maneta.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
    variantes: [
      { codigoInterno: '4100067', modelo: 'CS0120077PL1', varianteNombre: '1P · 12A', precio: 101.35, unidad: 'PEN' },
      { codigoInterno: '4100070', modelo: 'CA0120481PL1V', varianteNombre: '3P · 12A', precio: 163.04, unidad: 'PEN' },
    ],
  },

  // 5. DOBLE VELOCIDAD Y VELOCIDAD CON INVERSIÓN
  {
    codigoPadre: 'BREMAS-VELOCIDADES',
    nombre: 'Conmutador Selector de Doble Velocidad e Inversor de Marcha',
    marca: 'Bremas',
    categoria: 'Conmutadores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Conmutadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador de leva para motores trifásicos de 2 velocidades (Dahlander / Devanados independientes) y esquemas con inversión de marcha.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
    variantes: [
      { codigoInterno: '4021465', modelo: 'CR0120009RT4', varianteNombre: 'Doble Vel 1-0-2 · 3P · 12A', precio: 201.77, unidad: 'PEN' },
      { codigoInterno: '4020946', modelo: 'CR0160009RT4', varianteNombre: 'Doble Vel 1-0-2 · 3P · 16A', precio: 229.56, unidad: 'PEN' },
      { codigoInterno: '4021466', modelo: 'CR0250009RT6', varianteNombre: 'Doble Vel 1-0-2 · 3P · 25A', precio: 380.33, unidad: 'PEN' },
      { codigoInterno: '4021077', modelo: 'CR0400009RT6', varianteNombre: 'Doble Vel 1-0-2 · 3P · 40A', precio: 732.84, unidad: 'PEN' },
      { codigoInterno: '4100051', modelo: 'CA0500009PL3', varianteNombre: 'Doble Vel 1-0-2 · 3P · 50A', precio: 1098.74, unidad: 'PEN' },
      { codigoInterno: '4100058', modelo: 'CA0630009PL3', varianteNombre: 'Doble Vel 1-0-2 · 3P · 63A', precio: 1405.74, unidad: 'PEN' },
      { codigoInterno: '4100073', modelo: 'CS0127837W21', varianteNombre: 'Doble Vel 0-1-2 · 3P · 12A', precio: 200.48, unidad: 'PEN' },
      { codigoInterno: '4100077', modelo: 'CS0257837PL2', varianteNombre: 'Doble Vel 0-1-2 · 3P · 25A', precio: 361.32, unidad: 'PEN' },
      { codigoInterno: '4100079', modelo: 'CS0407837PL3', varianteNombre: 'Doble Vel 0-1-2 · 3P · 50A', precio: 663.11, unidad: 'PEN' },
      { codigoInterno: '4104660', modelo: 'CS0637837PL3', varianteNombre: 'Doble Vel 0-1-2 · 3P · 63A', precio: 883.43, unidad: 'PEN' },
      { codigoInterno: '4100013', modelo: 'CA0120011PL1', varianteNombre: 'Inversor 2-0-1-0-1-0-2 · 3P · 12A', precio: 293.02, unidad: 'PEN' },
      { codigoInterno: '4100037', modelo: 'CA0250011PL2', varianteNombre: 'Inversor 2-0-1-0-1-0-2 · 3P · 25A', precio: 478.06, unidad: 'PEN' },
    ],
  },

  // 6. ESTRELLA - TRIÁNGULO
  {
    codigoPadre: 'BREMAS-ESTRELLA-TRIANGULO',
    nombre: 'Conmutador Arrancador Estrella - Triángulo (0 - Y - Δ)',
    marca: 'Bremas',
    categoria: 'Conmutadores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Conmutadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador rotativo manual de 3 posiciones para arranque reducido Estrella-Triángulo de motores trifásicos de jaula de ardilla.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
    variantes: [
      { codigoInterno: '4100027', modelo: 'CA0160010PL2', varianteNombre: '16 Amperios', precio: 215.90, unidad: 'PEN' },
      { codigoInterno: '4100036', modelo: 'CA0250010PL2', varianteNombre: '25 Amperios', precio: 356.90, unidad: 'PEN' },
      { codigoInterno: '4100045', modelo: 'CA0400010PL2', varianteNombre: '40 Amperios', precio: 696.21, unidad: 'PEN' },
      { codigoInterno: '4100052', modelo: 'CA0500010PL3', varianteNombre: '50 Amperios', precio: 1173.50, unidad: 'PEN' },
      { codigoInterno: '4100059', modelo: 'CA0630010PL3', varianteNombre: '63 Amperios', precio: 1486.84, unidad: 'PEN' },
    ],
  },

  // 7. MEDICIÓN (VOLTÍMETROS Y AMPERÍMETROS)
  {
    codigoPadre: 'BREMAS-VOLTIMETRICOS-AMPERIMETRICOS',
    nombre: 'Conmutador Selector de Medición Voltímétrico y Amperímétrico',
    marca: 'Bremas',
    categoria: 'Conmutadores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Conmutadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador de maniobra e instrumentación para selección de fases en lectura de voltímetros y amperímetros en tableros eléctricos.',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
    variantes: [
      { codigoInterno: '4020941', modelo: 'CR0120016RT4', varianteNombre: 'Voltímetro 4 Pos (0-L1L2-L2L3-L3L1)', precio: 132.18, unidad: 'PEN' },
      { codigoInterno: '4100016', modelo: 'CA0120018PL1', varianteNombre: 'Voltímetro 7 Pos (L3L1..0..L3N) (PL1)', precio: 160.80, unidad: 'PEN' },
      { codigoInterno: '4001565', modelo: 'CR0120018RT4', varianteNombre: 'Voltímetro 7 Pos (L3L1..0..L3N) (RT4)', precio: 169.26, unidad: 'PEN' },
      { codigoInterno: '4020942', modelo: 'CR0120022RT4', varianteNombre: 'Amperímetro 3 CT 1P (0-1-2-3)', precio: 169.26, unidad: 'PEN' },
      { codigoInterno: '4100018', modelo: 'CA0120025PL1', varianteNombre: 'Amperímetro 3 CT 2P (0-1-2-3)', precio: 322.00, unidad: 'PEN' },
      { codigoInterno: '4100075', modelo: 'CS0127839W21', varianteNombre: 'Amperímetro 0-R-S-T', precio: 123.38, unidad: 'PEN' },
      { codigoInterno: '4104657', modelo: 'CA0250014PL2', varianteNombre: 'Amperímetro 0-R-0-S-0-T (25A)', precio: 422.98, unidad: 'PEN' },
    ],
  },

  // 8. ALTERNANCIA DE BOMBAS
  {
    codigoPadre: 'BREMAS-BOMBAS-ALT',
    nombre: 'Conmutador Selector para Control de Bombas de Agua (0-B1-B2-ALT)',
    marca: 'Bremas',
    categoria: 'Conmutadores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Conmutadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador especial para selección de bomba 1, bomba 2, parada (0) o modo automático alternado (ALT).',
    imagenUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
    variantes: [
      { codigoInterno: '4021078', modelo: 'CR0127838W21', varianteNombre: '12 Amperios · Selección 0-B1-B2-ALT', precio: 147.15, unidad: 'PEN' },
    ],
  },
];

async function main() {
  console.log('🚀 Registrando Conmutadores Bremas como Productos Padre e Hijos...');

  for (const grupo of GRUPOS_BREMAS) {
    let familia = await prisma.familia.findUnique({ where: { nombre: grupo.familia } });
    if (!familia) {
      familia = await prisma.familia.create({
        data: { nombre: grupo.familia, descripcion: `Familia de ${grupo.familia}` },
      });
    }

    let subfamilia = await prisma.subfamilia.findUnique({
      where: { familiaId_nombre: { familiaId: familia.id, nombre: grupo.subfamilia } },
    });
    if (!subfamilia) {
      subfamilia = await prisma.subfamilia.create({
        data: { nombre: grupo.subfamilia, familiaId: familia.id },
      });
    }

    const precios = grupo.variantes.map((v) => v.precio);
    const precioBase = Math.min(...precios);

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

    console.log(`\n👑 [PADRE] ${padre.nombre} (Desde S/ ${precioBase})`);

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
      console.log(`   🔹 [VARIANTE ${v.codigoInterno}] ${v.modelo} - ${v.varianteNombre} (S/ ${v.precio})`);
    }
  }

  console.log('\n🎉 Conmutadores Bremas importados con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error al registrar Bremas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
