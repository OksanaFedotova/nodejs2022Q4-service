import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { msg: 'you are sign in' };
  }
  signup() {
    return { msg: 'you are sign up' };
  }
}
