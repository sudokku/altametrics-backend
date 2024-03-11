import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillService {
    constructor(private prisma: PrismaService) { }

    async getBills(userId: number) {
        return await this.prisma.bill.findMany({
            where: {
                userId
            }
        });
    }

    async getBillById(userId: number, billId: number) {
        const bill = await this.prisma.bill.findFirst({
            where: {
                id: billId,
                userId
            }
        });

        if (!bill) {
            throw new NotFoundException({
                message: "No bills with matching id"
            });
        }

        return bill;
    }
}
