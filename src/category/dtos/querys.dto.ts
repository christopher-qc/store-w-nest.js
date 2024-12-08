import { IsOptional, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class Querys {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  limit?: number;
}
