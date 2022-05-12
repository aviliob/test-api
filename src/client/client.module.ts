import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/shared/firebase/firebase.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, FirebaseService],
})
export class ClientModule {}
