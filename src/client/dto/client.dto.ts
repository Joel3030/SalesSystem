export class CreateClientDto {
  fullName: {
    readonly name: string;
    readonly lastName: string;
  };
  readonly idCard?: string;
  contacts: {
    readonly telephone: string;
    readonly phone: string;
    readonly email: string;
  };
  readonly location?: {
    address: string;
    sector: string;
    municipio: string;
    zipCode: number;
  };
  readonly status: boolean;
}
