/**
 * Script: crear-plantilla-desde-original.js
 * 
 * Copia el CONTRATO DE ALQUILER.docx original al directorio de templates
 * y reemplaza en el XML los placeholders con tags Docxtemplater correctos.
 * También inyecta al final del documento la tabla de equipos y el resumen financiero.
 * 
 * Ejecutar desde la raíz del backend:
 *   node scripts/crear-plantilla-desde-original.js
 */

const fs   = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const SRC  = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const DEST = path.join(__dirname, '..', 'src', 'contratos', 'templates', 'contrato_alquiler.docx');

if (!fs.existsSync(SRC)) {
  console.error('❌  No se encontró el archivo fuente:', SRC);
  process.exit(1);
}

console.log('📄  Leyendo plantilla original...');
const content = fs.readFileSync(SRC, 'binary');
const zip     = new PizZip(content);
let xml       = zip.file('word/document.xml').asText();

// ──────────────────────────────────────────────────────────────────────────────
// Función auxiliar: envuelve texto en un <w:t> seguro
// ──────────────────────────────────────────────────────────────────────────────
function wt(text) {
  return `<w:r><w:t xml:space="preserve">${text}</w:t></w:r>`;
}

// ──────────────────────────────────────────────────────────────────────────────
// 1. REEMPLAZOS DE PLACEHOLDERS EXISTENTES EN EL TEXTO LEGAL
// ──────────────────────────────────────────────────────────────────────────────

// Datos fijos del arrendador
xml = xml.replace(/\[RAZÓN SOCIAL DEL ARRENDADOR\]/g,  'HHT SOLUCIONES ELÉCTRICAS SAC');
xml = xml.replace(/con domicilio en \[DIRECCIÓN\],/g,   'con domicilio en Calle Los Andes 123, Piura,');
xml = xml.replace(/representada por \[NOMBRE DEL REPRESENTANTE\], a quien en adelante se le denominará EL ARRENDADOR/g,
  'representada por HECTOR HUIMAN TALLEDO, a quien en adelante se le denominará EL ARRENDADOR');

// Arrendatario → tags dinámicos
xml = xml.replace(/\[RAZÓN SOCIAL O NOMBRE DEL ARRENDATARIO\]/g, '{clienteEmpresa}');
// El segundo [NOMBRE DEL REPRESENTANTE] es el del arrendatario
xml = xml.replace(/representada por \[NOMBRE DEL REPRESENTANTE\], a quien en adelante se le denominará EL ARRENDATARIO/g,
  'representada por {clienteNombre}, a quien en adelante se le denominará EL ARRENDATARIO');

// Plazo
xml = xml.replace(
  /El periodo de alquiler será de \[____ días\/semanas\/meses\], iniciándose el \[fecha\] y culminando el \[fecha\]\./g,
  'El periodo de alquiler será de {dias} días calendario, iniciándose el {fechaInicio} y culminando el {fechaFin}.'
);

// Precio
xml = xml.replace(
  /El precio correspondiente al alquiler será de S\/ \[__________\]/g,
  'El precio total correspondiente al alquiler será de S/ {total}'
);

