const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const text = fs.readFileSync('./parsed_text.txt', 'utf-8');
  const lines = text.split('\n').map(l => l.trim()).filter(l => l !== '');
  
  let currentEquipo = null;
  let currentField = null;
  const equipos = [];
  
  let i = 2;
  while(i < lines.length) {
    const line = lines[i];
    if (line.match(/^\d+\.\s+/)) {
        if (currentEquipo) {
            equipos.push(currentEquipo);
        }
        currentEquipo = {};
        currentField = null;
    } else if (currentEquipo) {
        const fields = ['nombre', 'ubicacion', 'categoria', 'descripcion', 'tipo', 'imagenUrl', 'codigoInterno', 'familiaId', 'subfamiliaId', 'marca', 'modelo', 'serie', 'anio', 'proveedor', 'costo', 'valorComercial', 'valorReposicion', 'estado', 'precio', 'unidad', 'imagenThumbUrl', 'destacado', 'observaciones', 'padreId', 'varianteNombre'];
        
        if (fields.includes(line)) {
            currentField = line;
        } else if (line.startsWith('Historial inicial:')) {
            // Ignore
        } else if (currentField) {
            if (currentEquipo[currentField]) {
                currentEquipo[currentField] += ' ' + line;
            } else {
                currentEquipo[currentField] = line;
            }
        }
    }
    i++;
  }
  
  if (currentEquipo) {
      equipos.push(currentEquipo);
  }
  
  console.log('Total equipos encontrados: ' + equipos.length);
  
  for (const eq of equipos) {
      const data = {
          nombre: eq.nombre || 'Sin nombre',
          ubicacion: eq.ubicacion && eq.ubicacion !== 'Por definir' ? eq.ubicacion : 'Almacén Principal',
          categoria: eq.categoria && eq.categoria !== 'Por definir' ? eq.categoria : 'General',
          descripcion: eq.descripcion || 'Sin descripción',
          tipo: (eq.tipo === 'ALQUILER' || eq.tipo === 'VENTA' || eq.tipo === 'PROYECTO') ? eq.tipo : 'ALQUILER',
          imagenUrl: eq.imagenUrl && eq.imagenUrl !== 'Por asignar' ? eq.imagenUrl : 'https://via.placeholder.com/300',
          estado: 'DISPONIBLE',
      };
      
      if (eq.observaciones && eq.observaciones !== 'Sin observaciones adicionales en el catálogo.' && !eq.observaciones.startsWith('El catálogo')) {
          data.observaciones = eq.observaciones;
      }
      
      try {
        await prisma.equipo.create({ data: data });
        console.log('Creado exitosamente: ' + data.nombre);
      } catch (err) {
        console.error('Error al crear ' + data.nombre + ':', err.message);
      }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
