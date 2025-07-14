import { Injectable } from '@nestjs/common';
import { JsonPlaceholderService } from '../../shared/jsonplaceholder.service';
import {
  PaginatedResponse,
  User,
} from '../../shared/types/jsonplaceholder.types';
import { GetUsersDto } from './dto/query.dto';
import { SortOrderEnum } from '../../shared/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jsonPlaceholderService: JsonPlaceholderService,
  ) {}

  async getUsers(query: GetUsersDto): Promise<PaginatedResponse<User>> {
    const allUsers = await this.jsonPlaceholderService.getUsers();

    const filteredUsers = this.applySearch(allUsers, query.search);

    const sortedUsers = this.applySorting(
      filteredUsers,
      query.sortField,
      query.sortOrder as SortOrderEnum,
    );

    const paginatedData = this.applyPagination(
      sortedUsers,
      query.page,
      query.pageSize,
    );

    return {
      data: paginatedData,
      total: sortedUsers.length,
      page: query.page,
      pageSize: query.pageSize,
    };
  }

  private applySearch(users: User[], search?: string): User[] {
    if (!search) {
      return users;
    }

    const searchLower = search.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.website.toLowerCase().includes(searchLower) ||
        user.company.name.toLowerCase().includes(searchLower),
    );
  }

  private applySorting(
    users: User[],
    sortField?: string,
    sortOrder?: SortOrderEnum,
  ): User[] {
    if (!sortField || !sortOrder) {
      return users;
    }

    return [...users].sort((a, b) => {
      let aValue = this.getNestedValue(a, sortField);
      let bValue = this.getNestedValue(b, sortField);

      // Handle undefined values
      aValue = aValue ?? '';
      bValue = bValue ?? '';

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortOrder === SortOrderEnum.ASCEND ? comparison : -comparison;
    });
  }

  private applyPagination(
    users: User[],
    page: number,
    pageSize: number,
  ): User[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return users.slice(startIndex, endIndex);
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
}
