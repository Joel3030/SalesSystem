import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto{
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly telephone: string;

    @ApiProperty()
    readonly location: {
        address: string;
        sector: string;
        municipio: string;
        zipCode: number;
    }

}