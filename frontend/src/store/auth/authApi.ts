import { baseApi } from "../shared/baseApi";
import { environment } from "../../environment";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  scope: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginWithCode: builder.mutation<TokenResponse, { code: string }>({
      query: ({ code }) => ({
        url: "/auth/callback",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { code },
      }),
    }),
    logout: builder.mutation<void, { refresh_token: string }>({
      query: ({ refresh_token }) => ({
        url: "/auth/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { refresh_token },
      }),
    }),
  }),
});

export const { useLoginWithCodeMutation, useLogoutMutation } = authApi;

// export const getKeycloakLoginUrl = () => {
//   const params = new URLSearchParams({
//     client_id: environment.keycloakClientId,
//     redirect_uri: environment.keycloakRedirectUri,
//     response_type: "code",
//     scope: "openid",
//   });

//   return `${environment.keycloakAuthUrl}?${params.toString()}`;
// };
