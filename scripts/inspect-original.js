const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
console.log('Inspecting original file:', srcPath);

const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

// Buscar todos los párrafos y tablas del documento
const paragraphs = xml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];
console.log('Total paragraphs found:', paragraphs.length);

let plainTexts = [];
paragraphs.forEach((p, idx) => {
  const texts = (p.match(/<w:t[\s\S]*?>([\s\S]*?)<\/w:t>/g) || []).map(t => t.replace(/<[^>]+>/g, '')).join('');
  if (texts.trim()) {
    plainTexts.push(`[${idx}] ${texts.trim()}`);
  }
});

fs.writeFileSync(path.join(__dirname, '..', 'original_paragraphs.txt'), plainTexts.join('\n'), 'utf8');
console.log('Saved paragraphs to original_paragraphs.txt. Total non-empty:', plainTexts.length);
