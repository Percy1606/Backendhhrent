const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

const tables = xml.match(/<w:tbl[\s\S]*?<\/w:tbl>/g) || [];
console.log('Total tables in original docx:', tables.length);
tables.forEach((tbl, i) => {
  console.log(`\n--- TABLE ${i} ---`);
  console.log(tbl.slice(0, 800));
});
