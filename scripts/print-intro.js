const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const p = path.join(__dirname, '..', 'src', 'contratos', 'templates', 'contrato_alquiler.docx');
const z = new PizZip(fs.readFileSync(p, 'binary'));
const xml = z.file('word/document.xml').asText();

const paragraphs = xml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];
paragraphs.slice(0, 10).forEach((p, i) => {
  const t = (p.match(/<w:t[\s\S]*?>([\s\S]*?)<\/w:t>/g) || []).map(x => x.replace(/<[^>]+>/g, '')).join('');
  console.log(`[Párrafo ${i}]:`, t);
});
