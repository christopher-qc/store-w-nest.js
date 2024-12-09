import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsPositive,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsString()
  readonly fullname: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly age: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
