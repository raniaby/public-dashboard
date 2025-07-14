import { Module } from '@nestjs/common';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { KeycloakService } from './keycloak/keycloak.service';

export const keycloakConfig = {
  authServerUrl: process.env['KEYCLOAK_AUTH_SERVER_URL'],
  realm: process.env.KEYCLOAK_REALM_NAME,
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  secret: process.env.KEYCLOAK_CLIENT_SECRET,
  authPublicKey: process.env.KEYCLOAK_AUTH_PUBLIC_KEY,
};

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: keycloakConfig.authServerUrl,
      realm: keycloakConfig.realm,
      clientId: keycloakConfig.clientId,
      secret: keycloakConfig.secret || '',
      realmPublicKey: keycloakConfig.authPublicKey,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.OFFLINE,
      bearerOnly: true,
      useNestLogger: true,
      cookieKey: 'KEYCLOAK_JWT',
    }),
    ConfigModule,
    HttpModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AuthService,
    KeycloakService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
