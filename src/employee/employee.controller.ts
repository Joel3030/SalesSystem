import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Response } from 'express';
import { CreateEmployeeDto } from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getEmployees(@Res() res: Response) {
    const employees = await this.employeeService.getEmployees();
    return res.status(HttpStatus.OK).json(employees);
  }

  @Get('/:id')
  async getemployee(@Param('id') id: string, @Res() res: Response) {
    const employee = await this.employeeService.getEmployee(id);
    if (!employee) throw new NotFoundException('Employee does not exist!');
    return res.status(HttpStatus.OK).json(employee);
  }

  @Post('/create')
  async createEmployee(
    @Body() employeeReq: CreateEmployeeDto,
    @Res() res: Response,
  ) {
    const employee = await this.employeeService.createEmployee(employeeReq);
    return res.status(HttpStatus.CREATED).json({
      message: 'employee Successfully Created',
      employee,
    });
  }

  @Put('/update/:id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() employeeReq: CreateEmployeeDto,
    @Res() res: Response,
  ) {
    const employee = await this.employeeService.updateEmployee(
      id,
      employeeReq,
    );
    if (!employee) throw new NotFoundException('Employee does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Employee Successfully updated',
      employee,
    });
  }

  @Delete('/delete')
  async deleteEmployee(@Res() res: Response, @Query('id') id: string) {
    const employee = await this.employeeService.deleteEmployee(id);
    if (!employee) throw new NotFoundException('Employee does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Employee Successfully deleted',
      employee,
    });
  }
}
