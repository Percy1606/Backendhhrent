const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

const tables = xml.match(/<w:tbl[\s\S]*?<\/w:tbl>/g) || [];
tables.forEach((tbl, i) => {
  console.log(`\n=== Table ${i} full ===`);
  const trs = tbl.match(/<w:tr[\s\S]*?<\/w:tr>/g) || [];
  trs.forEach((tr, tri) => {
    console.log(` Row ${tri}:`, tr.slice(0, 400));
  });
});
