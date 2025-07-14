import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  @Max(100)
  @IsOptional()
  pageSize: number = 10;
}

export class SortableDto {
  @IsOptional()
  sortField?: string;

  @IsOptional()
  sortOrder?: 'ascend' | 'descend';
}

export enum SortOrderEnum {
  ASCEND = 'ascend',
  DESCEND = 'descend',
}

export class PaginatedSortableDto extends PaginationDto {
  @IsOptional()
  sortField?: string;

  @IsOptional()
  @IsEnum(SortOrderEnum)
  sortOrder?: 'ascend' | 'descend';
}
