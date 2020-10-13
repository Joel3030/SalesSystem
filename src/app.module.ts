import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// mongodb
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/configuration.keys';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get(Configuration.MONGODB_URI),
      }),
      inject: [ConfigService],
    }),
    ClientModule,
    EmployeeModule,
    ProductModule,
    SupplierModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: string | number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get(Configuration.PORT);
  }
}
