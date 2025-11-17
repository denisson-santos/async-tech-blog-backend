import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: SignUpAuthDto) {
    return this.authService.signUp(data);
  }

  @Post('login')
  async login(@Body() data: LoginAuthDto, @Res() res: Response) {
    const { user, accessToken } = await this.authService.login(data);

    return res
      .status(201)
      .cookie('accessToken', accessToken, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send(user);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return 'entrou!';
  }
}
