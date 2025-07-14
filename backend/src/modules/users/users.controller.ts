import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  PaginatedResponse,
  User,
} from '../../shared/types/jsonplaceholder.types';
import { GetUsersDto } from './dto/query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query() query: GetUsersDto,
  ): Promise<PaginatedResponse<User>> {
    return this.usersService.getUsers(query);
  }
}
