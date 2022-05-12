import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';
import { UtilsService } from './shared/utils/utils.service';
import { UtilsModule } from './shared/utils/utils.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './shared/firebase/firebase.module';

@Module({
  imports: [
    ClientModule,
    ScheduleModule.forRoot(),
    InvoiceModule,
    UtilsModule,
    ConfigModule.forRoot(),
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {}
