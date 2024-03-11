import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoiceService {
    constructor(private prisma: PrismaService) { }

    async getInvoices(userId: number) {
        return await this.prisma.invoice.findMany({
            where: {
                userId
            }
        });
    }

    async getInvoiceById(userId: number, invoiceId: number) {
        const invoice = await this.prisma.invoice.findFirstOrThrow({
            where: {
                id: invoiceId,
                userId
            }
        });

        if (!invoice) {
            throw new NotFoundException({
                message: "No invoices with matching id"
            });
        }

        return invoice;
    }
}
