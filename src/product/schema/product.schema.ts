import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as s } from 'mongoose';
import { Seller } from 'src/supplier/schema/seller.schema';
import { Category } from './category.schema';
import { Inventory } from './inventory.schema';


export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({required: true})
  descrition: string;

  @Prop({
    type: s.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category;

  @Prop({
    type: s.Types.ObjectId,
    ref: Inventory.name,
  })
  inventory: Inventory;

  @Prop({
    type: s.Types.ObjectId,
    ref: Seller.name,
    required: true,
  })
  supplier: Seller;

  @Prop()
  imgPath: string;

  @Prop({required: true})
  status: boolean;

  @Prop({required: true})
  service: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
