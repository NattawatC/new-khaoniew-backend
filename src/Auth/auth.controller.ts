import { Controller } from '@nestjs/common';
import { Get, Post, Body, Param } from '@nestjs/common';
import { UserLoginDto } from './dto/UserLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
      ) {}

  @Post()
  async login(@Body() UserLoginDto: UserLoginDto) {
    return await this.authService.authenticateUser(UserLoginDto);
  }
}
