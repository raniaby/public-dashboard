export type AccessTokenPayload = {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string; // this is the user id
  typ: 'Bearer';
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };

  scope: string;
  sid: string;
  email_verified: boolean;
  preferred_username: string;
};

export type ValidatedTokenPayload = AccessTokenPayload & {
  email: string;
  client_id: string;
  username: string;
  token_type: string;
  active: boolean;
};
