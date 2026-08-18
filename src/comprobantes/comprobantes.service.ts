import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TipoComprobante, EstadoComprobante } from '@prisma/client';
import { CrearComprobanteDto } from './dto/crear-comprobante.dto';

@Injectable()
export class ComprobantesService {
  constructor(private prisma: PrismaService) {}

  async listar(tipo?: string, busqueda?: string) {
    const where: any = {};
    if (tipo) where.tipo = tipo;
    if (busqueda) {
      where.OR = [
        { clienteNumDoc: { contains: busqueda } },
        { clienteRazon: { contains: busqueda } },
        { serie: { contains: busqueda } },
      ];
    }

    return this.prisma.comprobante.findMany({
      where,
      include: {
        contrato: {
          select: {
            id: true,
            numero: true,
            proyecto: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async obtenerPorId(id: string) {
    const comprobante = await this.prisma.comprobante.findUnique({
      where: { id },
      include: { contrato: true },
    });
    if (!comprobante) throw new NotFoundException('Comprobante no encontrado');
    return comprobante;
  }

  async crearComprobante(dto: CrearComprobanteDto) {
    // 1. Determinar serie según tipo
    const serie = dto.tipo === TipoComprobante.FACTURA ? 'F001' : dto.tipo === TipoComprobante.BOLETA ? 'B001' : 'FC01';

    // 2. Correlativo autoincremental
    const ultimo = await this.prisma.comprobante.findFirst({
      where: { serie },
      orderBy: { numero: 'desc' },
    });
    const nuevoNumero = (ultimo?.numero || 0) + 1;

    // 3. Simulación de Adaptador OSE/SUNAT / Nubefact / FacturaLibre (Ambiente DEMO)
    // En producción se reemplaza con la llamada HTTP real al API del proveedor
    const pdfUrlDemo = `https://demo.facturalibre.org/comprobante/pdf/${serie}-${nuevoNumero}.pdf`;
    const xmlUrlDemo = `https://demo.facturalibre.org/comprobante/xml/${serie}-${nuevoNumero}.xml`;

    return this.prisma.comprobante.create({
      data: {
        tipo: dto.tipo,
        serie,
        numero: nuevoNumero,
        clienteTipoDoc: dto.clienteTipoDoc || (dto.clienteNumDoc.length === 11 ? '6' : '1'),
        clienteNumDoc: dto.clienteNumDoc,
        clienteRazon: dto.clienteRazon,
        clienteDireccion: dto.clienteDireccion,
        clienteEmail: dto.clienteEmail,
        montoSubtotal: dto.montoSubtotal,
        montoIgv: dto.montoIgv,
        montoTotal: dto.montoTotal,
        moneda: dto.moneda || 'PEN',
        estado: EstadoComprobante.ACEPTADO,
        pdfUrl: pdfUrlDemo,
        xmlUrl: xmlUrlDemo,
        observacion: dto.observacion || 'Emitido automáticamente vía módulo de facturación HHTRENT (Modo DEMO)',
        contratoId: dto.contratoId || null,
      },
    });
  }
}
