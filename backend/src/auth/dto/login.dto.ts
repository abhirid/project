import { IsEmail, IsNotEmpty, Length,IsString} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
@IsNotEmpty()
  password: string;
}
