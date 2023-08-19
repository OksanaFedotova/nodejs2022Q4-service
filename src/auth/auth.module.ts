import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
//import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

const { JWT_SECRET_KEY, TOKEN_EXPIRE_TIME } = process.env;

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    //JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: TOKEN_EXPIRE_TIME },
    }),
  ],
})
export class AuthModule {}
