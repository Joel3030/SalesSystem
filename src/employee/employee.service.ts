import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schema/employee.schema';
import { CreateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async getEmployees(): Promise<Employee[]> {
    const employees = await this.employeeModel.find();
    return employees;
  }

  async getEmployee(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);
    return employee;
  }

  async createEmployee(employeeReq: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(employeeReq);
    return newEmployee.save();
  }

  async updateEmployee(
    id: string,
    employeeReq: CreateEmployeeDto,
  ): Promise<Employee> {
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
      id,
      employeeReq,
      { new: true },
    );
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<Employee> {
    const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);
    return deletedEmployee;
  }
}
