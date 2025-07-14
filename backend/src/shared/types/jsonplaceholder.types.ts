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

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PostsByUser {
  userId: number;
  posts: Post[];
}

export interface TodoSummary {
  userId: number;
  total: number;
  completed: number;
  incomplete: number;
  completionPercentage: number;
}

export interface PostSummary {
  userId: number;
  userName: string;
  shortName: string;
  postsCount: number;
}
