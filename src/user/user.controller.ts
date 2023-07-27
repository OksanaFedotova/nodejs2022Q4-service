import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userSevice: UserService) {}
  @Get()
  findAll() {
    return this.userSevice.findAll();
  }
  @Post()
  addUser(@Body() dto: CreateUserDto) {
    //const user: CreateUserDto = dto;
    return this.userSevice.addUser(dto);
  }
}
