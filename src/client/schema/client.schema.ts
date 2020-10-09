import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop(
    raw({
      name: { type: String, required: true },
      lastName: { type: String, required: true },
    }), 
  )
  fullName: Record<string, any>;

  @Prop()
  idCard: string;

  @Prop(
    raw({
      telephone: { type: String },
      phone: { type: String },
      email: { type: String },
    }),
  )
  contacts: Record<string, any>;

  @Prop(
    raw({
      address: { type: String },
      sector: { type: String },
      municipio: { type: String },
      zipCode: { type: Number },
    }),
  )
  location: Record<string, any>;

  @Prop()
  status: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
