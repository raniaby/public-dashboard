import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'nest-keycloak-connect';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('callback')
  @Public()
  async callback(@Body() body: { code: string }) {
    return await this.authService.exchangeCodeForTokens(body.code);
  }

  @Post('refresh')
  @Public()
  async refresh(@Body() body: { refresh_token: string }) {
    return await this.authService.refreshToken(body.refresh_token);
  }

  @Post('logout')
  @HttpCode(204)
  async logout(@Body() body: { refresh_token: string }) {
    return await this.authService.logout(body.refresh_token);
  }
}
