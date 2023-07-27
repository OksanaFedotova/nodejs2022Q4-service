import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post()
  addUser(@Body() dto: CreateUserDto) {
    return this.userService.addUser(dto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    return user;
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @Put(':id')
  updateUserPassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(id, dto);
  }
}
