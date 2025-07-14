import { IsOptional, IsString } from 'class-validator';
import { PaginatedSortableDto } from '../../../shared/dto/pagination.dto';

export class GetUsersDto extends PaginatedSortableDto {
  @IsOptional()
  @IsString()
  search?: string;
}
