const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);

console.log('--- fontTable.xml ---');
if (zip.file('word/fontTable.xml')) {
  console.log(zip.file('word/fontTable.xml').asText());
}
