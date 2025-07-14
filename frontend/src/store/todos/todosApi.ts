import { baseApi } from "../shared/baseApi";

type TodoSummary = {
  userId: number;
  total: number;
  completed: number;
  incomplete: number;
  completionPercentage: number;
};

type TodoResponse = {
  data: TodoSummary[];
  meta: {
    total: number;
    completed: number;
    incomplete: number;
    completionRate: number;
  };
};

export const todosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TodoResponse, void>({
      query: () => "/todos/summary",
      providesTags: ["Todos"],
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
