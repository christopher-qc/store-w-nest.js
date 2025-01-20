import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsPositive,
  IsDate,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

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

  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
