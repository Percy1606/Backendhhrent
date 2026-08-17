import { PrismaClient, TipoTransaccion, EstadoEquipo } from '@prisma/client';

const prisma = new PrismaClient();

function getMinPrecio(variantes: { precio: any }[]): number {
  const nums = variantes.map((v) => Number(v.precio || 0)).filter((n) => n > 0);
  return nums.length > 0 ? Math.min(...nums) : 0;
}

function hasText(str: string | null | undefined, search: string): boolean {
  if (!str) return false;
  return str.toLowerCase().includes(search.toLowerCase());
}

async function main() {
  console.log('🚀 Iniciando reestructuración FINA y ELEGANTE del catálogo (Máx 6-12 variantes por Padre)...');

  // ==========================================
  // 1. RESTRUCTURAR PCE (100 variantes -> 8 Padres específicos)
  // ==========================================
  const padrePCE = await prisma.equipo.findFirst({
    where: { OR: [{ codigoInterno: 'PCE-TOMAS-ENCHUFES-IEC' }, { codigoInterno: 'PCE-TOMAS-ENCHUFES-IP67' }] },
    include: { variantes: true },
  });

  if (padrePCE) {
    console.log('\n📦 Reorganizando PCE en subgrupos finos...');
    const todasPCE = await prisma.equipo.findMany({
      where: {
        OR: [
          { padreId: padrePCE.id },
          { marca: 'PCE' },
        ],
        NOT: { padreId: null },
      },
    });

    const gruposPCE = [
      {
        code: 'PCE-ENCHUFE-AEREO-IP44',
        name: 'Enchufes Aéreos Industriales PCE Grado IP44',
        filter: (v: any) => hasText(v.varianteNombre, 'ENCHUFE AÉREO') && hasText(v.varianteNombre, 'IP44'),
        desc: 'Conectores y clavijas aéreas PCE bajo norma IEC 60309 grado de protección IP44 para 200V y 400V.',
      },
      {
        code: 'PCE-TOMA-AEREA-IP44',
        name: 'Tomas Aéreas Industriales PCE Grado IP44',
        filter: (v: any) => hasText(v.varianteNombre, 'TOMA AÉREA') && hasText(v.varianteNombre, 'IP44') && !hasText(v.varianteNombre, 'TRIPLE'),
        desc: 'Tomacorrientes aéreos y acoplamientos hembra PCE bajo norma IEC 60309 grado IP44 para 200V y 400V.',
      },
      {
        code: 'PCE-TOMA-EMPOTRABLE-IP44',
        name: 'Tomas Empotrables Industriales PCE Grado IP44',
        filter: (v: any) => hasText(v.varianteNombre, 'TOMA EMPOTRABLE') && hasText(v.varianteNombre, 'IP44'),
        desc: 'Tomacorrientes de panel para empotrar rectos o inclinados PCE IP44.',
      },
      {
        code: 'PCE-TOMA-ADOSABLE-IP44',
        name: 'Tomas Adosables de Pared PCE Grado IP44',
        filter: (v: any) => hasText(v.varianteNombre, 'TOMA ADOSABLE') && hasText(v.varianteNombre, 'IP44'),
        desc: 'Tomacorrientes murales adosables con caja incorporada PCE IP44.',
      },
      {
        code: 'PCE-ENCHUFE-AEREO-IP67',
        name: 'Enchufes Aéreos Herméticos PCE Grado IP67',
        filter: (v: any) => hasText(v.varianteNombre, 'ENCHUFE') && hasText(v.varianteNombre, 'IP67'),
        desc: 'Clavijas y conectores macho aéreos herméticos sumergibles PCE IP67 (16A a 125A).',
      },
      {
        code: 'PCE-TOMA-AEREA-IP67',
        name: 'Tomas Aéreas Herméticas PCE Grado IP67',
        filter: (v: any) => hasText(v.varianteNombre, 'TOMA AÉREA') && hasText(v.varianteNombre, 'IP67') && !hasText(v.varianteNombre, 'TRIPLE'),
        desc: 'Tomacorrientes aéreos herméticos acoplables PCE IP67 (16A a 125A).',
      },
      {
        code: 'PCE-TOMA-EMPOTRABLE-IP67',
        name: 'Tomas Empotrables Herméticas PCE Grado IP67',
        filter: (v: any) => hasText(v.varianteNombre, 'TOMA EMPOTRABLE') && hasText(v.varianteNombre, 'IP67'),
        desc: 'Tomacorrientes de panel herméticos con tapa de rosca PCE IP67.',
      },
      {
        code: 'PCE-TOMA-ADOSABLE-IP67',
        name: 'Tomas Adosables Herméticas de Pared PCE Grado IP67',
        filter: (v: any) => hasText(v.varianteNombre, 'TOMA ADOSABLE') && hasText(v.varianteNombre, 'IP67'),
        desc: 'Tomacorrientes murales estancos para ambientes agresivos PCE IP67 (16A a 125A).',
      },
      {
        code: 'PCE-TOMAS-ESPECIALES-MULTIPLES',
        name: 'Tomas Triples y Conectores de Contenedor PCE',
        filter: (v: any) => hasText(v.varianteNombre, 'TRIPLE') || hasText(v.varianteNombre, 'CONT') || hasText(v.varianteNombre, '3v'),
        desc: 'Bases múltiples de toma triple IP44/IP67 y tomas para contenedores reefer PCE.',
      },
    ];

    for (const g of gruposPCE) {
      const vars = todasPCE.filter(g.filter);
      if (vars.length > 0) {
        const nuevoPadre = await prisma.equipo.upsert({
          where: { codigoInterno: g.code },
          update: {
            nombre: g.name,
            marca: 'PCE',
            categoria: 'TOMAS Y ENCHUFES IEC',
            familiaId: padrePCE.familiaId,
            subfamiliaId: padrePCE.subfamiliaId,
            descripcion: g.desc,
            precio: getMinPrecio(vars),
            unidad: 'PEN',
            tipo: TipoTransaccion.VENTA,
            estado: EstadoEquipo.DISPONIBLE,
            disponible: true,
            ubicacion: 'Almacén Central',
            imagenUrl: padrePCE.imagenUrl,
            padreId: null,
          },
          create: {
            codigoInterno: g.code,
            nombre: g.name,
            marca: 'PCE',
            categoria: 'TOMAS Y ENCHUFES IEC',
            familiaId: padrePCE.familiaId,
            subfamiliaId: padrePCE.subfamiliaId,
            descripcion: g.desc,
            precio: getMinPrecio(vars),
            unidad: 'PEN',
            tipo: TipoTransaccion.VENTA,
            estado: EstadoEquipo.DISPONIBLE,
            disponible: true,
            ubicacion: 'Almacén Central',
            imagenUrl: padrePCE.imagenUrl,
            padreId: null,
          },
        });

        for (const v of vars) {
          await prisma.equipo.update({
            where: { id: v.id },
            data: { padreId: nuevoPadre.id, nombre: `${nuevoPadre.nombre} - ${v.varianteNombre}` },
          });
        }
        console.log(`   ✨ Creado/Actualizado Padre PCE [${g.code}] con ${vars.length} variantes.`);
      }
    }

    // Borrar padres viejos si quedaron vacíos
    const padresPCEViejos = await prisma.equipo.findMany({
      where: {
        OR: [{ codigoInterno: 'PCE-TOMAS-ENCHUFES-IEC' }, { codigoInterno: 'PCE-TOMAS-ENCHUFES-IP67' }, { codigoInterno: 'PCE-TOMAS-ENCHUFES-IP44' }],
      },
      include: { variantes: true },
    });
    for (const pv of padresPCEViejos) {
      if (pv.variantes.length === 0) {
        await prisma.equipo.delete({ where: { id: pv.id } });
      }
    }
  }

  // ==========================================
  // 2. RESTRUCTURAR PHOENIX CONTACT (135 borneras -> 5 Padres por tipo)
  // ==========================================
  const padrePhoenix = await prisma.equipo.findFirst({
    where: { codigoInterno: 'PHOENIX-BORNERAS-UT-PT-ST' },
    include: { variantes: true },
  });

  if (padrePhoenix) {
    console.log('\n📦 Reorganizando Borneras Phoenix Contact en subgrupos finos...');
    const borneras = padrePhoenix.variantes;

    const gruposBorneras = [
      {
        code: 'PHOENIX-BORNERAS-UT-TORNILLO',
        name: 'Borneras de Conexión por Tornillo Serie UT Phoenix Contact (2.5mm² a 70mm²)',
        filter: (v: any) => (hasText(v.varianteNombre, 'BORNE') || hasText(v.varianteNombre, 'UT')) && !hasText(v.varianteNombre, 'PRESIÓN') && !hasText(v.varianteNombre, 'PORTAF') && !hasText(v.varianteNombre, 'SECC') && !hasText(v.varianteNombre, 'ESSENTIAL'),
        desc: 'Borneras estándar de paso y tierra con tecnología de conexión por tornillo serie UT.',
      },
      {
        code: 'PHOENIX-BORNERAS-ST-PT-RESORTE',
        name: 'Borneras de Conexión por Resorte / Push-in Serie ST / PT Phoenix Contact',
        filter: (v: any) => hasText(v.varianteNombre, 'PRESIÓN') || hasText(v.varianteNombre, 'ST') || hasText(v.varianteNombre, 'PT'),
        desc: 'Borneras de conexión rápida por resorte y resorte directo Push-in series ST y PT.',
      },
      {
        code: 'PHOENIX-BORNERAS-PORTAFUSIBLES',
        name: 'Borneras Portafusibles y Cabezas Portafusibles Phoenix Contact',
        filter: (v: any) => hasText(v.varianteNombre, 'PORTAF') || hasText(v.varianteNombre, 'PORTAFUS'),
        desc: 'Borneras portafusibles de 4mm² con/sin indicador LED (24V / 250V) y cabezas extraíbles.',
      },
      {
        code: 'PHOENIX-BORNERAS-SECCIONABLES',
        name: 'Borneras Seccionables y de Prueba URTK Phoenix Contact',
        filter: (v: any) => hasText(v.varianteNombre, 'SECCIONABLE') || hasText(v.varianteNombre, 'SECC') || hasText(v.varianteNombre, 'URTK'),
        desc: 'Borneras seccionables con cuchilla o palanca para circuitos de medición y transformadores de corriente.',
      },
      {
        code: 'PHOENIX-BORNERAS-ESSENTIAL-TB',
        name: 'Borneras Económicas Serie Essential TB Phoenix Contact',
        filter: (v: any) => hasText(v.varianteNombre, 'ESSENTIAL') || hasText(v.varianteNombre, 'TB'),
        desc: 'Línea de borneras básicas y accesibles Essential TB para armadores de tableros.',
      },
    ];

    for (const g of gruposBorneras) {
      const vars = borneras.filter(g.filter);
      if (vars.length > 0) {
        const nuevoPadre = await prisma.equipo.upsert({
          where: { codigoInterno: g.code },
          update: {
            nombre: g.name,
            marca: 'Phoenix Contact',
            categoria: 'BORNERAS',
            familiaId: padrePhoenix.familiaId,
            subfamiliaId: padrePhoenix.subfamiliaId,
            descripcion: g.desc,
            precio: getMinPrecio(vars),
            unidad: 'PEN',
            tipo: TipoTransaccion.VENTA,
            estado: EstadoEquipo.DISPONIBLE,
            disponible: true,
            ubicacion: 'Almacén Central',
            imagenUrl: padrePhoenix.imagenUrl,
            padreId: null,
          },
          create: {
            codigoInterno: g.code,
            nombre: g.name,
            marca: 'Phoenix Contact',
            categoria: 'BORNERAS',
            familiaId: padrePhoenix.familiaId,
            subfamiliaId: padrePhoenix.subfamiliaId,
            descripcion: g.desc,
            precio: getMinPrecio(vars),
            unidad: 'PEN',
            tipo: TipoTransaccion.VENTA,
            estado: EstadoEquipo.DISPONIBLE,
            disponible: true,
            ubicacion: 'Almacén Central',
            imagenUrl: padrePhoenix.imagenUrl,
            padreId: null,
          },
        });

        for (const v of vars) {
          await prisma.equipo.update({
            where: { id: v.id },
            data: { padreId: nuevoPadre.id, nombre: `${nuevoPadre.nombre} - ${v.varianteNombre}` },
          });
        }
        console.log(`   ✨ Creado/Actualizado Padre Phoenix [${g.code}] con ${vars.length} variantes.`);
      }
    }

    // Limpiar padre original si quedó vacío
    const checkViejo = await prisma.equipo.findUnique({ where: { id: padrePhoenix.id }, include: { variantes: true } });
    if (checkViejo && checkViejo.variantes.length === 0) {
      await prisma.equipo.delete({ where: { id: padrePhoenix.id } });
    }
  }

  // ==========================================
  // 3. RESTRUCTURAR SIEMENS 3VM (60 variantes -> 4 Padres por amperaje/chasis)
  // ==========================================
  const padre3VM = await prisma.equipo.findFirst({
    where: { codigoInterno: 'SIE-3VM-CAJA-MOLDEADA' },
    include: { variantes: true },
  });

  if (padre3VM) {
    console.log('\n📦 Reorganizando Siemens 3VM en subgrupos finos...');
    const vars3VM = padre3VM.variantes;

    const grupos3VM = [
      {
        code: 'SIE-3VM10-100A',
        name: 'Interruptores de Caja Moldeada Siemens 3VM10 (hasta 100A)',
        filter: (v: any) => hasText(v.modelo, '3VM10') || hasText(v.varianteNombre, '3VM10'),
        desc: 'Interruptores termomagnéticos compactos marco 100A fijos y regulables 2P, 3P y 4P.',
      },
      {
        code: 'SIE-3VM11-160A',
        name: 'Interruptores de Caja Moldeada Siemens 3VM11 (hasta 160A)',
        filter: (v: any) => hasText(v.modelo, '3VM11') || hasText(v.varianteNombre, '3VM11'),
        desc: 'Interruptores termomagnéticos marco 160A Siemens 3VM11 en 36kA y 55kA.',
      },
      {
        code: 'SIE-3VM12-250A',
        name: 'Interruptores de Caja Moldeada Siemens 3VM12 (hasta 250A)',
        filter: (v: any) => hasText(v.modelo, '3VM12') || hasText(v.varianteNombre, '3VM12'),
        desc: 'Interruptores de potencia marco 250A Siemens 3VM12 regulables (ATFM).',
      },
      {
        code: 'SIE-3VM13-14-630A',
        name: 'Interruptores de Caja Moldeada Siemens 3VM13 y 3VM14 (400A y 630A)',
        filter: (v: any) => hasText(v.modelo, '3VM13') || hasText(v.modelo, '3VM14') || hasText(v.varianteNombre, '3VM13') || hasText(v.varianteNombre, '3VM14'),
        desc: 'Interruptores de alto amparaje marco 400A y 630A Siemens 3VM regulables.',
      },
      {
        code: 'SIE-3VM9-ACCESORIOS',
        name: 'Accesorios para Interruptores de Caja Moldeada Siemens 3VM9',
        filter: (v: any) => hasText(v.modelo, '3VM9') || hasText(v.varianteNombre, '3VM9') || hasText(v.varianteNombre, 'CONTACTO') || hasText(v.varianteNombre, 'BOBINA'),
        desc: 'Contactos auxiliares, bobinas de disparo y mandos para interruptores 3VM.',
      },
    ];

    for (const g of grupos3VM) {
      const vars = vars3VM.filter(g.filter);
      if (vars.length > 0) {
        const nuevoPadre = await prisma.equipo.upsert({
          where: { codigoInterno: g.code },
          update: {
            nombre: g.name,
            marca: 'Siemens',
            categoria: 'INTERRUPTORES DE CAJA MOLDEADA 3VM',
            familiaId: padre3VM.familiaId,
            subfamiliaId: padre3VM.subfamiliaId,
            descripcion: g.desc,
            precio: getMinPrecio(vars),
            unidad: 'USD',
            tipo: TipoTransaccion.VENTA,
            estado: EstadoEquipo.DISPONIBLE,
            disponible: true,
            ubicacion: 'Almacén Central',
            imagenUrl: padre3VM.imagenUrl,
            padreId: null,
          },
          create: {
            codigoInterno: g.code,
            nombre: g.name,
            marca: 'Siemens',
            categoria: 'INTERRUPTORES DE CAJA MOLDEADA 3VM',
            familiaId: padre3VM.familiaId,
            subfamiliaId: padre3VM.subfamiliaId,
            descripcion: g.desc,
            precio: getMinPrecio(vars),
            unidad: 'USD',
            tipo: TipoTransaccion.VENTA,
            estado: EstadoEquipo.DISPONIBLE,
            disponible: true,
            ubicacion: 'Almacén Central',
            imagenUrl: padre3VM.imagenUrl,
            padreId: null,
          },
        });

        for (const v of vars) {
          await prisma.equipo.update({
            where: { id: v.id },
            data: { padreId: nuevoPadre.id, nombre: `${nuevoPadre.nombre} - ${v.varianteNombre}` },
          });
        }
        console.log(`   ✨ Creado/Actualizado Padre Siemens 3VM [${g.code}] con ${vars.length} variantes.`);
      }
    }

    const check3VM = await prisma.equipo.findUnique({ where: { id: padre3VM.id }, include: { variantes: true } });
    if (check3VM && check3VM.variantes.length === 0) {
      await prisma.equipo.delete({ where: { id: padre3VM.id } });
    }
  }

  // ==========================================
  // 4. RESTRUCTURAR SIEMENS 5SL (77 variantes -> 2 Padres 5SL6 y 5SL4)
  // ==========================================
  const padre5SL = await prisma.equipo.findFirst({
    where: { codigoInterno: 'SIE-5SL-TERMOMAGNETICO' },
    include: { variantes: true },
  });

  if (padre5SL) {
    console.log('\n📦 Reorganizando Siemens 5SL en 5SL6 (6kA) y 5SL4 (10kA)...');
    const vars5SL = padre5SL.variantes;

    const vars5SL6 = vars5SL.filter((v) => hasText(v.modelo, '5SL6') || hasText(v.varianteNombre, '5SL6'));
    const vars5SL4 = vars5SL.filter((v) => hasText(v.modelo, '5SL4') || hasText(v.varianteNombre, '5SL4'));

    if (vars5SL6.length > 0) {
      const p5SL6 = await prisma.equipo.upsert({
        where: { codigoInterno: 'SIE-5SL6-6KA' },
        update: {
          nombre: 'Interruptores Termomagnéticos Riel DIN Siemens Serie 5SL6 (6kA)',
          marca: 'Siemens',
          categoria: 'INTERRUPTORES DE RIEL (1 POLO) 5SL6 - 6kA/400V',
          familiaId: padre5SL.familiaId,
          subfamiliaId: padre5SL.subfamiliaId,
          descripcion: 'Interruptores automáticos para riel DIN Siemens serie 5SL6 poder de corte 6kA en 1P, 2P, 3P y 4P (1A a 63A).',
          precio: getMinPrecio(vars5SL6),
          unidad: 'USD',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padre5SL.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'SIE-5SL6-6KA',
          nombre: 'Interruptores Termomagnéticos Riel DIN Siemens Serie 5SL6 (6kA)',
          marca: 'Siemens',
          categoria: 'INTERRUPTORES DE RIEL (1 POLO) 5SL6 - 6kA/400V',
          familiaId: padre5SL.familiaId,
          subfamiliaId: padre5SL.subfamiliaId,
          descripcion: 'Interruptores automáticos para riel DIN Siemens serie 5SL6 poder de corte 6kA en 1P, 2P, 3P y 4P (1A a 63A).',
          precio: getMinPrecio(vars5SL6),
          unidad: 'USD',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padre5SL.imagenUrl,
          padreId: null,
        },
      });
      for (const v of vars5SL6) {
        await prisma.equipo.update({ where: { id: v.id }, data: { padreId: p5SL6.id, nombre: `${p5SL6.nombre} - ${v.varianteNombre}` } });
      }
      console.log(`   ✨ Creado Padre Siemens [SIE-5SL6-6KA] con ${vars5SL6.length} variantes.`);
    }

    if (vars5SL4.length > 0) {
      const p5SL4 = await prisma.equipo.upsert({
        where: { codigoInterno: 'SIE-5SL4-10KA' },
        update: {
          nombre: 'Interruptores Termomagnéticos Riel DIN Siemens Serie 5SL4 (10kA)',
          marca: 'Siemens',
          categoria: 'INTERRUPTORES DE RIEL (1 POLO) 5SL4 - 10kA/400V',
          familiaId: padre5SL.familiaId,
          subfamiliaId: padre5SL.subfamiliaId,
          descripcion: 'Interruptores automáticos para riel DIN Siemens serie 5SL4 poder de corte industrial 10kA en 1P, 2P, 3P y 4P.',
          precio: getMinPrecio(vars5SL4),
          unidad: 'USD',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padre5SL.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'SIE-5SL4-10KA',
          nombre: 'Interruptores Termomagnéticos Riel DIN Siemens Serie 5SL4 (10kA)',
          marca: 'Siemens',
          categoria: 'INTERRUPTORES DE RIEL (1 POLO) 5SL4 - 10kA/400V',
          familiaId: padre5SL.familiaId,
          subfamiliaId: padre5SL.subfamiliaId,
          descripcion: 'Interruptores automáticos para riel DIN Siemens serie 5SL4 poder de corte industrial 10kA en 1P, 2P, 3P y 4P.',
          precio: getMinPrecio(vars5SL4),
          unidad: 'USD',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padre5SL.imagenUrl,
          padreId: null,
        },
      });
      for (const v of vars5SL4) {
        await prisma.equipo.update({ where: { id: v.id }, data: { padreId: p5SL4.id, nombre: `${p5SL4.nombre} - ${v.varianteNombre}` } });
      }
      console.log(`   ✨ Creado Padre Siemens [SIE-5SL4-10KA] con ${vars5SL4.length} variantes.`);
    }

    const check5SL = await prisma.equipo.findUnique({ where: { id: padre5SL.id }, include: { variantes: true } });
    if (check5SL && check5SL.variantes.length === 0) {
      await prisma.equipo.delete({ where: { id: padre5SL.id } });
    }
  }

  console.log('\n👑 ¡Reestructuración técnica súper fina finalizada exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la reestructuración fina:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
