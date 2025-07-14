import { baseApi } from "../shared/baseApi";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface GetUsersParams {
  search?: string;
  sortField?: string;
  sortOrder?: "ascend" | "descend";
  page?: number;
  pageSize?: number;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponse<User>, GetUsersParams>({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
