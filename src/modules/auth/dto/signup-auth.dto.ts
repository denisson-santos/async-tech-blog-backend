import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpAuthDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  avatarUrl: string;
  bannerUrl: string;
  bio: string;
}
