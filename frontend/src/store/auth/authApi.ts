import { environment } from "../../environment";
import { keycloakApi } from "../shared/keyclaokApi";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  scope: string;
}



export const authApi = keycloakApi.injectEndpoints({
  endpoints: (builder) => ({
    loginWithCode: builder.mutation<TokenResponse, { code: string }>({
      query: ({ code }) => {
        const formData = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: environment.keycloakClientId,
          client_secret: environment.keycloakClientSecret,
          code,
          redirect_uri: environment.keycloakRedirectUri,
        });
        return {
          url: "/token",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        };
      },
    }),
    logout: builder.mutation<void, { refresh_token: string }>({
      query: ({ refresh_token }) => {
      const formData = new URLSearchParams({
          client_id: environment.keycloakClientId,
          client_secret: environment.keycloakClientSecret,
          refresh_token,
        });

      return {
        url: "/logout",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
    }

      },
    }),
  }),
});

export const { useLoginWithCodeMutation, useLogoutMutation } = authApi;

export const getKeycloakLoginUrl = () => {
  const params = new URLSearchParams({
    client_id: environment.keycloakClientId,
    redirect_uri: environment.keycloakRedirectUri,
    response_type: "code",
    scope: "openid",
  });

  return `${environment.keycloakAuthUrl}?${params.toString()}`;
};
