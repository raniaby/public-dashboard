import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { environment } from "../../environment";
import {
  clearTokens,
  getTokens,
  setTokens,
  isValidToken,
} from "../../utils/token";

const baseQuery = retry(
  async (args, api, extraOptions) => {
    const { access_token, refresh_token } = getTokens();
    const result = await fetchBaseQuery({
      baseUrl: environment.apiUrl,
      prepareHeaders: (headers) => {
        if (access_token) {
          headers.set("Authorization", `Bearer ${access_token}`);
        }
        return headers;
      },
    })(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      if (refresh_token && isValidToken(refresh_token)) {
        try {
          const refreshResult = await fetchBaseQuery({
            baseUrl: environment.apiUrl,
          })(
            {
              url: "/auth/refresh",
              method: "POST",
              body: { refresh_token },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const data = refreshResult.data as {
              access_token: string;
              refresh_token: string;
            };
            setTokens(data.access_token, data.refresh_token);
            return fetchBaseQuery({
              baseUrl: environment.apiUrl,
              prepareHeaders: (headers) => {
                headers.set("Authorization", `Bearer ${data.access_token}`);
                return headers;
              },
            })(args, api, extraOptions);
          }
        } catch {
          clearTokens();
          window.location.href = "/";
          return result;
        }
      } else {
        clearTokens();
        window.location.href = "/";
      }
    }

    return result;
  },
  {
    maxRetries: 0,
  }
);

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Users", "Posts", "Todos"],
});
