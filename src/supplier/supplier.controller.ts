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
import { SupplierService } from './supplier.service';
import { CreateCompanyDto } from './dto/company.dto';
import { Response } from 'express';
import { CreateSellerDto } from './dto/seller.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Get('/company')
  async getCompanies(@Res() res: Response) {
    const companies = await this.supplierService.getCompanies();
    return res.status(HttpStatus.OK).json(companies);
  }

  @Get('/company/:id')
  async getCompany(@Res() res: Response, @Param('id') id: string) {
    const company = await this.supplierService.getCompany(id);
    if (!company) throw new NotFoundException('Company does not exist!');
    return res.status(HttpStatus.OK).json(company);
  }

  @Post('/company/create')
  async createCompany(
    @Res() res: Response,
    @Body() req: CreateCompanyDto,
  ) {
    const newCompany = await this.supplierService.createCompany(req);
    return res.status(HttpStatus.CREATED).json({
      message: 'Company Successfully Created',
      newCompany,
    });
  }

  @Put('/company/update/:id')
  async updataCompany(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() req: CreateCompanyDto,
  ) {
    const updateCompany = await this.supplierService.updateCompany(
      id,
      req,
    );
    if (!updateCompany) throw new NotFoundException('Company does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Company Successfully Updated',
      updateCompany,
    });
  }

  @Delete('/company/delete')
  async deleteCompany(@Res() res: Response, @Query('id') id: string) {
    const deletedCompany = await this.supplierService.deleteCompany(id);
    if (!deletedCompany) throw new NotFoundException('Company does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Company Successfully Deleted',
      deletedCompany,
    });
  }

  @Get('/seller')
  async getVendors(@Res() res: Response) {
    const vendors = await this.supplierService.getVendors();
    return res.status(HttpStatus.OK).json(vendors);
  }

  @Get('/seller/:id')
  async getSeller(@Res() res: Response, @Param('id') id: string) {
    const seller = await this.supplierService.getSeller(id);
    if (!seller) throw new NotFoundException('Seller does not exist!');
    return res.status(HttpStatus.OK).json(seller);
  }

  @Post('/seller/create')
  async createSeller(
    @Res() res: Response,
    @Body() req: CreateSellerDto,
  ) {
    const newSeller = await this.supplierService.createSeller(req);
    return res.status(HttpStatus.CREATED).json({
      message: 'Seller Successfully Created',
      newSeller,
    });
  }

  @Put('/seller/update/:id')
  async updateSeller(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() req: CreateSellerDto,
  ) {
    const updatedSeller = await this.supplierService.updateSeller(
      id,
      req,
    );
    if (!updatedSeller) throw new NotFoundException('Seller does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Company Successfully Updated',
      updatedSeller,
    });
  }

  @Delete('/seller/delete')
  async delete(@Res() res: Response, @Query('id') id: string) {
    const deletedSeller = await this.supplierService.deleteCompany(id);
    if (!deletedSeller) throw new NotFoundException('Seller does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'seller Successfully Deleted',
      deletedSeller,
    });
  }
}
