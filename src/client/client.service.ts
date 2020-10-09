import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {CreateClientDto } from './dto/client.dto';
import { Client, ClientDocument } from './schema/client.schema';



@Injectable()
export class ClientService {

    constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) {}

    async getClients(): Promise<Client[]>{
        const clients = await this.clientModel.find();
        return clients;
    }

    async getClient(id: string): Promise<Client>{
        const client = await this.clientModel.findById(id);
        return client;
    }

    async createClient(req: CreateClientDto): Promise<Client>{
        const newClient = new this.clientModel(req);
        return await newClient.save();
        
    }

    async updateClient(id: string, req: CreateClientDto) : Promise<Client>{
        const updatedClient = await this.clientModel.findByIdAndUpdate(id, req, {new: true})
        return updatedClient;        
    }

    async deleteClient(id: string): Promise<Client>{
        const deletedClient = await this.clientModel.findByIdAndDelete(id);
        return deletedClient;
    }
}
