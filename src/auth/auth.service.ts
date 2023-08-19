import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
    private jwtService: JwtService,
  ) {}
  async singup(dto: AuthDto) {
    const { login, password } = dto;
    const hash = await argon.hash(password);
    try {
      const user = await this.user.addUser({ login, password: hash });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
      throw error;
    }
  }

  async login({ login, password }: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });
    if (!user) throw new ForbiddenException('login is incorrect');
    const pwMatches = argon.verify(user.password, password);
    if (!pwMatches) throw new ForbiddenException('password is incorrect');
    delete user.password;
    const payload = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
