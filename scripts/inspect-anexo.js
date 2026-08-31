const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

const ps = xml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];
ps.forEach((p, idx) => {
  if (idx >= 140) {
    const t = (p.match(/<w:t[\s\S]*?>([\s\S]*?)<\/w:t>/g) || []).map(x => x.replace(/<[^>]+>/g, '')).join('');
    console.log(`[P ${idx}]:`, t, 'hasPageBreak:', p.includes('w:type="page"') || p.includes('<w:br w:type="page"/>') || p.includes('<w:pageBreakBefore/>'));
  }
});
