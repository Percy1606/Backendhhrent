const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', 'src', 'contratos', 'templates', 'contrato_alquiler.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

const ps = xml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];
console.log('Total párrafos en template compilado:', ps.length);
ps.forEach((p, idx) => {
  const t = (p.match(/<w:t[\s\S]*?>([\s\S]*?)<\/w:t>/g) || []).map(x => x.replace(/<[^>]+>/g, '')).join('');
  if (t.length > 0) {
    console.log(`[P ${idx}]:`, t.slice(0, 70));
  }
});
