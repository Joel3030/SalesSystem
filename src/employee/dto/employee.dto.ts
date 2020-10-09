import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto{    
	@ApiProperty()
	fullName: {
	  readonly name: string;
	  readonly lastName: string;
	};
  
	@ApiProperty()
	readonly idCard: string;
  
	@ApiProperty()
	contacts: {
	  readonly telephone: string;
	  readonly phone: string;
	  readonly email: string;
	};  
  
	@ApiProperty()
	readonly location: {
	  address: string;
	  sector: string;
	  municipio: string;
	  zipCode: number;
	};
  
	@ApiProperty()
	readonly status: boolean;

	@ApiProperty()
	readonly user: any; // Document User
}