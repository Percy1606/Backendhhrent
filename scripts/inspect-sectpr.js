const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

const sect = xml.match(/<w:sectPr[\s\S]*?<\/w:sectPr>/g) || [];
console.log('SectPrs in original docx:');
sect.forEach((s, idx) => {
  console.log(`[Sect ${idx}]:`, s);
});
