import { Employee } from '../../employee/schema/employee.schema';
export class CreateUserDto {
  nameuser: string;

  password: string;

  employee: Employee;

  status: boolean;
}
