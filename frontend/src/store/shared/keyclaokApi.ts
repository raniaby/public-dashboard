import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "../../environment";

export const keycloakApi = createApi({
  reducerPath: "keycloakApi",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.keycloakAuthServerUrl,
  }),
  endpoints: () => ({}),
});
