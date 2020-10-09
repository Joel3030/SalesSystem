import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';


@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema }])],
  providers: [UsersService, AuthService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
