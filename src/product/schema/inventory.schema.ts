import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as s } from 'mongoose';

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {
  @Prop()
  existence: number;
  @Prop()
  price: number;
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
  @Prop()
  expiration: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
