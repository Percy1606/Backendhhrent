import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const IGV_RATE = 0.18;

function fmt(n: number | null | undefined): string {
  if (n == null) return '0.00';
  return Number(n).toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return '—';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function calcDias(inicio: Date, fin: Date): number {
  const ms = fin.getTime() - inicio.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

@Injectable()
export class ContratosService {
  constructor(private readonly prisma: PrismaService) {}

  async generarDocx(contratoId: string): Promise<Buffer> {
    const contrato = await this.prisma.contratoAlquiler.findUnique({
      where: { id: contratoId },
      include: {
        items: {
          include: {
            equipo: {
              select: {
                nombre: true,
                codigoInterno: true,
                marca: true,
                modelo: true,
                serie: true,
                unidad: true,
                descripcion: true,
              },
            },
          },
        },
      },
    });

    if (!contrato) {
      throw new NotFoundException(`Contrato ${contratoId} no encontrado`);
    }

    const dias = calcDias(
      new Date(contrato.fechaInicio),
      new Date(contrato.fechaFin),
    );

    const subtotal = Number(contrato.subtotal ?? 0);
    const igv = Number(contrato.igv ?? subtotal * IGV_RATE);
    const total = Number(contrato.total ?? subtotal + igv);

    const items = contrato.items.map((item, idx) => {
      const precio = Number(item.precioUnitario ?? 0);
      const cantidad = item.cantidad ?? 1;
      const sub = Number(item.subtotal ?? precio * cantidad);
      return {
        num: idx + 1,
        nombre: item.equipo.nombre,
        codigo: item.equipo.codigoInterno || item.equipo.serie || '—',
        marca: item.equipo.marca || '—',
        modelo: item.equipo.modelo || item.equipo.nombre,
        serie: item.equipo.serie || '—',
        unidad: item.equipo.unidad || 'UND',
        cantidad,
        precioUnitario: fmt(precio),
        subtotal: fmt(sub),
      };
    });

    // Cargar la plantilla .docx exacta basada en el original
    const templatePath = path.join(
      process.cwd(),
      'src',
      'contratos',
      'templates',
      'contrato_alquiler.docx',
    );

    if (!fs.existsSync(templatePath)) {
      throw new NotFoundException(
        `Plantilla no encontrada en: ${templatePath}`,
      );
    }

    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Mapeo completo con los datos del contrato y accesorios
    const datos = {
      numero: contrato.numero,
      clienteNombre: (contrato.clienteNombre || '').trim(),
      clienteEmpresa: (contrato.clienteEmpresa || contrato.clienteNombre || '').trim(),
      clienteDocumento: (contrato.clienteDocumento || '—').trim(),
      clienteEmail: (contrato.clienteEmail || '').trim(),
      clienteTelefono: (contrato.clienteTelefono || '').trim(),
      proyecto: (contrato.proyecto || '').trim(),
      sede: (contrato.sede || 'Piura').trim(),
      fechaInicio: fmtDate(contrato.fechaInicio),
      fechaFin: fmtDate(contrato.fechaFin),
      dias,
      responsable: (contrato.responsableNombre || '—').trim(),
      observaciones: (contrato.observaciones || 'Ninguna').trim(),
      condiciones: (contrato.condiciones || '').trim(),
      subtotal: fmt(subtotal),
      igv: fmt(igv),
      total: fmt(total),
      fechaDocumento: fmtDate(new Date()),
      items,
      accesorios: items, // También llena la tabla 3 de ACCESORIOS ENTREGADOS
    };

    doc.render(datos);

    return doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
  }
}
