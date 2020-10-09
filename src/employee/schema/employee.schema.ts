import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as s } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop(
    raw({
      name: { type: String, required: true },
      lastName: { type: String, required: true },
    }),
  )
  fullName: Record<string, any>;

  @Prop({ required: true })
  idCard: String;

  @Prop(
    raw({
      telephone: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    }),
  )
  contacts: Record<string, any>;

  @Prop(
    raw({
      address: { type: String, required: true },
      sector: { type: String, required: true },
      municipio: { type: String, required: true },
      zipCode: { type: Number, required: true },
    }),
  )
  location: Record<string, any>;

  @Prop({ required: true })
  status: boolean;

  @Prop({
    type: s.Types.ObjectId,
    ref: 'User', // User.name    
  })
  user: any; // User

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
