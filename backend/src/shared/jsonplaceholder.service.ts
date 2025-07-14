import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { User, Post, Todo } from './types/jsonplaceholder.types';

@Injectable()
export class JsonPlaceholderService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly httpService: HttpService) {}

  async getUsers(): Promise<User[]> {
    const { data } = await firstValueFrom<AxiosResponse<User[]>>(
      this.httpService.get(`${this.baseUrl}/users`),
    );
    return data;
  }

  async getPosts(): Promise<Post[]> {
    const { data } = await firstValueFrom<AxiosResponse<Post[]>>(
      this.httpService.get(`${this.baseUrl}/posts`),
    );
    return data;
  }

  async getTodos(): Promise<Todo[]> {
    const { data } = await firstValueFrom<AxiosResponse<Todo[]>>(
      this.httpService.get(`${this.baseUrl}/todos`),
    );
    return data;
  }

  async getPostsByUser(userId: number): Promise<Post[]> {
    const { data } = await firstValueFrom<AxiosResponse<Post[]>>(
      this.httpService.get(`${this.baseUrl}/posts?userId=${userId}`),
    );
    return data;
  }

  async getTodosByUser(userId: number): Promise<Todo[]> {
    const { data } = await firstValueFrom<AxiosResponse<Todo[]>>(
      this.httpService.get(`${this.baseUrl}/todos?userId=${userId}`),
    );
    return data;
  }
}
