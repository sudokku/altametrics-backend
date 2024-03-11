import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoiceService {
    constructor(private prisma: PrismaService) { }

    getInvoices(userId: number) {
        return this.prisma.invoice.findMany({
            where: {
                userId
            }
        });
    }

    getInvoiceById(userId: number, invoiceId: number) {
        return this.prisma.invoice.findFirst({
            where: {
                id: invoiceId,
                userId
            }
        });
    }
}
