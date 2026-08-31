const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const p = path.join(__dirname, '..', 'src', 'contratos', 'templates', 'contrato_alquiler.docx');
console.log('Reading template from:', p);

try {
  const content = fs.readFileSync(p, 'binary');
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    numero: 'HTR-ALQ-001',
    clienteNombre: 'Percy Arismendiz',
    clienteEmpresa: 'Constructora SAC',
    clienteDocumento: '20601234567',
    clienteEmail: 'cliente@correo.com',
    clienteTelefono: '987654321',
    proyecto: 'Obra Piura Centro',
    sede: 'Piura',
    fechaInicio: '28/08/2026',
    fechaFin: '05/09/2026',
    dias: 8,
    condiciones: 'Pago al contado',
    observaciones: 'Ninguna',
    responsable: 'Administrador',
    subtotal: '250.00',
    igv: '45.00',
    total: '295.00',
    fechaDocumento: '28/08/2026',
    items: [
      {
        num: 1,
        nombre: 'Guantes dieléctricos de media tensión',
        codigo: 'GUA-001',
        marca: 'CATU',
        modelo: 'CG-10',
        serie: 'SN123',
        unidad: 'par',
        cantidad: 2,
        precioUnitario: '50.00',
        subtotal: '100.00',
      },
      {
        num: 2,
        nombre: 'Poleas',
        codigo: 'POL-002',
        marca: 'Generic',
        modelo: 'P-50',
        serie: 'SN456',
        unidad: 'und',
        cantidad: 2,
        precioUnitario: '30.00',
        subtotal: '60.00',
      },
      {
        num: 3,
        nombre: 'Telurómetro digital Prasek',
        codigo: 'TEL-003',
        marca: 'Prasek',
        modelo: 'PR-511',
        serie: 'SN789',
        unidad: 'und',
        cantidad: 1,
        precioUnitario: '90.00',
        subtotal: '90.00',
      }
    ]
  });

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  const outPath = path.join(__dirname, '..', 'test_salida.docx');
  fs.writeFileSync(outPath, buf);
  console.log('✅ Archivo DOCX generado con éxito en:', outPath, '(Tamaño:', buf.length, 'bytes)');
} catch (err) {
  console.error('❌ Error al renderizar template:', err);
  if (err.properties && err.properties.errors) {
    console.error('Detalles de errores docxtemplater:', JSON.stringify(err.properties.errors, null, 2));
  }
}
