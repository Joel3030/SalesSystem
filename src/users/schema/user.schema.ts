import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as s } from 'mongoose';
import { Employee } from '../../employee/schema/employee.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop({
      type: s.Types.ObjectId,
      ref: Employee.name,
      required: true
  })
  employee:Employee;

  @Prop()
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
