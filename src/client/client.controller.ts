import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ClientDTO, ClientModificationDTO } from 'src/dto/client.dto';
import { ClientService } from './client.service';

@Controller('api/client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('register')
  Register(@Body() client: ClientDTO) {
    return this.clientService.create(client);
  }

  @Get('all')
  GetAll() {
    return this.clientService.getAll();
  }

  @Put('modify')
  Modify(@Body() clientData: ClientModificationDTO) {
    return this.clientService.updateClientData(clientData);
  }
}
