import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schema/company.schema';
import { Model } from 'mongoose';
import { CreateSellerDto } from './dto/seller.dto';
import { SellerDocument, Seller } from './schema/seller.schema';
import { CreateCompanyDto } from './dto/company.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(Seller.name) private supplierModel: Model<SellerDocument>,
  ) {}

  async getCompanies(): Promise<Company[]> {
    const companies = await this.companyModel.find();
    return companies;
  }

  async getCompany(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id);
    return company;
  }

  async createCompany(companyReq: CreateCompanyDto): Promise<Company> {
    const newCompany = new this.companyModel(companyReq);
    return await newCompany.save();
  }

  async updateCompany(
    id: string,
    companyReq: CreateCompanyDto,
  ): Promise<Company> {
    const udatedCompany = await this.companyModel.findByIdAndUpdate(
      id,
      companyReq,
      { new: true },
    );
    return udatedCompany;
  }

  async deleteCompany(id: string): Promise<Company> {
    const deletedCompany = await this.companyModel.findByIdAndDelete(id);
    return deletedCompany;
  }

  async getVendors(): Promise<Seller[]> {
    const vendors = await this.supplierModel.find().populate('company');
    return vendors;
  }

  async getSeller(id: string): Promise<Seller> {
    const seller = await this.supplierModel.findById(id);
    return seller;
  }

  async createSeller(supplierReq: CreateSellerDto): Promise<Seller> {
    const newSeller = new this.supplierModel(supplierReq);
    return await newSeller.save();
  }

  async updateSeller(
    id: string,
    sellerReq: CreateSellerDto,
  ): Promise<Seller> {
    const udatedSupplier = await this.supplierModel.findByIdAndUpdate(
      id,
      sellerReq,
      { new: true },
    );
    return udatedSupplier;
  }

  async deleteSeller(id: string): Promise<Seller> {
    const deletedSeller = await this.supplierModel.findByIdAndDelete(id);
    return deletedSeller;
  }
}
