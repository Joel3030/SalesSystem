import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company{
    @Prop({ required: true})
    name: string

    @Prop({ required: true})
    telephone: string

    @Prop(raw({
        address: {type: String, required: true},
        sector: {type: String, required: true},
        municipio: {type: String, required: true},
        zipCode: {type: Number, required: true}
    }))
    location: Record<string, any>
}

export const CompanySchema = SchemaFactory.createForClass(Company);