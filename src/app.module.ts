import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// mongodb
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client/client.controller';
import { ClientModule } from './client/client.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ssdb'),   
    ClientModule,
    EmployeeModule,
    ProductModule,
    SupplierModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
