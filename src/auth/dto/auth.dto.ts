import { IsEmail, IsInt } from 'class-validator';

export class AuthDto {
  @IsInt()
  readonly id: number;
  @IsEmail()
  readonly email: string;
}
