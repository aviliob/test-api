import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CurrencyEnum } from 'src/constants';
import { InvoiceService } from './invoice.service';

@Controller('api/invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('all')
  @ApiQuery({ name: 'vendorId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'currency', required: false, enum: CurrencyEnum })
  getAll(
    @Query('vendorId') vendorId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('currency') currency: CurrencyEnum,
  ) {
    if (!!vendorId || !!startDate || !!endDate) {
      return this.invoiceService.getInvoicesWithFilters(
        vendorId,
        startDate,
        endDate,
        currency,
      );
    } else {
      return this.invoiceService.getAll(currency);
    }
  }
}
