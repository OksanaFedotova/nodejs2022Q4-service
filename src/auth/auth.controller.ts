import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.singup(dto);
  }

  @UseGuards(AuthGuard)
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.singup(dto);
  }
}
