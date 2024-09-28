import { Controller, Get, UseGuards, Req, Post, Body, Res, Request, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const data = this.authService.googleLogin(req);
    return res.redirect(`/token/${data.refreshToken}`);
  }

  @Post('signin')
  async credentialsAuth(@Body() user: { email: string; password: string }) {
    return this.authService.signIn(user.email, user.password);
  }

  @Post('signup')
  async newCredentialsAuth(@Body() user: { email: string; password: string, name: string }) {
    const data = await this.authService.signUp(user.email, user.name, user.password);
    if (data?.message) {
      throw new BadRequestException(data?.message)
    }
    return data
  }

  @UseGuards(JwtAuthGuard)
  @Get('refreshToken')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.token);
  }

  @Get('token/:token')
  async getToken(@Param('token') token: string) {
    const data = await this.authService.refreshToken(token);
    return data
  }
}
