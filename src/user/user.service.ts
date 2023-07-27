import { Injectable } from '@nestjs/common';
import { database } from 'src/main';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  findAll() {
    return database.users;
  }
  addUser(dto: CreateUserDto) {
    const uuid = randomUUID();
    const user = {
      ...dto,
      id: uuid,
      version: database.users.length,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    database.users.push(user);
  }
}
