import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { InvoiceService } from './invoice.service';
import { User } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('invoice')
export class InvoiceController {
    constructor(private invoiceService: InvoiceService) { }

    @Get()
    getInvoices(@User('id') userId: number) {
        return this.invoiceService.getInvoices(userId);
    }

    @Get(':id')
    getInvoiceById(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) invoiceId: number
    ) {
        return this.invoiceService.getInvoiceById(userId, invoiceId);
    }
}
