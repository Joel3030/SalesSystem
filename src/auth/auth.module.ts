import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Configuration } from 'src/config/configuration.keys';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [UserModule, PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(Configuration.JWT_SERCRET),
        signOptions: {expiresIn: '10000s'}
      })
    })
],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
