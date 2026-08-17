import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

// =========================================================================
// ESTRUCTURA DE THERMOWELD - SOLDADURA EXOTÉRMICA Y MOLDES DE GRAFITO
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

const GRUPOS_THERMOWELD: GrupoProductoPadre[] = [
  // 1. CÁPSULAS DE CARGA DE SOLDADURA EXOTÉRMICA
  {
    codigoPadre: 'TW-CAPSULA-SOLDADURA',
    nombre: 'Cápsula de Carga para Soldadura Exotérmica',
    marca: 'Thermoweld',
    categoria: 'Sistemas de Puesta a Tierra',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Cargas y Cápsulas de Soldadura',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cartucho / cápsula de mezcla de soldadura exotérmica (óxido de cobre y aluminio) para uniones permanentes de alta conductividad eléctrica en pozos de tierra.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024777', modelo: '45-172', varianteNombre: 'Cápsula #45', precio: 7.60 },
      { codigoInterno: '4024778', modelo: '65-172', varianteNombre: 'Cápsula #65', precio: 8.20 },
      { codigoInterno: '4024779', modelo: '90-172', varianteNombre: 'Cápsula #90', precio: 11.00 },
      { codigoInterno: '4024780', modelo: '115-172', varianteNombre: 'Cápsula #115', precio: 13.60 },
      { codigoInterno: '4024781', modelo: '150-172', varianteNombre: 'Cápsula #150', precio: 16.00 },
      { codigoInterno: '4024782', modelo: '200-172', varianteNombre: 'Cápsula #200', precio: 19.60 },
      { codigoInterno: '4024783', modelo: '250-172', varianteNombre: 'Cápsula #250', precio: 23.00 },
    ],
  },
  // 2. ACCESORIOS Y HERRAMIENTAS DE LIMPIEZA / ENCENDIDO
  {
    codigoPadre: 'TW-TENAZA-B106',
    nombre: 'Tenaza de Apriete B106 para Molde de Grafito',
    marca: 'Thermoweld',
    categoria: 'Herramientas de Soldadura Exotérmica',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Accesorios y Herramientas de Soldadura',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Tenaza / alicate de ajuste de alta resistencia B106 para sujeción de moldes de grafito estándar durante la fusión exotérmica.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024784', modelo: 'B106', varianteNombre: 'Tenaza B106 Estándar', precio: 168.00 },
    ],
  },
  {
    codigoPadre: 'TW-CEPILLO-MOLDE',
    nombre: 'Cepillo de Limpieza para Moldes y Cable',
    marca: 'Thermoweld',
    categoria: 'Herramientas de Soldadura Exotérmica',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Accesorios y Herramientas de Soldadura',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Cepillo especial de cerdas de alambre para la limpieza de la cavidad del molde de grafito y conductores de cobre.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024785', modelo: '38-3922-00', varianteNombre: 'Cepillo de Limpieza 38-3922-00', precio: 25.00 },
    ],
  },
  {
    codigoPadre: 'TW-ESPATULA-LIMPIEZA',
    nombre: 'Espátula de Limpieza para Molde (#90A a #500)',
    marca: 'Thermoweld',
    categoria: 'Herramientas de Soldadura Exotérmica',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Accesorios y Herramientas de Soldadura',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Rascador / espátula curvada para retirar la escoria acumulada en el crisol de moldes de grafito.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024786', modelo: '40-0319-03', varianteNombre: 'Espátula Molde #90A - #500', precio: 25.00 },
    ],
  },
  {
    codigoPadre: 'TW-CHISPERO',
    nombre: 'Chispero Manual para Encendido de Polvo de Inserción',
    marca: 'Thermoweld',
    categoria: 'Herramientas de Soldadura Exotérmica',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Accesorios y Herramientas de Soldadura',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Pistola chispera / encendedor de chispa de piedra para iniciar la reacción exotérmica de forma segura.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024787', modelo: '38-0309-00', varianteNombre: 'Chispero Iniciador 38-0309-00', precio: 18.40 },
    ],
  },
  {
    codigoPadre: 'TW-MASILLA-SELLANTE',
    nombre: 'Masilla Sellante para Molde de Grafito (1 LB)',
    marca: 'Thermoweld',
    categoria: 'Accesorios de Soldadura Exotérmica',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Accesorios y Herramientas de Soldadura',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Masilla termo-resistente de 1 libra para sellar holguras en las entradas de conductores del molde y evitar fugas de metal fundido.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024788', modelo: '38-4129-01', varianteNombre: 'Masilla Sellante 1 LB', precio: 20.80 },
    ],
  },
  // 3. MOLDES LINEALES (CC1 CABLE A CABLE PASANTE / A TOPE)
  {
    codigoPadre: 'TW-MOLDE-LINEAL-CC1',
    nombre: 'Molde de Grafito Lineal CC1 (Cable a Cable A Tope / Pasante)',
    marca: 'Thermoweld',
    categoria: 'Moldes de Grafito Exotérmicos',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Moldes Cable a Cable (CC)',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Molde de grafito para empalme o unión lineal continua CC1 entre cables de cobre pasantes.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024792', modelo: 'M-203', varianteNombre: 'Conexión 2 AWG a 2 AWG', precio: 165.00 },
      { codigoInterno: '4024791', modelo: 'M-205', varianteNombre: 'Conexión 1/0 AWG a 1/0 AWG', precio: 165.00 },
      { codigoInterno: '4024790', modelo: 'M-206', varianteNombre: 'Conexión 2/0 AWG a 2/0 AWG', precio: 165.00 },
      { codigoInterno: '4024789', modelo: 'M-208', varianteNombre: 'Conexión 4/0 AWG a 4/0 AWG', precio: 165.00 },
      { codigoInterno: '4024793', modelo: 'M-3011', varianteNombre: 'Conexión 120 mm² a 120 mm²', precio: 165.00 },
    ],
  },
  // 4. MOLDES PARALELOS (CC7 CABLE A CABLE PARALELO)
  {
    codigoPadre: 'TW-MOLDE-PARALELO-CC7',
    nombre: 'Molde de Grafito Paralelo CC7 (Cable a Cable)',
    marca: 'Thermoweld',
    categoria: 'Moldes de Grafito Exotérmicos',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Moldes Cable a Cable (CC)',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Molde de grafito tipo CC7 para unión en paralelo de dos conductores de cobre en malla a tierra.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024796', modelo: 'M-1322', varianteNombre: 'Conexión 2/0 AWG a 2/0 AWG', precio: 155.00 },
      { codigoInterno: '4024795', modelo: 'M-1333', varianteNombre: 'Conexión 4/0 AWG a 2/0 AWG', precio: 175.00 },
      { codigoInterno: '4024794', modelo: 'M-1331', varianteNombre: 'Conexión 4/0 AWG a 4/0 AWG', precio: 175.00 },
    ],
  },
  // 5. MOLDES TIPO "T" (CC2 CABLE A CABLE DERIVACIÓN)
  {
    codigoPadre: 'TW-MOLDE-T-CC2',
    nombre: 'Molde de Grafito Tipo T CC2 (Cable a Cable Derivación)',
    marca: 'Thermoweld',
    categoria: 'Moldes de Grafito Exotérmicos',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Moldes Cable a Cable (CC)',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Molde de grafito en forma de "T" tipo CC2 para derivación perpendicular de cable principal a secundario en mallas.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024805', modelo: 'M-223', varianteNombre: 'Conexión 2 AWG a 2 AWG', precio: 165.00 },
      { codigoInterno: '4024804', modelo: 'M-228', varianteNombre: 'Conexión 1/0 AWG a 1/0 AWG', precio: 165.00 },
      { codigoInterno: '4024803', modelo: 'M-235', varianteNombre: 'Conexión 2/0 AWG a 2 AWG', precio: 165.00 },
      { codigoInterno: '4024802', modelo: 'M-232', varianteNombre: 'Conexión 2/0 AWG a 2/0 AWG', precio: 165.00 },
      { codigoInterno: '4024801', modelo: 'M-246', varianteNombre: 'Conexión 4/0 AWG a 2 AWG', precio: 165.00 },
      { codigoInterno: '4024800', modelo: 'M-243', varianteNombre: 'Conexión 4/0 AWG a 2/0 AWG', precio: 165.00 },
      { codigoInterno: '4024799', modelo: 'M-241', varianteNombre: 'Conexión 4/0 AWG a 4/0 AWG', precio: 165.00 },
      { codigoInterno: '4024798', modelo: 'M-250', varianteNombre: 'Conexión 250 MCM a 2/0 AWG', precio: 165.00 },
      { codigoInterno: '4024797', modelo: 'M-247', varianteNombre: 'Conexión 250 MCM a 250 MCM', precio: 165.00 },
      { codigoInterno: '4024806', modelo: 'M-3047', varianteNombre: 'Conexión 120 mm² a 120 mm²', precio: 165.00 },
    ],
  },
  // 6. MOLDES TIPO "X" (CC4 CABLE A CABLE CRUZADO)
  {
    codigoPadre: 'TW-MOLDE-X-CC4',
    nombre: 'Molde de Grafito Tipo X CC4 (Cable a Cable Cruzado)',
    marca: 'Thermoweld',
    categoria: 'Moldes de Grafito Exotérmicos',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Moldes Cable a Cable (CC)',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Molde de grafito en cruce "X" plano tipo CC4 para unión de retícula en mallas de tierra.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024812', modelo: 'M-425', varianteNombre: 'Conexión 2 AWG a 2 AWG', precio: 165.00 },
      { codigoInterno: '4024811', modelo: 'M-430', varianteNombre: 'Conexión 1/0 AWG a 1/0 AWG', precio: 165.00 },
      { codigoInterno: '4024810', modelo: 'M-434', varianteNombre: 'Conexión 2/0 AWG a 2/0 AWG', precio: 165.00 },
      { codigoInterno: '4024809', modelo: 'M-445', varianteNombre: 'Conexión 4/0 AWG a 2/0 AWG', precio: 170.00 },
      { codigoInterno: '4024808', modelo: 'M-443', varianteNombre: 'Conexión 4/0 AWG a 4/0 AWG', precio: 165.00 },
      { codigoInterno: '4024807', modelo: 'M-449', varianteNombre: 'Conexión 250 MCM a 250 MCM', precio: 175.00 },
      { codigoInterno: '4024813', modelo: 'M-3173', varianteNombre: 'Conexión 120 mm² a 120 mm²', precio: 175.00 },
    ],
  },
  // 7. MOLDES TIPO "X" (CR3 CABLE A VARILLA)
  {
    codigoPadre: 'TW-MOLDE-X-CR3',
    nombre: 'Molde de Grafito Tipo X CR3 (Cable Pasante a Varilla)',
    marca: 'Thermoweld',
    categoria: 'Moldes de Grafito Exotérmicos',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Moldes Cable a Varilla (CR)',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Molde pesado CR3 para conexión de cable pasante sobre cabeza de varilla Copperweld en cruce.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024817', modelo: 'M-1587', varianteNombre: 'Cable 2/0 AWG - Varilla 5/8"', precio: 375.00 },
      { codigoInterno: '4024816', modelo: 'M-1595', varianteNombre: 'Cable 2/0 AWG - Varilla 3/4"', precio: 375.00 },
      { codigoInterno: '4024815', modelo: 'M-1588', varianteNombre: 'Cable 4/0 AWG - Varilla 5/8"', precio: 375.00 },
      { codigoInterno: '4024814', modelo: 'M-1596', varianteNombre: 'Cable 4/0 AWG - Varilla 3/4"', precio: 375.00 },
    ],
  },
  // 8. MOLDES TIPO "T" (CR2 CABLE PASANTE A VARILLA EN "T")
  {
    codigoPadre: 'TW-MOLDE-T-CR2',
    nombre: 'Molde de Grafito Tipo T CR2 (Cable Pasante a Varilla)',
    marca: 'Thermoweld',
    categoria: 'Moldes de Grafito Exotérmicos',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Moldes Cable a Varilla (CR)',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Molde CR2 para soldar cable pasante sobre el tope de la varilla de tierra.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024823', modelo: 'M-547', varianteNombre: 'Cable 1/0 AWG - Varilla 5/8"', precio: 165.00 },
      { codigoInterno: '4024822', modelo: 'M-558', varianteNombre: 'Cable 1/0 AWG - Varilla 3/4"', precio: 165.00 },
      { codigoInterno: '4024821', modelo: 'M-548', varianteNombre: 'Cable 2/0 AWG - Varilla 5/8"', precio: 165.00 },
      { codigoInterno: '4024820', modelo: 'M-559', varianteNombre: 'Cable 2/0 AWG - Varilla 3/4"', precio: 165.00 },
      { codigoInterno: '4024819', modelo: 'M-550', varianteNombre: 'Cable 4/0 AWG - Varilla 5/8"', precio: 165.00 },
      { codigoInterno: '4024818', modelo: 'M-561', varianteNombre: 'Cable 4/0 AWG - Varilla 3/4"', precio: 165.00 },
    ],
  },
  // 9. MOLDES TIPO "L" (CR1 CABLE TERMINAL A VARILLA EN "L")
  {
    codigoPadre: 'TW-MOLDE-L-CR1',
    nombre: 'Molde de Grafito Tipo L CR1 (Cable Terminal a Varilla)',
    marca: 'Thermoweld',
    categoria: 'Moldes de Grafito Exotérmicos',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Moldes Cable a Varilla (CR)',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Molde CR1 para conexión final / terminal de cable de cobre sobre la punta superior de varilla de tierra.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024827', modelo: 'M-506', varianteNombre: 'Cable 2/0 AWG - Varilla 5/8"', precio: 165.00 },
      { codigoInterno: '4024826', modelo: 'M-516', varianteNombre: 'Cable 2/0 AWG - Varilla 3/4"', precio: 165.00 },
      { codigoInterno: '4024825', modelo: 'M-508', varianteNombre: 'Cable 4/0 AWG - Varilla 5/8"', precio: 165.00 },
      { codigoInterno: '4024824', modelo: 'M-518', varianteNombre: 'Cable 4/0 AWG - Varilla 3/4"', precio: 165.00 },
    ],
  },
  // 10. MOLDE CS3 CABLE A SUPERFICIE DE ACERO
  {
    codigoPadre: 'TW-MOLDE-CS3',
    nombre: 'Molde de Grafito CS3 (Cable a Superficie de Acero / Estructura)',
    marca: 'Thermoweld',
    categoria: 'Moldes de Grafito Exotérmicos',
    familia: 'Puesta a Tierra y Soldadura Exotérmica',
    subfamilia: 'Moldes a Superficie de Acero (CS)',
    tipo: TipoTransaccion.VENTA,
    unidad: 'USD',
    descripcion: 'Molde CS3 para fijación exotérmica directa de cable de cobre sobre plancha, tanque o estructura metálica de acero.',
    imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
    variantes: [
      { codigoInterno: '4024828', modelo: 'M-591', varianteNombre: 'Cable 2/0 AWG a Superficie Acero', precio: 165.00 },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando importación y estructuración de productos Thermoweld con Variantes...');

  // 1. Obtener o crear la Familia "Puesta a Tierra y Soldadura Exotérmica"
  let familia = await prisma.familia.findUnique({
    where: { nombre: 'Puesta a Tierra y Soldadura Exotérmica' },
  });

  if (!familia) {
    familia = await prisma.familia.create({
      data: {
        nombre: 'Puesta a Tierra y Soldadura Exotérmica',
        descripcion: 'Cargas de soldadura exotérmica, moldes de grafito, tenazas, chisperos y accesorios para puesta a tierra.',
      },
    });
  }

  let totalGrupos = 0;
  let totalHijos = 0;

  for (const grupo of GRUPOS_THERMOWELD) {
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

    console.log(`\n📦 [PADRE] ${padre.nombre} (${padre.codigoInterno})`);
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

  console.log(`\n🎉 Importación Thermoweld completada: ${totalGrupos} Grupos Padres, ${totalHijos} Variantes Hijas creadas/actualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Error cargando productos Thermoweld:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
