import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  HttpStatus, NotFoundException
} from '@nestjs/common';
import { Response } from 'express';
import { CreateClientDto } from './dto/client.dto';
import { ClientService } from './client.service';


@Controller('/client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async getClients(@Res() res: Response) {
    const clients = await this.clientService.getClients();
    return res.status(HttpStatus.OK).json(clients);
  }

  @Get('/:id')
  async getClient(@Param('id') id: string, @Res() res: Response) {
    const client = await this.clientService.getClient(id);
    if(!client) throw new NotFoundException('Client does not exist!');
    return res.status(HttpStatus.OK).json(client);
  }

  @Post('/create')
  async createClient(@Body() req: CreateClientDto, @Res() res: Response) {
    const newClient = await this.clientService.createClient(req);
    return res.status(HttpStatus.CREATED).json({
        message: 'Client Successfully Created',
        newClient,
      });
  }

  @Put('/update/:id')
  async uptadeClient(
    @Param('id') id: string,
    @Body() req: CreateClientDto,
    @Res() res: Response
  ){
    const updatedClient = await this.clientService.updateClient(id, req);
    if(!updatedClient) throw new NotFoundException('Client does not exist!');
    return res.status(HttpStatus.OK).json({
        message: 'Client Successfully Updated',
        updatedClient,
    })
  }

  @Delete('/delete')
 async deleteClient(@Query('id') id, @Res() res: Response) {
    const deletedClient = await this.clientService.deleteClient(id);
    if(!deletedClient) throw new NotFoundException('Client does not exist!');
    return res.status(HttpStatus.OK).json({
        message: 'Client Successfully Deleted',
        deletedClient
    })
  }
}
