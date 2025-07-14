import { Injectable } from '@nestjs/common';
import { KeycloakService } from './keycloak/keycloak.service';

@Injectable()
export class AuthService {
  constructor(private readonly keycloakService: KeycloakService) {}

  async exchangeCodeForTokens(code: string) {
    return this.keycloakService.exchangeCodeForTokens(code);
  }

  async refreshToken(refreshToken: string) {
    return this.keycloakService.refreshToken(refreshToken);
  }

  async logout(refreshToken: string) {
    return this.keycloakService.logout(refreshToken);
  }
}
