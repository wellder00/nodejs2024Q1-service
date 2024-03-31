import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConfigFactory } from './jwtConfigFactory/jwtConfigFactory';
import { SessionJwtStrategy } from './security/sessionJwtStrategy';
import { UserLoginStrategy } from './security/userLoginStrategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfigFactory,
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserLoginStrategy, SessionJwtStrategy],
})
export class AuthModule {}
