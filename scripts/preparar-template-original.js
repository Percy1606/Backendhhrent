/**
 * Script de generación de plantilla CONTRATO DE ALQUILER
 * 
 * - Mantiene TODO el contenido íntegro del contrato y del Anexo 01.
 * - Limpia saltos de sección huérfanos (<w:sectPr>) dentro de los párrafos que causaban páginas en blanco.
 * - Mantiene el formato A4 estándar y limpio.
 */
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const destPath = path.join(__dirname, '..', 'src', 'contratos', 'templates', 'contrato_alquiler.docx');

console.log('Generando plantilla sin saltos de página ni secciones intermedias...');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);

// 1. STYLES.XML
if (zip.file('word/styles.xml')) {
  let stylesXml = zip.file('word/styles.xml').asText();
  stylesXml = stylesXml.replace(/<w:rFonts[^>]*\/>/g, '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>');
  stylesXml = stylesXml.replace(/<w:sz\s+w:val="[^"]*"\/>/g, '<w:sz w:val="24"/>');
  stylesXml = stylesXml.replace(/<w:szCs\s+w:val="[^"]*"\/>/g, '<w:szCs w:val="24"/>');
  zip.file('word/styles.xml', stylesXml);
}

// 2. NUMBERING.XML
if (zip.file('word/numbering.xml')) {
  let numXml = zip.file('word/numbering.xml').asText();
  numXml = numXml.replace(/<w:rFonts[^>]*\/>/g, '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>');
  zip.file('word/numbering.xml', numXml);
}

// 3. DOCUMENT.XML
let xml = zip.file('word/document.xml').asText();

// Párrafo de comparecencia (Cabecera oficial)
const textoIntroOriginalRegex = /Conste por el presente documento el Contrato de Arrendamiento[\s\S]*?a quien en adelante se le denominará EL ARRENDATARIO\./;
const textoIntroNuevo = `Conste por el presente documento el Contrato de Arrendamiento de Instrumentos y Equipos Eléctricos (N.° {numero}) que celebran, de una parte, HH T SOLUCIONA S.A.C., con RUC N.° 20611371692, con domicilio en Av. Colectora Norte Nro. 509, Urb. Parques del Chipe, Piura, Perú, debidamente representada por su responsable {responsable}, a quien en adelante se le denominará EL ARRENDADOR; y, de la otra parte, {clienteEmpresa}, con documento/RUC N.° {clienteDocumento}, con domicilio/sede en {sede}, para el proyecto {proyecto}, debidamente representada por {clienteNombre}, a quien en adelante se le denominará EL ARRENDATARIO.`;
xml = xml.replace(textoIntroOriginalRegex, textoIntroNuevo);

// Cláusulas de Plazo y Precio
xml = xml.replace(
  /El periodo de alquiler será de \[____ días\/semanas\/meses\], iniciándose el \[fecha\] y culminando el \[fecha\]\./g,
  'El periodo de alquiler será de {dias} día(s) calendario, iniciándose el {fechaInicio} y culminando el {fechaFin}.'
);
xml = xml.replace(
  /El precio correspondiente al alquiler será de S\/ \[__________\]/g,
  'El precio total correspondiente al alquiler será de S/ {total} (Subtotal: S/ {subtotal} + IGV 18%: S/ {igv})'
);
xml = xml.replace(/\[Transferencia\/efectivo\/ depóstio u otro\)/g, 'Transferencia bancaria / Depósito a cuenta corriente');
xml = xml.replace(/\[Transferencia\/efectivo\/ depóstio u otro\]/g, 'Transferencia bancaria / Depósito a cuenta corriente');
xml = xml.replace(
  /en la ciudad de \[ciudad\], el día \[\] del mes de \[\] del \[20\.\.\],/g,
  'en la ciudad de {sede}, el día {fechaDocumento},'
);

// FIRMAS DEL ARRENDADOR
xml = xml.replace(/Razón social:\s*<\/w:t>/, 'Razón social: HH T SOLUCIONA S.A.C.</w:t>');
xml = xml.replace(/RUC:\s*<\/w:t>/, 'RUC: 20611371692</w:t>');
xml = xml.replace(/Representante:\s*<\/w:t>/, 'Representante: {responsable}</w:t>');
xml = xml.replace(/DNI\/CE:\s*<\/w:t>/, 'DNI/CE: —</w:t>');
xml = xml.replace(/Cargo:\s*<\/w:t>/, 'Cargo: Responsable de Operaciones</w:t>');

