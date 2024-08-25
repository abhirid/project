import { Body, Controller, Get,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Info } from './schemas/info.schema';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
  @Post('login')
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
  @Post('refresh')
  async refreshtoken(@Body() refreshtokenDto:RefreshTokenDto){
    return this.authService.refreshTokens(refreshtokenDto.refreshToken)
  }
 
  @Get('info')
  async findAll(): Promise<Info[]> {
    return this.authService.findAll();
  }
  }


