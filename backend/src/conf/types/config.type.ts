import { KeycloakConfig } from '../../modules/auth/config/types/keycloak-config.type';
import { AppConfig } from './app-config.type';

export type AllConfigType = {
  keycloak: KeycloakConfig;
  app: AppConfig;
};
