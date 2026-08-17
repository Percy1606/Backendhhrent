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
  // 1. SOCOMEC - ANALIZADORES Y MEDIDORES DIRIS
  {
    codigoPadre: 'SOC-DIRIS-A20-A30',
    nombre: 'Analizador de Redes y Módulos DIRIS',
    marca: 'Socomec',
    categoria: 'Analizadores y Medidores',
    familia: 'Equipos de Medición',
    subfamilia: 'Multímetros',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Analizadores de redes eléctricas multifunción serie DIRIS y módulos de expansión de comunicación RS485 y memoria.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
    variantes: [
      { codigoInterno: '4006333', modelo: '48250200', varianteNombre: 'ANALIZADOR DE REDES DIRIS A20', precio: 744.97, unidad: 'PEN' },
      { codigoInterno: '4006334', modelo: '48250082', varianteNombre: 'MODULO DE COMUNICACIÓN RS485 DIRIS A20', precio: 311.22, unidad: 'PEN' },
      { codigoInterno: '4003319', modelo: '48250097', varianteNombre: 'MODULO DE MEMORIA PARA DIRIS A30/A41', precio: 1285.28, unidad: 'PEN' },
    ],
  },

  // 2. SOCOMEC - ACCESORIOS PARA TRANSFERENCIA ATYS
  {
    codigoPadre: 'SOC-ATYS-ACCESORIOS',
    nombre: 'Interfaces Remotas y Fuentes DPS para Conmutadores ATyS',
    marca: 'Socomec',
    categoria: 'Accesorios para Transferencia',
    familia: 'Accesorios',
    subfamilia: 'Adaptadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Interfaces de visualización y control remoto ATyS D10/D20 y fuente de doble alimentación DPS para conmutadores de transferencia Socomec.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4008480', modelo: '1599 2010', varianteNombre: 'ATYS D10 INTERFACE VISUAL.REMOTO', precio: 1059.29, unidad: 'PEN' },
      { codigoInterno: '4008481', modelo: '1599 2020', varianteNombre: 'ATYS D20 INTERFACE VISUAL/C.REMOTO', precio: 1612.25, unidad: 'PEN' },
      { codigoInterno: '4008479', modelo: '1599 4001', varianteNombre: 'DPS FUENTE DOBLE ALIM.PARA ATYS 3S', precio: 1198.10, unidad: 'PEN' },
    ],
  },

  // 3. SOCOMEC - CONMUTADORES MOTORIZADOS ATYS S
  {
    codigoPadre: 'SOC-ATYS-S-MOTOR',
    nombre: 'Conmutador de Potencia Motorizado ATyS S 230V',
    marca: 'Socomec',
    categoria: 'Conmutadores de Potencia Motorizados',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutadores de transferencia motorizados tripolares y tetrapolares serie ATyS S de 40A a 125A 230V AC.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4015696', modelo: '95034004', varianteNombre: '4X40A 230V', precio: 1676.88, unidad: 'PEN' },
      { codigoInterno: '4015697', modelo: '95034006', varianteNombre: '4X63A 230V', precio: 1718.14, unidad: 'PEN' },
      { codigoInterno: '4015698', modelo: '95034008', varianteNombre: '4X80A 230V', precio: 1763.28, unidad: 'PEN' },
      { codigoInterno: '4015699', modelo: '95034010', varianteNombre: '4X100A 230V', precio: 1879.92, unidad: 'PEN' },
      { codigoInterno: '4015700', modelo: '95034012', varianteNombre: '4X125A 230V', precio: 2332.08, unidad: 'PEN' },
    ],
  },

  // 4. SOCOMEC - CONMUTADORES MOTORIZADOS ATYS R (3P y 4P 160A-1600A y ATYS6E)
  {
    codigoPadre: 'SOC-ATYS-R-MOTOR',
    nombre: 'Conmutador de Potencia Motorizado ATyS R / ATyS 6e 230V',
    marca: 'Socomec',
    categoria: 'Conmutadores de Potencia Motorizados',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutadores motorizados de gran potencia ATyS R y ATyS 6e de 160A hasta 1600A en ejecuciones 3P y 4P 230V.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4008469', modelo: '95233016', varianteNombre: 'ATYS R 3X160A 230V', precio: 3507.58, unidad: 'PEN' },
      { codigoInterno: '4022862', modelo: '95234016', varianteNombre: 'ATYS R 4X160A 230V', precio: 4478.65, unidad: 'PEN' },
      { codigoInterno: '4008470', modelo: '95233025', varianteNombre: 'ATYS R 3X250A 230V', precio: 4287.74, unidad: 'PEN' },
      { codigoInterno: '4022865', modelo: '95234025', varianteNombre: 'ATYS R 4X250A 230V', precio: 4287.74, unidad: 'PEN' },
      { codigoInterno: '4008471', modelo: '95233040', varianteNombre: 'ATYS R 3X400A 230V', precio: 5376.24, unidad: 'PEN' },
      { codigoInterno: '4018404', modelo: '95234040', varianteNombre: 'ATYS R 4X400A 230V', precio: 5376.24, unidad: 'PEN' },
      { codigoInterno: '4008472', modelo: '95233063', varianteNombre: 'ATYS R 3X630A 230V', precio: 7161.12, unidad: 'PEN' },
      { codigoInterno: '4022866', modelo: '95234063', varianteNombre: 'ATYS R 4X630A 230V', precio: 7161.12, unidad: 'PEN' },
      { codigoInterno: '4008473', modelo: '95233080', varianteNombre: 'ATYS R 3X800A 230V', precio: 8189.28, unidad: 'PEN' },
      { codigoInterno: '4022867', modelo: '95234080', varianteNombre: 'ATYS R 4X800A 230V', precio: 8189.28, unidad: 'PEN' },
      { codigoInterno: '4008474', modelo: '95233100', varianteNombre: 'ATYS R 3X1000A 230V', precio: 11535.12, unidad: 'PEN' },
      { codigoInterno: '4021029', modelo: '95234100', varianteNombre: 'ATYS R 4X1000A 230V', precio: 11535.12, unidad: 'PEN' },
      { codigoInterno: '4008475', modelo: '95233120', varianteNombre: 'ATYS R 3X1250A 230V', precio: 13026.24, unidad: 'PEN' },
      { codigoInterno: '4008476', modelo: '95233160', varianteNombre: 'ATYS R 3X1600A 230V', precio: 20313.36, unidad: 'PEN' },
      { codigoInterno: '4008477', modelo: '1563 3063', varianteNombre: 'ATYS6E 3X630A 230V', precio: 12833.89, unidad: 'PEN' },
    ],
  },

  // 5. SOCOMEC - PLETINAS DE PUENTEADO ATYS
  {
    codigoPadre: 'SOC-ATYS-PLETINA-PUENTE',
    nombre: 'Pletina de Puenteado para Conmutadores ATyS d / ATyS R',
    marca: 'Socomec',
    categoria: 'Accesorios para Transferencia',
    familia: 'Accesorios',
    subfamilia: 'Adaptadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Pletinas de puenteado para conexión de fases/polos en conmutadores de transferencia Socomec ATyS d y ATyS R de 40A a 1600A.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4018814', modelo: '9509 4013', varianteNombre: '40A - 125A (ATYSd)', precio: 580.57, unidad: 'PEN' },
      { codigoInterno: '4018823', modelo: '4109 3019', varianteNombre: '160A (ATYS R)', precio: 463.06, unidad: 'PEN' },
      { codigoInterno: '4018815', modelo: '4109 3025', varianteNombre: '250A (ATYS R)', precio: 674.94, unidad: 'PEN' },
      { codigoInterno: '4018816', modelo: '4109 3039', varianteNombre: '400A (ATYS R)', precio: 831.90, unidad: 'PEN' },
      { codigoInterno: '4018817', modelo: '4109 3063', varianteNombre: '630A (ATYS R)', precio: 1035.96, unidad: 'PEN' },
      { codigoInterno: '4018818', modelo: '4109 3080', varianteNombre: '800A - 1000A (ATYS R)', precio: 1428.39, unidad: 'PEN' },
      { codigoInterno: '4018819', modelo: '4109 3120', varianteNombre: '1250A (ATYS R)', precio: 1946.38, unidad: 'PEN' },
      { codigoInterno: '4018820', modelo: '4109 3160', varianteNombre: '1600A (ATYS R)', precio: 3453.23, unidad: 'PEN' },
    ],
  },

  // 6. SOCOMEC - CONMUTADORES MANUALES SIRCOVER
  {
    codigoPadre: 'SOC-SIRCOVER-MANUAL',
    nombre: 'Conmutador SIRCOVER Manual I-0-II Tripolar (160A - 630A)',
    marca: 'Socomec',
    categoria: 'Conmutadores de Potencia Manuales',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Conmutadores de potencia manuales 3P con posición I-0-II serie SIRCOVER y mando de accionamiento.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4017479', modelo: '41AC3016', varianteNombre: '3X160A', precio: 2321.71, unidad: 'PEN' },
      { codigoInterno: '4017480', modelo: '41AC3020', varianteNombre: '3X200A', precio: 3174.59, unidad: 'PEN' },
      { codigoInterno: '4017481', modelo: '41AC3025', varianteNombre: '3X250A', precio: 3882.82, unidad: 'PEN' },
      { codigoInterno: '4017482', modelo: '41AC3040', varianteNombre: '3X400A', precio: 5074.41, unidad: 'PEN' },
      { codigoInterno: '4017483', modelo: '41AC3063', varianteNombre: '3X630A', precio: 5614.55, unidad: 'PEN' },
      { codigoInterno: '4017484', modelo: '11221111', varianteNombre: 'MANDO P/ACCIONAMIENTO 125A-630A', precio: 134.45, unidad: 'PEN' },
    ],
  },

  // 7. SOCOMEC - TRANSFORMADORES DE CORRIENTE (50/5 A 2000/5)
  {
    codigoPadre: 'SOC-TRANSF-CORRIENTE-5A',
    nombre: 'Transformador de Corriente Socomec Secundario 5A',
    marca: 'Socomec',
    categoria: 'Transformadores de Corriente',
    familia: 'Equipos de Medición',
    subfamilia: 'Multímetros',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Transformadores de corriente de alta precisión con relación X/5A para equipos de medida y protección.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800',
    variantes: [
      { codigoInterno: '4009729', modelo: '192T2305', varianteNombre: '50/5 A', precio: 127.06, unidad: 'PEN' },
      { codigoInterno: '4011598', modelo: '192T2307', varianteNombre: '75/5 A', precio: 261.98, unidad: 'PEN' },
      { codigoInterno: '4011771', modelo: '192T2310', varianteNombre: '100/5 A', precio: 261.98, unidad: 'PEN' },
      { codigoInterno: '4012121', modelo: '192T2315', varianteNombre: '150/5 A', precio: 261.98, unidad: 'PEN' },
      { codigoInterno: '4012127', modelo: '192T2320', varianteNombre: '200/5 A', precio: 295.92, unidad: 'PEN' },
      { codigoInterno: '4009722', modelo: '192T2425', varianteNombre: '250/5 A', precio: 323.22, unidad: 'PEN' },
      { codigoInterno: '4010440', modelo: '192T2430', varianteNombre: '300/5 A', precio: 330.06, unidad: 'PEN' },
      { codigoInterno: '4009723', modelo: '192T5040', varianteNombre: '400/5 A', precio: 384.36, unidad: 'PEN' },
      { codigoInterno: '4010264', modelo: '192T5050', varianteNombre: '500/5 A', precio: 388.01, unidad: 'PEN' },
      { codigoInterno: '4009724', modelo: '192T5060', varianteNombre: '600/5 A', precio: 416.28, unidad: 'PEN' },
      { codigoInterno: '4010703', modelo: '192T5080', varianteNombre: '800/5 A', precio: 445.92, unidad: 'PEN' },
      { codigoInterno: '4012251', modelo: '192T8190', varianteNombre: '1000/5 A', precio: 574.93, unidad: 'PEN' },
      { codigoInterno: '4010530', modelo: '192T8192', varianteNombre: '1250/5 A', precio: 660.10, unidad: 'PEN' },
      { codigoInterno: '4011012', modelo: '192T8194', varianteNombre: '1600/5 A', precio: 697.54, unidad: 'PEN' },
      { codigoInterno: '4009727', modelo: '192T9696', varianteNombre: '2000/5 A', precio: 908.37, unidad: 'PEN' },
    ],
  },

  // 8. TOSHIBA - VARIADORES DE FRECUENCIA AS3 480VAC
  {
    codigoPadre: 'TOSH-VFD-AS3-480V',
    nombre: 'Variador de Frecuencia Toshiba AS3 480VAC',
    marca: 'Toshiba',
    categoria: 'Variadores 480VAC',
    familia: 'Equipos Especiales',
    subfamilia: 'Celdas de MT',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Variadores de frecuencia Toshiba alta gama serie AS3 480VAC con teclado (KPD) y reactor DC integrado (DCR).',
    imagenUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800',
    variantes: [
      { codigoInterno: '4018890', modelo: 'VFAS3-4110PC', varianteNombre: '20HP · 31.7A · 480V', precio: 9773.12, unidad: 'PEN' },
      { codigoInterno: '4019496', modelo: 'VFAS3-4150PC', varianteNombre: '25HP · 39.2A · 480V', precio: 11233.85, unidad: 'PEN' },
      { codigoInterno: '4019497', modelo: 'VFAS3-4220PC', varianteNombre: '40HP · 61.5A · 480V', precio: 15323.72, unidad: 'PEN' },
      { codigoInterno: '4018893', modelo: 'VFAS3-4750PC', varianteNombre: '125HP · 173A · 480V', precio: 38203.08, unidad: 'PEN' },
    ],
  },

  // 9. TOSHIBA - ACCESORIOS AS3
  {
    codigoPadre: 'TOSH-ACCESORIOS-AS3',
    nombre: 'Accesorios y Keypads para Variadores Toshiba AS3',
    marca: 'Toshiba',
    categoria: 'Accesorios AS3',
    familia: 'Accesorios',
    subfamilia: 'Adaptadores',
    tipo: TipoTransaccion.VENTA,
    unidad: 'PEN',
    descripcion: 'Accesorios y paneles de mando de puerta / teclado para variadores de velocidad Toshiba AS3.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4019453', modelo: 'SBP010Z', varianteNombre: 'KIT MONTAJE DE KEYPAD AS3 EN PUERTA', precio: 516.05, unidad: 'PEN' },
      { codigoInterno: '4020460', modelo: '103001', varianteNombre: 'KEYPAD AS3', precio: 2416.30, unidad: 'PEN' },
    ],
  },
];

async function main() {
  console.log('🚀 Cargando catálogo Socomec y Toshiba...');

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
