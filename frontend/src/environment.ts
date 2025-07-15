export const environment = {
  production: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL || "https://api.raniabys.me/api",
  keycloakClientSecret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
  keycloakClientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  keycloakRedirectUri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URI,
  keycloakGrantType: import.meta.env.VITE_KEYCLOAK_GRANT_TYPE,
  keycloakBaseUrl: import.meta.env.VITE_KEYCLOAK_BASE_URL,
  keycloakAuthUrl: `${
    import.meta.env.VITE_KEYCLOAK_BASE_URL
  }/realms/master/protocol/openid-connect/auth`,
  keycloakLogoutUrl: `${
    import.meta.env.VITE_KEYCLOAK_BASE_URL
  }/realms/master/protocol/openid-connect/logout`,
  keycloakAuthServerUrl: `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect`,
} as const;
