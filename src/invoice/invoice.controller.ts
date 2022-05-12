import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';

@Controller('api/invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('all')
  @ApiQuery({ name: 'vendorId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  getAll(
    @Query('vendorId') vendorId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!!vendorId || !!startDate || !!endDate) {
      return this.invoiceService.getInvoicesWithFilters(
        vendorId,
        startDate,
        endDate,
      );
    } else {
      return this.invoiceService.getAll();
    }
  }
}
