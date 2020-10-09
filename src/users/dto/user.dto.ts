import { Employee } from '../../employee/schema/employee.schema';
export class CreateUserDto{
    userName: string;
    password: string;
    employee: Employee;
    status: boolean;
}