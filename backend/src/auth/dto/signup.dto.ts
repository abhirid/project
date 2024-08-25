import { IsString, IsEmail,IsIn, Length } from 'class-validator';
export class SignupDto {
  @IsString()
  @Length(1, 50, { message: 'Name is required and should not exceed 50 characters' })
  name: string;

  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsString()
  @Length(6, 100, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @Length(0, 200, { message: 'Address should not exceed 200 characters' })
  address: string;

  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  gender: 'male' | 'female';
}
