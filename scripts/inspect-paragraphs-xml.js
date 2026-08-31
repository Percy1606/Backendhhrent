const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

const ps = xml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];
ps.forEach((p, idx) => {
  if (p.includes('Golpes o caídas') || p.includes('Funcionamiento general') || p.includes('PRIMERA: OBJETO')) {
    console.log(`\n=== PARRAFO ${idx} ===`);
    console.log(p);
  }
});
