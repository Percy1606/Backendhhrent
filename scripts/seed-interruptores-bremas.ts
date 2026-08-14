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

const GRUPOS_INTERRUPTORES: GrupoProductoPadre[] = [
  // 1. INTERRUPTORES ROTATIVOS ON-OFF (0-1) 1P Y 2P
  {
    codigoPadre: 'BREMAS-INT-01-1P2P',
    nombre: 'Interruptor Selector Rotativo ON-OFF 0-1 Monofásico y Bipolar (12A - 100A)',
    marca: 'Bremas',
    categoria: 'Interruptores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Interruptores de Leva',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptor rotativo principal y de mando de 2 posiciones 0-1 (Apagado / Encendido) de 1 y 2 polos para control de cargas eléctricas.',
    imagenUrl: '/uploads/bremas_conmutador.jpg',
    variantes: [
      { codigoInterno: '4001561', modelo: 'CR0120001RT4', varianteNombre: '1 Polo · 12A', precio: 95.08, unidad: 'PEN' },
      { codigoInterno: '4020939', modelo: 'CR0120002RT4', varianteNombre: '2 Polos · 12A', precio: 90.43, unidad: 'PEN' },
      { codigoInterno: '4020944', modelo: 'CR0160002RT4', varianteNombre: '2 Polos · 16A', precio: 113.62, unidad: 'PEN' },
      { codigoInterno: '4100028', modelo: 'CA0250002PL2', varianteNombre: '2 Polos · 25A', precio: 209.63, unidad: 'PEN' },
      { codigoInterno: '4021734', modelo: 'CR0320002RT6', varianteNombre: '2 Polos · 32A', precio: 231.11, unidad: 'PEN' },
      { codigoInterno: '4100046', modelo: 'CA0500002PL3', varianteNombre: '2 Polos · 50A', precio: 315.06, unidad: 'PEN' },
      { codigoInterno: '4100053', modelo: 'CA0630002PL3', varianteNombre: '2 Polos · 63A', precio: 381.11, unidad: 'PEN' },
      { codigoInterno: '4100060', modelo: 'CA1000002PL4', varianteNombre: '2 Polos · 100A', precio: 1004.20, unidad: 'PEN' },
      { codigoInterno: '4100003', modelo: 'CA0120002CO1N', varianteNombre: '2 Polos · 12A con Llave de Seguridad', precio: 288.00, unidad: 'PEN' },
    ],
  },

  // 2. INTERRUPTORES ROTATIVOS ON-OFF (0-1) 3P Y 4P
  {
    codigoPadre: 'BREMAS-INT-01-3P4P',
    nombre: 'Interruptor Selector Rotativo ON-OFF 0-1 Tripolar y Tetrapolar (12A - 100A)',
    marca: 'Bremas',
    categoria: 'Interruptores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Interruptores de Leva',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interruptor de maniobra y seccionamiento general de 3 y 4 polos trifásico.',
    imagenUrl: '/uploads/bremas_conmutador.jpg',
    variantes: [
      { codigoInterno: '4020940', modelo: 'CR0120003RT4', varianteNombre: '3 Polos · 12A', precio: 104.35, unidad: 'PEN' },
      { codigoInterno: '4021467', modelo: 'CR0160003RT6', varianteNombre: '3 Polos · 16A', precio: 132.18, unidad: 'PEN' },
      { codigoInterno: '4021732', modelo: 'CR0250003RT6', varianteNombre: '3 Polos · 25A', precio: 198.94, unidad: 'PEN' },
      { codigoInterno: '4020947', modelo: 'CR0320003RT6', varianteNombre: '3 Polos · 32A', precio: 393.08, unidad: 'PEN' },
      { codigoInterno: '4021613', modelo: 'CR0400003RT6', varianteNombre: '3 Polos · 40A', precio: 420.77, unidad: 'PEN' },
      { codigoInterno: '4100047', modelo: 'CA0500003PL3', varianteNombre: '3 Polos · 50A', precio: 567.42, unidad: 'PEN' },
      { codigoInterno: '4100054', modelo: 'CA0630003PL3', varianteNombre: '3 Polos · 63A', precio: 668.02, unidad: 'PEN' },
      { codigoInterno: '4100061', modelo: 'CA1000003PL4', varianteNombre: '3 Polos · 100A', precio: 1485.95, unidad: 'PEN' },
      { codigoInterno: '4100005', modelo: 'CA0120004PL1', varianteNombre: '4 Polos · 12A', precio: 148.61, unidad: 'PEN' },
      { codigoInterno: '4100030', modelo: 'CA0250004PL2', varianteNombre: '4 Polos · 25A', precio: 302.06, unidad: 'PEN' },
    ],
  },

  // 3. INVERSORES DE MARCHA MOTOR 1-0-2
  {
    codigoPadre: 'BREMAS-INV-MARCHA',
    nombre: 'Inversor de Marcha de Leva 1-0-2 para Motores Trifásicos (12A - 63A)',
    marca: 'Bremas',
    categoria: 'Interruptores Rotativos',
    familia: 'Equipos Eléctricos',
    subfamilia: 'Inversores de Marcha',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutador inversor de giro 3 Polos (Forward / Off / Reverse) para motores eléctricos trifásicos.',
    imagenUrl: '/uploads/bremas_conmutador.jpg',
    variantes: [
      { codigoInterno: '4100010', modelo: 'CA0120008PL1', varianteNombre: '3 Polos · 12A', precio: 149.79, unidad: 'PEN' },
      { codigoInterno: '4100025', modelo: 'CA0160008PL2', varianteNombre: '3 Polos · 16A', precio: 169.63, unidad: 'PEN' },
      { codigoInterno: '4021733', modelo: 'CR0250008RT6', varianteNombre: '3 Polos · 25A', precio: 284.52, unidad: 'PEN' },
      { codigoInterno: '4020948', modelo: 'CR0400008RT6', varianteNombre: '3 Polos · 40A', precio: 542.39, unidad: 'PEN' },
      { codigoInterno: '4100050', modelo: 'CA0500008PL3', varianteNombre: '3 Polos · 50A', precio: 904.48, unidad: 'PEN' },
      { codigoInterno: '4100057', modelo: 'CA0630008PL3', varianteNombre: '3 Polos · 63A', precio: 1069.49, unidad: 'PEN' },
      { codigoInterno: '4100019', modelo: 'CA0120036PL1', varianteNombre: '3 Polos · 12A con Retorno a Cero por Resorte', precio: 217.72, unidad: 'PEN' },
    ],
  },
];

async function main() {
  console.log('🚀 Importando Interruptores e Inversores Bremas...');

  for (const grupo of GRUPOS_INTERRUPTORES) {
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

  console.log('\n🎉 Interruptores e Inversores Bremas registrados exitosamente.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
