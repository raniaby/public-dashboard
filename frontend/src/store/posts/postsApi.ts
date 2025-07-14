import { baseApi } from "../shared/baseApi";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsByUser {
  userId: number;
  posts: Post[];
}

export interface PostSummary {
  userId: number;
  userName: string;
  shortName: string;
  postsCount: number;
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[] | PostsByUser[], { groupByUser?: boolean }>({
      query: ({ groupByUser }) => ({
        url: "/posts",
        params: { groupByUser },
      }),
      providesTags: ["Posts"],
    }),
    getDashboardSummary: builder.query<PostSummary[], void>({
      query: () => "/posts/summary",
    }),
  }),
});

export const { useGetPostsQuery, useGetDashboardSummaryQuery } = postsApi;
