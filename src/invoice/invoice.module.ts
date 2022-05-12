import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/shared/firebase/firebase.service';
import { UtilsService } from 'src/shared/utils/utils.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, UtilsService, FirebaseService],
  imports: [HttpModule],
})
export class InvoiceModule {}
