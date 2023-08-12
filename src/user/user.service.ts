import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { checkItem } from '../utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.user.findMany({});
    const res = users.map((user) => {
      delete user.password;
      return user;
    });
    return res;
  }
  async addUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        version: 1,
      },
    });
    delete user.password;
    return user;
  }

  async findOne(id) {
    return await checkItem(id, this.prisma);
  }
  async deleteUser(id) {
    await checkItem(id, this.prisma);
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async updatePassword(id, dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const user = await checkItem(id, this.prisma);
    if (user.password !== oldPassword) {
      throw new ForbiddenException();
    } else {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = new Date().getTime();
      const res = { ...user };
      delete res.password;
      return res;
    }
  }
}
