const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

async function debugXml() {
  const contrato = await prisma.contratoAlquiler.findUnique({
    where: { id: '4ff8447c-0220-4aad-b5f8-affe46a777b3' },
    include: { items: { include: { equipo: true } } }
  });

  const templatePath = path.join(__dirname, '..', 'src', 'contratos', 'templates', 'contrato_alquiler.docx');
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  const fmt = (n) => n == null ? '0.00' : Number(n).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtDate = (d) => {
    if (!d) return '—';
    const date = typeof d === 'string' ? new Date(d) : d;
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const ms = new Date(contrato.fechaFin).getTime() - new Date(contrato.fechaInicio).getTime();
  const dias = Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
  const subtotal = Number(contrato.subtotal ?? 0);
  const igv = Number(contrato.igv ?? subtotal * 0.18);
  const total = Number(contrato.total ?? subtotal + igv);

  const items = contrato.items.map((item, idx) => ({
    num: idx + 1,
    nombre: item.equipo.nombre,
    codigo: item.equipo.codigoInterno || item.equipo.serie || '—',
    marca: item.equipo.marca || '—',
    modelo: item.equipo.modelo || item.equipo.nombre,
    serie: item.equipo.serie || '—',
    unidad: item.equipo.unidad || 'UND',
    cantidad: item.cantidad ?? 1,
    precioUnitario: fmt(Number(item.precioUnitario ?? 0)),
    subtotal: fmt(Number(item.subtotal ?? 0)),
  }));

  const datos = {
    numero: contrato.numero,
    clienteNombre: (contrato.clienteNombre || '').trim(),
    clienteEmpresa: (contrato.clienteEmpresa || contrato.clienteNombre || '').trim(),
    clienteDocumento: (contrato.clienteDocumento || '—').trim(),
    clienteEmail: (contrato.clienteEmail || '').trim(),
    clienteTelefono: (contrato.clienteTelefono || '').trim(),
    proyecto: (contrato.proyecto || '').trim(),
    sede: (contrato.sede || 'Piura').trim(),
    fechaInicio: fmtDate(contrato.fechaInicio),
    fechaFin: fmtDate(contrato.fechaFin),
    dias,
    responsable: (contrato.responsableNombre || '—').trim(),
    observaciones: (contrato.observaciones || 'Ninguna').trim(),
    condiciones: (contrato.condiciones || '').trim(),
    subtotal: fmt(subtotal),
    igv: fmt(igv),
    total: fmt(total),
    fechaDocumento: fmtDate(new Date()),
    items,
    accesorios: items,
  };

  doc.render(datos);
  const renderedXml = doc.getZip().file('word/document.xml').asText();

  console.log('--- BUSCANDO SALTOS DE PÁGINA (page breaks / br / sectPr / pageBreakBefore) ---');
  const ps = renderedXml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];
  ps.forEach((p, i) => {
    const text = (p.match(/<w:t[\s\S]*?>([\s\S]*?)<\/w:t>/g) || []).map(x => x.replace(/<[^>]+>/g, '')).join('');
    const hasBrPage = p.includes('w:type="page"');
    const hasSectPr = p.includes('<w:sectPr');
    const hasPageBreakBefore = p.includes('<w:pageBreakBefore/>') || p.includes('<w:pageBreakBefore');
    const hasLastRendered = p.includes('<w:lastRenderedPageBreak');

    if (hasBrPage || hasSectPr || hasPageBreakBefore || hasLastRendered || text.length === 0) {
      console.log(`[P ${i}] brPage:${hasBrPage} sectPr:${hasSectPr} pageBreakBefore:${hasPageBreakBefore} lastRendered:${hasLastRendered} emptyText:${text.length===0} -> Text: "${text.slice(0, 50)}"`);
      if (hasBrPage || hasSectPr || hasPageBreakBefore) {
        console.log(`   XML:`, p.slice(0, 300));
      }
    }
  });
}

debugXml().finally(() => prisma.$disconnect());
