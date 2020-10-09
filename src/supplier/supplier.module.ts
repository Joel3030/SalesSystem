import { Module } from '@nestjs/common';

import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { Company, CompanySchema } from './schema/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from './schema/seller.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Seller.name, schema: SellerSchema },
    ]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
