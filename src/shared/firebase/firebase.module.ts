import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService, ConfigService],
})
export class FirebaseModule {}
