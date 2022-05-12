import { BadRequestException, Injectable } from '@nestjs/common';
import { isValid } from 'date-fns';
import { InvoiceEntity } from 'src/entities/invoices.entity';

@Injectable()
export class UtilsService {
  constructor() {
    /** */
  }

  isValidDate(dateStr: string) {
    return (
      !!dateStr &&
      dateStr.includes('-') &&
      dateStr.split('-').length === 3 &&
      isValid(new Date(dateStr))
    );
  }

  invoiceReportParse(data: any): InvoiceEntity {
    return {
      invoiceId: Number(data.INVOICE_ID),
      vendorId: Number(data.VENDOR_ID),
      invoiceNumber: data.INVOICE_NUMBER,
      invoiceDate: data.INVOICE_DATE,
      invoiceDatetime: this.stringDateParser(data.INVOICE_DATE),
      invoiceTotal: Number(data.INVOICE_TOTAL),
      creditTotal: Number(data.CREDIT_TOTAL),
      bankId: Number(data.BANK_ID),
      invoiceDueDate: data.INVOICE_DUE_DATE,
      paymentDate: data.PAYMENT_DATE,
      currency: data.CURRENCY,
      paymentTotal: data.PAYMENT_TOTAL,
      id: data.INVOICE_ID,
    };
  }

  csvToJSON(csv: string) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }

  private stringDateParser(date: string) {
    if (!date) {
      throw new BadRequestException({
        message: 'Error parsing date from string',
      });
    }

    const months = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    const splittedDate = date.split('-');

    const day = splittedDate[0];
    const month = months[splittedDate[1]];
    const year = splittedDate[2];

    if (!day || !month || !year) {
      throw new BadRequestException({
        message: 'Error parsing date from string',
      });
    }

    return new Date(Number(year) + 2000, Number(month), Number(day));
  }
}
