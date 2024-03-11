import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BillService } from './bill.service';
import { User } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('bills')
export class BillController {
    constructor(private billService: BillService) { }

    @Get()
    getBills(@User('id') userId: number) {
        return this.billService.getBills(userId);
    }

    @Get(':id')
    getBillById(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) billId: number
    ) {
        return this.billService.getBillById(userId, billId);
    }
}
