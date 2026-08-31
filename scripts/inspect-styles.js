const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);

console.log('--- styles.xml ---');
if (zip.file('word/styles.xml')) {
  const stylesXml = zip.file('word/styles.xml').asText();
  const styles = stylesXml.match(/<w:style[\s\S]*?<\/w:style>/g) || [];
  styles.forEach(s => {
    if (s.includes('Prrafodelista') || s.includes('ListParagraph') || s.includes('Normal')) {
      console.log(s);
    }
  });
}

console.log('--- numbering.xml ---');
if (zip.file('word/numbering.xml')) {
  console.log(zip.file('word/numbering.xml').asText().slice(0, 1500));
}
