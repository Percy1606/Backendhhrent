const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const srcPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'img', 'CONTRATO DE ALQUILER.docx');
const content = fs.readFileSync(srcPath, 'binary');
const zip = new PizZip(content);
const stylesXml = zip.file('word/styles.xml').asText();

const sDefault = stylesXml.match(/<w:docDefaults>[\s\S]*?<\/w:docDefaults>/);
console.log('docDefaults:', sDefault ? sDefault[0] : 'None');

const sNormal = stylesXml.match(/<w:style[^>]*w:styleId="Normal"[\s\S]*?<\/w:style>/);
console.log('Normal style:', sNormal ? sNormal[0] : 'None');

const sList = stylesXml.match(/<w:style[^>]*w:styleId="Prrafodelista"[\s\S]*?<\/w:style>/);
console.log('Prrafodelista style:', sList ? sList[0] : 'None');
