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

function startsWithCode(str: string | null | undefined, search: string): boolean {
  if (!str) return false;
  return str.startsWith(search);
}

async function main() {
  console.log('🚀 Iniciando reestructuración técnica completa del catálogo...');

  // 1. DESGLOSAR LS-GUARDAMOTORES-CONTACTORES-MC
  const padreLSViejo = await prisma.equipo.findUnique({
    where: { codigoInterno: 'LS-GUARDAMOTORES-CONTACTORES-MC' },
    include: { variantes: true },
  });

  if (padreLSViejo) {
    console.log('\n🔨 Reestructurando LS Guardamotores y Contactores...');

    // 1.a Guardamotores LS MMS
    const variantesMMS = padreLSViejo.variantes.filter(
      (v) =>
        startsWithCode(v.codigoInterno, '410132') ||
        startsWithCode(v.codigoInterno, '400008') ||
        startsWithCode(v.codigoInterno, '400009') ||
        startsWithCode(v.codigoInterno, '410133') ||
        startsWithCode(v.codigoInterno, '401799'),
    );
    if (variantesMMS.length > 0) {
      const padreMMS = await prisma.equipo.upsert({
        where: { codigoInterno: 'LS-GUARDAMOTORES-MMS' },
        update: {
          nombre: 'Guardamotores Magnetotérmicos LS Series MMS-32S, MMS-32H, MMS-63H y Accesorios',
          marca: 'LS Protección y Control',
          categoria: 'GUARDAMOTORES',
          familiaId: padreLSViejo.familiaId,
          subfamiliaId: padreLSViejo.subfamiliaId,
          descripcion:
            'Guardamotores para protección de motores LS serie MMS (0.16A a 63A) con contactos auxiliares FX/LX/LAM/LA, barras de conexión PB y bloques de unión DA.',
          precio: getMinPrecio(variantesMMS),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreLSViejo.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'LS-GUARDAMOTORES-MMS',
          nombre: 'Guardamotores Magnetotérmicos LS Series MMS-32S, MMS-32H, MMS-63H y Accesorios',
          marca: 'LS Protección y Control',
          categoria: 'GUARDAMOTORES',
          familiaId: padreLSViejo.familiaId,
          subfamiliaId: padreLSViejo.subfamiliaId,
          descripcion:
            'Guardamotores para protección de motores LS serie MMS (0.16A a 63A) con contactos auxiliares FX/LX/LAM/LA, barras de conexión PB y bloques de unión DA.',
          precio: getMinPrecio(variantesMMS),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreLSViejo.imagenUrl,
          padreId: null,
        },
      });

      for (const v of variantesMMS) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreMMS.id, nombre: `${padreMMS.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'LS-GUARDAMOTORES-MMS' con ${variantesMMS.length} variantes.`);
    }

    // 1.b Contactores LS MC (MC9B a MC800A) y Accesorios
    const variantesMC = padreLSViejo.variantes.filter(
      (v) =>
        startsWithCode(v.codigoInterno, '40048') ||
        startsWithCode(v.codigoInterno, '40036') ||
        startsWithCode(v.codigoInterno, '40023') ||
        startsWithCode(v.codigoInterno, '40055') ||
        startsWithCode(v.codigoInterno, '40057') ||
        startsWithCode(v.codigoInterno, '40058') ||
        startsWithCode(v.codigoInterno, '40025') ||
        startsWithCode(v.codigoInterno, '40024') ||
        startsWithCode(v.codigoInterno, '410139') ||
        startsWithCode(v.codigoInterno, '40029') ||
        startsWithCode(v.codigoInterno, '410136') ||
        startsWithCode(v.codigoInterno, '401519') ||
        startsWithCode(v.codigoInterno, '4105139') ||
        startsWithCode(v.codigoInterno, '4008331'),
    );
    if (variantesMC.length > 0) {
      const padreMC = await prisma.equipo.upsert({
        where: { codigoInterno: 'LS-CONTACTORES-MC' },
        update: {
          nombre: 'Contactores Tripolares de Potencia LS Serie MC (9A a 800A) y Accesorios',
          marca: 'LS Protección y Control',
          categoria: 'CONTACTORES',
          familiaId: padreLSViejo.familiaId,
          subfamiliaId: padreLSViejo.subfamiliaId,
          descripcion:
            'Contactores tripolares de potencia LS Metasol MC9B a MC800A en bobinas 24V, 110V, 220V, 380V, 440V con contactos auxiliares UA/AU, bloques de enclavamiento UR/AR, varistores y adaptadores de condensadores AC.',
          precio: getMinPrecio(variantesMC),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreLSViejo.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'LS-CONTACTORES-MC',
          nombre: 'Contactores Tripolares de Potencia LS Serie MC (9A a 800A) y Accesorios',
          marca: 'LS Protección y Control',
          categoria: 'CONTACTORES',
          familiaId: padreLSViejo.familiaId,
          subfamiliaId: padreLSViejo.subfamiliaId,
          descripcion:
            'Contactores tripolares de potencia LS Metasol MC9B a MC800A en bobinas 24V, 110V, 220V, 380V, 440V con contactos auxiliares UA/AU, bloques de enclavamiento UR/AR, varistores y adaptadores de condensadores AC.',
          precio: getMinPrecio(variantesMC),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreLSViejo.imagenUrl,
          padreId: null,
        },
      });

      for (const v of variantesMC) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreMC.id, nombre: `${padreMC.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'LS-CONTACTORES-MC' con ${variantesMC.length} variantes.`);
    }

    // 1.c Minicontactores LS GMR
    const variantesGMR = padreLSViejo.variantes.filter(
      (v) => startsWithCode(v.codigoInterno, '410543') || startsWithCode(v.codigoInterno, '4105140'),
    );
    if (variantesGMR.length > 0) {
      const padreGMR = await prisma.equipo.upsert({
        where: { codigoInterno: 'LS-MINICONTACTORES-GMR' },
        update: {
          nombre: 'Minicontactores Auxiliares LS Serie GMR-4M (16A)',
          marca: 'LS Protección y Control',
          categoria: 'CONTACTORES',
          familiaId: padreLSViejo.familiaId,
          subfamiliaId: padreLSViejo.subfamiliaId,
          descripcion:
            'Minicontactores auxiliares LS serie GMR-4M de 16A (4NO, 3NO+1NC, 2NO+2NC en 220V) y bloque de enclavamiento AR-12M.',
          precio: getMinPrecio(variantesGMR),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreLSViejo.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'LS-MINICONTACTORES-GMR',
          nombre: 'Minicontactores Auxiliares LS Serie GMR-4M (16A)',
          marca: 'LS Protección y Control',
          categoria: 'CONTACTORES',
          familiaId: padreLSViejo.familiaId,
          subfamiliaId: padreLSViejo.subfamiliaId,
          descripcion:
            'Minicontactores auxiliares LS serie GMR-4M de 16A (4NO, 3NO+1NC, 2NO+2NC en 220V) y bloque de enclavamiento AR-12M.',
          precio: getMinPrecio(variantesGMR),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreLSViejo.imagenUrl,
          padreId: null,
        },
      });

      for (const v of variantesGMR) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreGMR.id, nombre: `${padreGMR.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'LS-MINICONTACTORES-GMR' con ${variantesGMR.length} variantes.`);
    }

    // Borrar padre viejo
    await prisma.equipo.delete({ where: { id: padreLSViejo.id } });
    console.log('   🧹 Eliminado padre gigante LS-GUARDAMOTORES-CONTACTORES-MC.');
  }

  // 2. DESGLOSAR PHOENIX-BORNERAS-RELES-FUENTES
  const padrePhoenix = await prisma.equipo.findUnique({
    where: { codigoInterno: 'PHOENIX-BORNERAS-RELES-FUENTES' },
    include: { variantes: true },
  });

  if (padrePhoenix) {
    console.log('\n🔨 Reestructurando Phoenix Contact...');

    const varReles = padrePhoenix.variantes.filter((v) => hasText(v.varianteNombre, 'RELE'));
    const varFuentes = padrePhoenix.variantes.filter(
      (v) => hasText(v.varianteNombre, 'FUENTE') || hasText(v.varianteNombre, 'UPS'),
    );
    const varMarcacion = padrePhoenix.variantes.filter(
      (v) =>
        hasText(v.varianteNombre, 'THERMOFOX') ||
        hasText(v.varianteNombre, 'MARCADOR') ||
        hasText(v.varianteNombre, 'ETIQUETAS') ||
        hasText(v.varianteNombre, 'TERMOCONTRAIBLE') ||
        hasText(v.varianteNombre, 'TINTA'),
    );
    const varSwitches = padrePhoenix.variantes.filter((v) => hasText(v.varianteNombre, 'SWITCH'));

    if (varReles.length > 0) {
      const padreReles = await prisma.equipo.upsert({
        where: { codigoInterno: 'PHOENIX-RELES-PLC-INTERFACE' },
        update: {
          nombre: 'Relés de Interfaz PLC-INTERFACE y Enchufables Phoenix Contact',
          marca: 'Phoenix Contact',
          categoria: 'RELES',
          familiaId: padrePhoenix.familiaId,
          subfamiliaId: padrePhoenix.subfamiliaId,
          descripcion:
            'Relés ultra compactos de interfaz serie PLC-INTERFACE y relés enchufables de 8/14 pines (24VDC, 120VAC, 230VAC) con puentes enchufables.',
          precio: getMinPrecio(varReles),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePhoenix.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'PHOENIX-RELES-PLC-INTERFACE',
          nombre: 'Relés de Interfaz PLC-INTERFACE y Enchufables Phoenix Contact',
          marca: 'Phoenix Contact',
          categoria: 'RELES',
          familiaId: padrePhoenix.familiaId,
          subfamiliaId: padrePhoenix.subfamiliaId,
          descripcion:
            'Relés ultra compactos de interfaz serie PLC-INTERFACE y relés enchufables de 8/14 pines (24VDC, 120VAC, 230VAC) con puentes enchufables.',
          precio: getMinPrecio(varReles),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePhoenix.imagenUrl,
          padreId: null,
        },
      });
      for (const v of varReles) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreReles.id, nombre: `${padreReles.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'PHOENIX-RELES-PLC-INTERFACE' con ${varReles.length} variantes.`);
    }

    if (varFuentes.length > 0) {
      const padreFuentes = await prisma.equipo.upsert({
        where: { codigoInterno: 'PHOENIX-FUENTES-QUINT-TRIO-UNO' },
        update: {
          nombre: 'Fuentes de Alimentación Reguladas y UPS QUINT, TRIO y UNO Phoenix Contact',
          marca: 'Phoenix Contact',
          categoria: 'FUENTES',
          familiaId: padrePhoenix.familiaId,
          subfamiliaId: padrePhoenix.subfamiliaId,
          descripcion:
            'Fuentes de alimentación de grado industrial series STEP, UNO, TRIO y QUINT4 de 24VDC (1.5A a 20A) con módulos de alimentación ininterrumpida UPS QUINT4.',
          precio: getMinPrecio(varFuentes),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePhoenix.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'PHOENIX-FUENTES-QUINT-TRIO-UNO',
          nombre: 'Fuentes de Alimentación Reguladas y UPS QUINT, TRIO y UNO Phoenix Contact',
          marca: 'Phoenix Contact',
          categoria: 'FUENTES',
          familiaId: padrePhoenix.familiaId,
          subfamiliaId: padrePhoenix.subfamiliaId,
          descripcion:
            'Fuentes de alimentación de grado industrial series STEP, UNO, TRIO y QUINT4 de 24VDC (1.5A a 20A) con módulos de alimentación ininterrumpida UPS QUINT4.',
          precio: getMinPrecio(varFuentes),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePhoenix.imagenUrl,
          padreId: null,
        },
      });
      for (const v of varFuentes) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreFuentes.id, nombre: `${padreFuentes.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'PHOENIX-FUENTES-QUINT-TRIO-UNO' con ${varFuentes.length} variantes.`);
    }

    if (varSwitches.length > 0) {
      const padreSwitches = await prisma.equipo.upsert({
        where: { codigoInterno: 'PHOENIX-SWITCHES-INDUSTRIALES' },
        update: {
          nombre: 'Switches Ethernet Industriales No Gestionables Phoenix Contact',
          marca: 'Phoenix Contact',
          categoria: 'SWITCHES',
          familiaId: padrePhoenix.familiaId,
          subfamiliaId: padrePhoenix.subfamiliaId,
          descripcion:
            'Switches Ethernet industriales no gestionables de 5 y 8 puertos RJ45 para montaje en riel DIN.',
          precio: getMinPrecio(varSwitches),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePhoenix.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'PHOENIX-SWITCHES-INDUSTRIALES',
          nombre: 'Switches Ethernet Industriales No Gestionables Phoenix Contact',
          marca: 'Phoenix Contact',
          categoria: 'SWITCHES',
          familiaId: padrePhoenix.familiaId,
          subfamiliaId: padrePhoenix.subfamiliaId,
          descripcion:
            'Switches Ethernet industriales no gestionables de 5 y 8 puertos RJ45 para montaje en riel DIN.',
          precio: getMinPrecio(varSwitches),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePhoenix.imagenUrl,
          padreId: null,
        },
      });
      for (const v of varSwitches) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreSwitches.id, nombre: `${padreSwitches.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'PHOENIX-SWITCHES-INDUSTRIALES' con ${varSwitches.length} variantes.`);
    }

    if (varMarcacion.length > 0) {
      const padreMarcacion = await prisma.equipo.upsert({
        where: { codigoInterno: 'PHOENIX-SISTEMA-MARCACION-THERMOFOX' },
        update: {
          nombre: 'Sistema de Rotulación Portátil Thermofox y Marcadores de Bornera Phoenix Contact',
          marca: 'Phoenix Contact',
          categoria: 'MARCACION',
          familiaId: padrePhoenix.familiaId,
          subfamiliaId: padrePhoenix.subfamiliaId,
          descripcion:
            'Impresoras térmicas portátiles Thermofox, cintas de rotulación, marcadores impresos para borneras UT/PT y tubos termocontraíbles.',
          precio: getMinPrecio(varMarcacion),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePhoenix.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'PHOENIX-SISTEMA-MARCACION-THERMOFOX',
          nombre: 'Sistema de Rotulación Portátil Thermofox y Marcadores de Bornera Phoenix Contact',
          marca: 'Phoenix Contact',
          categoria: 'MARCACION',
          familiaId: padrePhoenix.familiaId,
          subfamiliaId: padrePhoenix.subfamiliaId,
          descripcion:
            'Impresoras térmicas portátiles Thermofox, cintas de rotulación, marcadores impresos para borneras UT/PT y tubos termocontraíbles.',
          precio: getMinPrecio(varMarcacion),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePhoenix.imagenUrl,
          padreId: null,
        },
      });
      for (const v of varMarcacion) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreMarcacion.id, nombre: `${padreMarcacion.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'PHOENIX-SISTEMA-MARCACION-THERMOFOX' con ${varMarcacion.length} variantes.`);
    }

    // El resto queda en Borneras Phoenix Contact
    const variantesRestantes = await prisma.equipo.findMany({ where: { padreId: padrePhoenix.id } });
    if (variantesRestantes.length > 0) {
      await prisma.equipo.update({
        where: { id: padrePhoenix.id },
        data: {
          codigoInterno: 'PHOENIX-BORNERAS-UT-PT-ST',
          nombre: 'Borneras de Conexión Riel DIN UT (Tornillo) y ST (Resorte) Phoenix Contact',
          descripcion:
            'Borneras de paso, paso a tierra, portafusibles y seccionables para riel DIN serie UT y ST (2.5mm² a 70mm²) con tapas finales y puentes de conexión.',
        },
      });
      console.log(
        `   ✅ Renombrado padre principal Phoenix Contact a 'PHOENIX-BORNERAS-UT-PT-ST' con ${variantesRestantes.length} variantes de borneras.`,
      );
    }
  }

  // 3. DESGLOSAR PCE-TOMAS-ENCHUFES-IEC (100 variantes)
  const padrePCE = await prisma.equipo.findUnique({
    where: { codigoInterno: 'PCE-TOMAS-ENCHUFES-IEC' },
    include: { variantes: true },
  });

  if (padrePCE) {
    console.log('\n🔨 Reestructurando Tomas y Enchufes PCE...');
    const varIP44 = padrePCE.variantes.filter((v) => hasText(v.varianteNombre, 'IP44'));
    const varIP67 = padrePCE.variantes.filter((v) => hasText(v.varianteNombre, 'IP67'));

    if (varIP44.length > 0) {
      const padreIP44 = await prisma.equipo.upsert({
        where: { codigoInterno: 'PCE-TOMAS-ENCHUFES-IP44' },
        update: {
          nombre: 'Tomas y Enchufes Industriales PCE Grado IP44 (16A a 32A)',
          marca: 'PCE',
          categoria: 'TOMAS Y ENCHUFES IEC',
          familiaId: padrePCE.familiaId,
          subfamiliaId: padrePCE.subfamiliaId,
          descripcion:
            'Enchufes aéreos, tomas aéreas, adosables y empotrables bajo norma IEC 60309 grado de protección IP44 (200V y 400V).',
          precio: getMinPrecio(varIP44),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePCE.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'PCE-TOMAS-ENCHUFES-IP44',
          nombre: 'Tomas y Enchufes Industriales PCE Grado IP44 (16A a 32A)',
          marca: 'PCE',
          categoria: 'TOMAS Y ENCHUFES IEC',
          familiaId: padrePCE.familiaId,
          subfamiliaId: padrePCE.subfamiliaId,
          descripcion:
            'Enchufes aéreos, tomas aéreas, adosables y empotrables bajo norma IEC 60309 grado de protección IP44 (200V y 400V).',
          precio: getMinPrecio(varIP44),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padrePCE.imagenUrl,
          padreId: null,
        },
      });
      for (const v of varIP44) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreIP44.id, nombre: `${padreIP44.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'PCE-TOMAS-ENCHUFES-IP44' con ${varIP44.length} variantes.`);
    }

    if (varIP67.length > 0) {
      await prisma.equipo.update({
        where: { id: padrePCE.id },
        data: {
          codigoInterno: 'PCE-TOMAS-ENCHUFES-IP67',
          nombre: 'Tomas y Enchufes Industriales Herméticos PCE Grado IP67 (16A a 125A)',
          descripcion:
            'Conectores herméticos, tomacorrientes aéreos, adosables y empotrables bajo norma IEC 60309 grado IP67 (200V, 400V y 500V) de 16A a 125A.',
        },
      });
      console.log(
        `   ✅ Renombrado padre principal PCE a 'PCE-TOMAS-ENCHUFES-IP67' con ${varIP67.length} variantes herméticas.`,
      );
    }
  }

  // 4. DESGLOSAR ESAFE-TABLEROS-PVC-CINTILLOS (62 variantes)
  const padreEsafe = await prisma.equipo.findUnique({
    where: { codigoInterno: 'ESAFE-TABLEROS-PVC-CINTILLOS' },
    include: { variantes: true },
  });

  if (padreEsafe) {
    console.log('\n🔨 Reestructurando E-Safe Tableros y Cintillos...');
    const varTableros = padreEsafe.variantes.filter(
      (v) => hasText(v.varianteNombre, 'CAJA') || hasText(v.varianteNombre, 'TABLERO') || hasText(v.varianteNombre, 'Tapa'),
    );
    const varCintillos = padreEsafe.variantes.filter(
      (v) =>
        hasText(v.varianteNombre, 'CINTILLO') ||
        hasText(v.varianteNombre, 'PORTACINTILLO') ||
        hasText(v.varianteNombre, 'ESPIRAL'),
    );

    if (varCintillos.length > 0) {
      const padreCintillos = await prisma.equipo.upsert({
        where: { codigoInterno: 'ESAFE-CINTILLOS-ESPIRALES' },
        update: {
          nombre: 'Cintillos de Nylon, Portacintillos y Espirales Envolventes E-Safe',
          marca: 'E-safe Tableros PVC',
          categoria: 'CAJAS Y TABLEROS PVC',
          familiaId: padreEsafe.familiaId,
          subfamiliaId: padreEsafe.subfamiliaId,
          descripcion:
            'Amarras de nylon blancas y negras (100mm a 760mm), portacintillos autoadhesivos y espiral de polietileno envolvente para ordenamiento de cables.',
          precio: getMinPrecio(varCintillos),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreEsafe.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'ESAFE-CINTILLOS-ESPIRALES',
          nombre: 'Cintillos de Nylon, Portacintillos y Espirales Envolventes E-Safe',
          marca: 'E-safe Tableros PVC',
          categoria: 'CAJAS Y TABLEROS PVC',
          familiaId: padreEsafe.familiaId,
          subfamiliaId: padreEsafe.subfamiliaId,
          descripcion:
            'Amarras de nylon blancas y negras (100mm a 760mm), portacintillos autoadhesivos y espiral de polietileno envolvente para ordenamiento de cables.',
          precio: getMinPrecio(varCintillos),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreEsafe.imagenUrl,
          padreId: null,
        },
      });
      for (const v of varCintillos) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreCintillos.id, nombre: `${padreCintillos.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'ESAFE-CINTILLOS-ESPIRALES' con ${varCintillos.length} variantes.`);
    }

    if (varTableros.length > 0) {
      await prisma.equipo.update({
        where: { id: padreEsafe.id },
        data: {
          codigoInterno: 'ESAFE-TABLEROS-CAJAS-PASE-PVC',
          nombre: 'Tableros Distribución Termoplásticos y Cajas de Pase PVC E-Safe',
          descripcion:
            'Tableros de distribución de resina para empotrar/adosar (2W a 36W) y cajas de pase estancas IP55 con/sin conos (85x85 a 255x200).',
        },
      });
      console.log(
        `   ✅ Renombrado padre principal E-Safe a 'ESAFE-TABLEROS-CAJAS-PASE-PVC' con ${varTableros.length} variantes.`,
      );
    }
  }

  // 5. DESGLOSAR EATON-CONTACTORES-DILM-RELES-ZB (50 variantes)
  const padreEatonCont = await prisma.equipo.findUnique({
    where: { codigoInterno: 'EATON-CONTACTORES-DILM-RELES-ZB' },
    include: { variantes: true },
  });

  if (padreEatonCont) {
    console.log('\n🔨 Reestructurando Contactores y Relés Eaton...');
    const varDILM = padreEatonCont.variantes.filter(
      (v) =>
        hasText(v.varianteNombre, 'DILM') ||
        hasText(v.varianteNombre, 'DILK') ||
        hasText(v.varianteNombre, 'DILER') ||
        hasText(v.varianteNombre, 'VARISTOR') ||
        hasText(v.varianteNombre, 'TEMP') ||
        hasText(v.varianteNombre, 'BLOQUEO') ||
        hasText(v.varianteNombre, 'ENCLAV') ||
        hasText(v.varianteNombre, 'DILA'),
    );
    const varZB = padreEatonCont.variantes.filter(
      (v) => hasText(v.varianteNombre, 'RELÉ TERMICO') || hasText(v.varianteNombre, 'BASE MONTAJE EN RIEL ZB'),
    );

    if (varZB.length > 0) {
      const padreZB = await prisma.equipo.upsert({
        where: { codigoInterno: 'EATON-RELES-TERMICOS-ZB' },
        update: {
          nombre: 'Relés Térmicos de Sobrecarga Eaton Serie ZB (ZB12, ZB32, ZB65, ZB150)',
          marca: 'Eaton',
          categoria: 'RELES',
          familiaId: padreEatonCont.familiaId,
          subfamiliaId: padreEatonCont.subfamiliaId,
          descripcion:
            'Relés bimetálicos de sobrecarga serie ZB12, ZB32, ZB65 y ZB150 (de 0.6A a 150A) con bases para montaje independiente en riel DIN ZB-XEZ.',
          precio: getMinPrecio(varZB),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreEatonCont.imagenUrl,
          padreId: null,
        },
        create: {
          codigoInterno: 'EATON-RELES-TERMICOS-ZB',
          nombre: 'Relés Térmicos de Sobrecarga Eaton Serie ZB (ZB12, ZB32, ZB65, ZB150)',
          marca: 'Eaton',
          categoria: 'RELES',
          familiaId: padreEatonCont.familiaId,
          subfamiliaId: padreEatonCont.subfamiliaId,
          descripcion:
            'Relés bimetálicos de sobrecarga serie ZB12, ZB32, ZB65 y ZB150 (de 0.6A a 150A) con bases para montaje independiente en riel DIN ZB-XEZ.',
          precio: getMinPrecio(varZB),
          unidad: 'PEN',
          tipo: TipoTransaccion.VENTA,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          ubicacion: 'Almacén Central',
          imagenUrl: padreEatonCont.imagenUrl,
          padreId: null,
        },
      });
      for (const v of varZB) {
        await prisma.equipo.update({
          where: { id: v.id },
          data: { padreId: padreZB.id, nombre: `${padreZB.nombre} - ${v.varianteNombre}` },
        });
      }
      console.log(`   ✅ Creado padre 'EATON-RELES-TERMICOS-ZB' con ${varZB.length} variantes.`);
    }

    if (varDILM.length > 0) {
      await prisma.equipo.update({
        where: { id: padreEatonCont.id },
        data: {
          codigoInterno: 'EATON-CONTACTORES-DILM-DILK',
          nombre: 'Contactores de Potencia DILM, Capacitivos DILK y Minicontactores DILER Eaton',
          descripcion:
            'Contactores tripolares serie DILM (9A a 500A), contactores para capacitores DILK (7.5kVAR a 20kVAR) y accesorios de mando DILA/XHI.',
        },
      });
      console.log(
        `   ✅ Renombrado padre Eaton a 'EATON-CONTACTORES-DILM-DILK' con ${varDILM.length} variantes de contactores.`,
      );
    }
  }

  console.log('\n✨ Reestructuración masiva completada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en script de reestructuración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
