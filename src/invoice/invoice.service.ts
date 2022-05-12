import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { InvoiceEntity, InvoiceResponse } from 'src/entities/invoices.entity';
import { FirebaseService } from 'src/shared/firebase/firebase.service';
import { UtilsService } from 'src/shared/utils/utils.service';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    private httpService: HttpService,
    private utilsService: UtilsService,
    private firebaseService: FirebaseService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateInvoices() {
    this.logger.log('Update Invoices Cron started');

    this.logger.log('Donwloading csv...');
    const result = await firstValueFrom(
      this.httpService.get(
        'https://api.github.com/gists/f70a484ec20b8ea43c67f95a58597c29',
      ),
    );

    this.logger.log('Parsing csv...');
    const csvData = this.utilsService.csvToJSON(
      result.data.files['invoices.csv'].content,
    );

    const invoices = csvData.map((i) =>
      this.utilsService.invoiceReportParse(i),
    );

    let writeCount = 0;
    let batch = this.firebaseService.initBatch();

    this.logger.log('Batch writes initialized...');
    for (const invoice of invoices) {
      const docRef = this.firebaseService.getDocRef(
        'invoices',
        invoice.invoiceId.toString(),
      );

      writeCount++;
      batch.set(docRef, invoice, { merge: true });

      if (writeCount % 100 === 0) {
        await batch.commit();
        batch = this.firebaseService.initBatch();
      }
    }

    await batch.commit();

    this.logger.log(`Execution succeeded with ${writeCount} writes`);
    return;
  }

  async getAll() {
    const invoices = await this.firebaseService.getCollection<InvoiceEntity>(
      'invoices',
    );
    return invoices.map((i) => new InvoiceResponse(i));
  }

  async getInvoicesWithFilters(
    vendorId: string,
    startDate: string,
    endDate: string,
  ) {
    let query;

    if (vendorId) {
      query = this.firebaseService
        .getCollectionRef('invoices')
        .where('vendorId', '==', Number(vendorId));
    }

    if (startDate) {
      if (!this.utilsService.isValidDate(startDate)) {
        throw new BadRequestException({
          message:
            'Start date format is not valid, please read the documentation about this field',
        });
      }

      const date = new Date(`${startDate}T00:00:00.000z`);

      if (!!query) {
        query = query.where('invoiceDatetime', '>=', date);
      } else {
        query = this.firebaseService
          .getCollectionRef('invoices')
          .where('invoiceDatetime', '>=', date);
      }
    }

    if (endDate) {
      if (!this.utilsService.isValidDate(endDate)) {
        throw new BadRequestException({
          message:
            'End date format is not valid, please read the documentation about this field',
        });
      }

      const date = new Date(`${endDate}T23:59:59.000z`);

      if (!!query) {
        query = query.where('invoiceDatetime', '<=', date);
      } else {
        query = this.firebaseService
          .getCollectionRef('invoices')
          .where('invoiceDatetime', '<=', date);
      }
    }

    const snap = await query.get();

    return snap.docs.map((doc: any) => new InvoiceResponse(doc.data()));
  }
}
