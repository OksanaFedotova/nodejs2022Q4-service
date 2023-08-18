import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
  ) {}
  async singup({ login, password }: AuthDto) {
    const hash = await argon.hash(password);
    await this.user.addUser({ login, password: hash });
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
    return user;
  }
}
