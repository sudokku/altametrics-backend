import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillService {
    constructor(private prisma: PrismaService) { }

    getBills(userId: number) {
        return this.prisma.bill.findMany({
            where: {
                userId
            }
        });
    }

    getBillById(userId: number, billId: number) {
        return this.prisma.bill.findFirst({
            where: {
                id: billId,
                userId
            }
        })
    }
}