// FIRMAS DEL ARRENDATARIO
xml = xml.replace(/Razón social \/ Nombre:\s*<\/w:t>/, 'Razón social / Nombre: {clienteEmpresa}</w:t>');
xml = xml.replace(/RUC\/DNI:\s*<\/w:t>/, 'RUC/DNI: {clienteDocumento}</w:t>');
xml = xml.replace(/Representante:\s*<\/w:t>/, 'Representante: {clienteNombre}</w:t>');
xml = xml.replace(/DNI\/CE:\s*<\/w:t>/, 'DNI/CE: {clienteDocumento}</w:t>');
xml = xml.replace(/Cargo:\s*<\/w:t>/, 'Cargo: Representante / Titular</w:t>');

// ANEXO 01 - Condiciones y Observaciones
xml = xml.replace(/Fecha de entrega: \[____ \/ ____ \/ ______\]/g, 'Fecha de entrega: {fechaInicio}');
xml = xml.replace(/Fecha de devolución: \[____ \/ ____ \/ ______\]/g, 'Fecha de devolución: {fechaFin} ({dias} días)');
xml = xml.replace(/Precio del alquiler: S\/ \[________________\]/g, 'Precio del alquiler: S/ {total} (Incluye IGV)');
xml = xml.replace(/Penalidad por devolución tardía: S\/ \[________________\] por día/g, 'Penalidad por devolución tardía: Según tarifario vigente por día');
xml = xml.replace(/Valor de reposición del equipo: S\/ \[________________\]/g, 'Valor de reposición del equipo: Según valor comercial de reposición');
xml = xml.replace(/Estado al momento de la entrega: \[________________________________\]/g, 'Estado al momento de la entrega: Conforme y Operativo');
xml = xml.replace(/Observaciones adicionales:/g, 'Observaciones adicionales: {observaciones}');

// ELIMINAR SALTOS DE SECCIÓN INCRUSTADOS EN PÁRRAFOS (sectPr dentro de w:pPr)
// Un sectPr dentro de un párrafo en Word fuerza un salto de página artificial.
xml = xml.replace(/<w:pPr>([\s\S]*?)<\/w:pPr>/g, (pPrMatch, inner) => {
  const cleanInner = inner.replace(/<w:sectPr\b[\s\S]*?<\/w:sectPr>/g, '')
                          .replace(/<w:pageBreakBefore\/>/g, '');
  return `<w:pPr>${cleanInner}</w:pPr>`;
});

// Eliminar saltos de página y marcas de renderizado previo
xml = xml.replace(/<w:br\s+w:type="page"\/>/g, '');
xml = xml.replace(/<w:lastRenderedPageBreak\/>/g, '');

// Tablas dinámicas en ANEXO 01
const filaEquipoLoop = `<w:tr>
  <w:tc><w:tcPr><w:tcW w:w="465" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{#items}{num}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1761" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{codigo}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1170" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{modelo}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1107" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{marca}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1134" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{cantidad}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="992" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{unidad}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1476" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{precioUnitario}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1683" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{subtotal}{/items}</w:t></w:r></w:p></w:tc>
</w:tr>`;

const filaAccesoriosLoop = `<w:tr>
  <w:tc><w:tcPr><w:tcW w:w="465" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{#accesorios}{num}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1761" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{codigo}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1170" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{modelo}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1107" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{marca}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1134" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{cantidad}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="992" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{unidad}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1476" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{precioUnitario}</w:t></w:r></w:p></w:tc>
  <w:tc><w:tcPr><w:tcW w:w="1683" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/></w:rPr><w:t>{subtotal}{/accesorios}</w:t></w:r></w:p></w:tc>
</w:tr>`;

const tables = xml.match(/<w:tbl[\s\S]*?<\/w:tbl>/g) || [];
if (tables.length >= 2) {
  let tblEquipos = tables[0];
  const trsEquipos = tblEquipos.match(/<w:tr[\s\S]*?<\/w:tr>/g) || [];
  if (trsEquipos.length > 0) {
    const tblEquiposNueva = tblEquipos.replace(trsEquipos.slice(1).join(''), filaEquipoLoop);
    xml = xml.replace(tblEquipos, tblEquiposNueva);
  }

  let tblAcc = tables[1];
  const trsAcc = tblAcc.match(/<w:tr[\s\S]*?<\/w:tr>/g) || [];
  if (trsAcc.length > 0) {
    const tblAccNueva = tblAcc.replace(trsAcc.slice(1).join(''), filaAccesoriosLoop);
    xml = xml.replace(tblAcc, tblAccNueva);
  }
}

zip.file('word/document.xml', xml);
const out = zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' });
fs.mkdirSync(path.dirname(destPath), { recursive: true });
fs.writeFileSync(destPath, out);

console.log('✅ Plantilla completa y limpia generada con éxito.');
