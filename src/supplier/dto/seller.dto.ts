import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../schema/company.schema';


export class CreateSellerDto { 
    
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly phone: string;
    @ApiProperty()
    readonly location: {
        address: string;
        sector: string;
        municipio: string;
        zipCode: number;
    };

    @ApiProperty()
    readonly company: Company;
}