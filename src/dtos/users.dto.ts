import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  @IsOptional()
  public fullname: string;
}

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
