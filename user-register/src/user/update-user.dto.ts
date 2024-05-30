import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly email: number;

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  readonly mobileNo: number;
  readonly address: string;
}
