import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as s } from 'mongoose';
import { Company } from './company.schema';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop(
    raw({
      address: { type: String, required: true },
      sector: { type: String, required: true },
      municipio: { type: String, required: true },
      zipCode: { type: Number, required: true },
    }),
  )
  location: Record<string, any>;

  @Prop({
    type: s.Types.ObjectId,
    ref: Company.name,
    required: true,
  })
  company: Company;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
