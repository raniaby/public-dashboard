import { registerAs } from '@nestjs/config';
import { KeycloakConfig } from './types/keycloak-config.type';
import { validateConfig } from '../../../utils/validateConfig';
import { IsString, IsNotEmpty } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  KEYCLOAK_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_REDIRECT_URI: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_ADMIN: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_ADMIN_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_AUTH_SERVER_URL: string;
}

export default registerAs('keycloak', (): KeycloakConfig => {
  const validatedConfig = validateConfig(process.env, EnvironmentVariables);

  return {
    clientId: validatedConfig.KEYCLOAK_CLIENT_ID,
    clientSecret: validatedConfig.KEYCLOAK_CLIENT_SECRET,
    redirectUri: validatedConfig.KEYCLOAK_REDIRECT_URI,
    tokenUrl: `${validatedConfig.KEYCLOAK_AUTH_SERVER_URL}/realms/master/protocol/openid-connect/token`,
    logoutUrl: `${validatedConfig.KEYCLOAK_AUTH_SERVER_URL}/realms/master/protocol/openid-connect/logout`,
    admin: validatedConfig.KEYCLOAK_ADMIN,
    adminPassword: validatedConfig.KEYCLOAK_ADMIN_PASSWORD,
  };
});
