import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientDTO, ClientModificationDTO } from 'src/dto/client.dto';
import { ClientEntity } from 'src/entities/client.entity';
import { FirebaseService } from 'src/shared/firebase/firebase.service';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  constructor(private firebaseService: FirebaseService) {}

  async create(clientDTO: ClientDTO) {
    const clientInfo = await this.firebaseService.getDocument<ClientEntity>(
      'clients',
      clientDTO.clientId.toString(),
    );

    if (clientInfo) {
      throw new BadRequestException({
        message: 'Client already exist',
      });
    }

    await this.firebaseService
      .setDocument('clients', clientDTO.clientId.toString(), {
        ...clientDTO,
        id: clientDTO.clientId.toString(),
      })
      .catch((error) => {
        this.logger.error('setDocument - clients Error', error);
        throw new InternalServerErrorException({
          message: 'An unexpected error ocurred',
        });
      });

    return {
      message: 'Register completed',
    };
  }

  getAll() {
    return this.firebaseService.getCollection<ClientEntity>('clients');
  }

  async updateClientData(data: ClientModificationDTO) {
    const clientInfo = await this.firebaseService.getDocument<ClientEntity>(
      'clients',
      data.clientId.toString(),
    );

    if (!clientInfo) {
      throw new BadRequestException({
        message: 'Client do not exist',
      });
    }

    await this.firebaseService.setDocument(
      'clients',
      data.clientId.toString(),
      data,
    );

    return {
      message: 'Update completed',
    };
  }
}