// ──────────────────────────────────────────────────────────────────────────────
// 2. INYECTAR BLOQUE FINAL ANTES DE </w:body>
//    Incluye: datos del contrato + tabla dinámica de equipos + totales + firma
// ──────────────────────────────────────────────────────────────────────────────
const bloqueFinal = `
  <!-- ===== DATOS DEL CONTRATO ===== -->
  <w:p>
    <w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:pPr>
    <w:r><w:rPr><w:b/><w:sz w:val="28"/></w:rPr><w:t>ANEXO N.° 01 – DETALLE DEL ALQUILER</w:t></w:r>
  </w:p>

  <w:p>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">N.° de Contrato: </w:t></w:r>
    <w:r><w:t>{numero}</w:t></w:r>
  </w:p>
  <w:p>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">Cliente: </w:t></w:r>
    <w:r><w:t xml:space="preserve">{clienteNombre} </w:t></w:r>
    <w:r><w:t xml:space="preserve">| Empresa: {clienteEmpresa}</w:t></w:r>
  </w:p>
  <w:p>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">DNI/RUC: </w:t></w:r>
    <w:r><w:t xml:space="preserve">{clienteDocumento}  </w:t></w:r>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve"> | Email: </w:t></w:r>
    <w:r><w:t xml:space="preserve">{clienteEmail}  </w:t></w:r>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve"> | Teléfono: </w:t></w:r>
    <w:r><w:t>{clienteTelefono}</w:t></w:r>
  </w:p>
  <w:p>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">Proyecto: </w:t></w:r>
    <w:r><w:t xml:space="preserve">{proyecto}  </w:t></w:r>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve"> | Sede: </w:t></w:r>
    <w:r><w:t>{sede}</w:t></w:r>
  </w:p>
  <w:p>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">Período: </w:t></w:r>
    <w:r><w:t xml:space="preserve">{fechaInicio}  al  {fechaFin}  ({dias} días)</w:t></w:r>
  </w:p>
  <w:p>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">Responsable: </w:t></w:r>
    <w:r><w:t>{responsable}</w:t></w:r>
  </w:p>
  <w:p><w:r><w:t></w:t></w:r></w:p>

  <!-- ===== TABLA DINÁMICA DE EQUIPOS ===== -->
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9360" w:type="dxa"/>
      <w:tblBorders>
        <w:top    w:val="single" w:sz="4" w:space="0" w:color="000000"/>
        <w:left   w:val="single" w:sz="4" w:space="0" w:color="000000"/>
        <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>
        <w:right  w:val="single" w:sz="4" w:space="0" w:color="000000"/>
        <w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>
        <w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/>
      </w:tblBorders>
      <w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>
    </w:tblPr>
    <!-- ENCABEZADO -->
    <w:tr>
      <w:trPr><w:tblHeader/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:trPr>
      <w:tc><w:tcPr><w:tcW w:w="400" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>#</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="2200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:tcPr>
        <w:p><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>Equipo / Descripción</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1000" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:tcPr>
        <w:p><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>Código</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:tcPr>
        <w:p><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>Marca / Modelo</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="700" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>Und.</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="700" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>Cant.</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1080" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>P. Unit. (S/)</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1080" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="162B4D"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>Subtotal (S/)</w:t></w:r></w:p>
      </w:tc>
    </w:tr>
    <!-- FILAS DINÁMICAS -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="400" w:type="dxa"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{#items}{num}</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="2200" w:type="dxa"/></w:tcPr>
        <w:p><w:r><w:t>{nombre}</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1000" w:type="dxa"/></w:tcPr>
        <w:p><w:r><w:t>{codigo}</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/></w:tcPr>
        <w:p><w:r><w:t xml:space="preserve">{marca} {modelo}</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="700" w:type="dxa"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{unidad}</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="700" w:type="dxa"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{cantidad}</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1080" w:type="dxa"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:t>{precioUnitario}</w:t></w:r></w:p>
      </w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1080" w:type="dxa"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:t>{subtotal}{/items}</w:t></w:r></w:p>
      </w:tc>
    </w:tr>
  </w:tbl>

  <!-- ===== TOTALES ===== -->
  <w:p><w:r><w:t></w:t></w:r></w:p>
  <w:p>
    <w:pPr><w:jc w:val="right"/></w:pPr>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">Subtotal (sin IGV):  S/ {subtotal}</w:t></w:r>
  </w:p>
  <w:p>
    <w:pPr><w:jc w:val="right"/></w:pPr>
    <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">IGV (18%):           S/ {igv}</w:t></w:r>
  </w:p>
  <w:p>
    <w:pPr><w:jc w:val="right"/></w:pPr>
    <w:r><w:rPr><w:b/><w:sz w:val="26"/></w:rPr><w:t xml:space="preserve">TOTAL:               S/ {total}</w:t></w:r>
  </w:p>

  <!-- ===== CONDICIONES / OBSERVACIONES ===== -->
  <w:p><w:r><w:t></w:t></w:r></w:p>
  <w:p>
    <w:r><w:rPr><w:b/></w:rPr><w:t>Condiciones adicionales:</w:t></w:r>
  </w:p>
  <w:p><w:r><w:t>{condiciones}</w:t></w:r></w:p>
  <w:p>
    <w:r><w:rPr><w:b/></w:rPr><w:t>Observaciones:</w:t></w:r>
  </w:p>
  <w:p><w:r><w:t>{observaciones}</w:t></w:r></w:p>

  <!-- ===== FIRMAS ===== -->
  <w:p><w:r><w:t></w:t></w:r></w:p>
  <w:p><w:r><w:t></w:t></w:r></w:p>
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9360" w:type="dxa"/>
      <w:tblBorders>
        <w:top    w:val="none"/><w:left w:val="none"/>
        <w:bottom w:val="none"/><w:right w:val="none"/>
        <w:insideH w:val="none"/><w:insideV w:val="none"/>
      </w:tblBorders>
    </w:tblPr>
    <w:tr>
      <w:tc>
        <w:tcPr><w:tcW w:w="4500" w:type="dxa"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>________________________________</w:t></w:r></w:p>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>EL ARRENDADOR</w:t></w:r></w:p>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>HHT SOLUCIONES ELÉCTRICAS SAC</w:t></w:r></w:p>
      </w:tc>
      <w:tc>
        <w:tcPr><w:tcW w:w="4860" w:type="dxa"/></w:tcPr>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>________________________________</w:t></w:r></w:p>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>EL ARRENDATARIO</w:t></w:r></w:p>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{clienteNombre}</w:t></w:r></w:p>
        <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>DNI/RUC: {clienteDocumento}</w:t></w:r></w:p>
      </w:tc>
    </w:tr>
  </w:tbl>
  <w:p><w:r><w:t></w:t></w:r></w:p>
  <w:p><w:pPr><w:jc w:val="center"/></w:pPr>
    <w:r><w:t>Piura, {fechaDocumento}</w:t></w:r>
  </w:p>
`;

// Inyectar antes del cierre de </w:body>
xml = xml.replace('</w:body>', bloqueFinal + '</w:body>');

// Guardar
zip.file('word/document.xml', xml);
const out = zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' });
fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.writeFileSync(DEST, out);

console.log('✅  Plantilla generada exitosamente en:');
console.log('   ', DEST);
console.log('');
console.log('📌  Tags incluidos:');
console.log('    {numero}  {clienteNombre}  {clienteEmpresa}  {clienteDocumento}');
console.log('    {clienteEmail}  {clienteTelefono}  {proyecto}  {sede}');
console.log('    {fechaInicio}  {fechaFin}  {dias}  {fechaDocumento}');
console.log('    {subtotal}  {igv}  {total}  {condiciones}  {observaciones}');
console.log('    {#items}  {num}  {nombre}  {codigo}  {marca}  {modelo}');
console.log('    {unidad}  {cantidad}  {precioUnitario}  {subtotal}  {/items}');
