import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schems';
import { v4 as uuidv4 } from 'uuid';
import { Info } from './schemas/info.schema';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,
  @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>,
  @InjectModel(Info.name) private readonly infoModel: Model<Info>,
  private jwtService: JwtService
){}
async findAll(): Promise<Info[]> {
  try {
    return await this.infoModel.find().exec();
  } catch (error) {
    // Handle or log the error as needed
    throw new Error('Error retrieving data');
  }
}

  async signup(signupData: SignupDto){
    const { name,email, password, gender, address } = signupData;
    const emailInUse = await this.UserModel.findOne({
      email
    });
    if(emailInUse){
      throw new BadRequestException('Email already in use')
    }
    const hashPassword= await bcrypt.hash(password,10);
    const newUser= await this.UserModel.create({
      name,
      email,
      password: hashPassword,
      gender,
      address,
    })
    return newUser.save();
  }
  async login(credential:LoginDto){
    const{email,password}=credential;
    const user=await this.UserModel.findOne({email});
    if(!user){
      throw new UnauthorizedException('Wrong credentials')
    }
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(!passwordMatch){
throw new UnauthorizedException("Wrong credentials");
    }
    const tokens= await this.generateUserTokens(user._id);
    return{
      ...tokens,
      userId:user._id,
      name:user.name
    }
  }


  async refreshTokens(refreshToken:string){
      const token = await this.RefreshTokenModel.findOne({
        token:refreshToken,
        expiryDate:{
          $gte:new Date()
        }
      });
      if(!token){
        throw new UnauthorizedException("Refresh Token is invalid");
      }
      return this.generateUserTokens(token.userId);
  }
  async generateUserTokens(userId){
    const accesstoken=this.jwtService.sign({userId},{expiresIn:'1h'});
    const refreshToken= uuidv4();
    
    await this.storeRefreshToken(refreshToken,userId,accessToken)
    return{
      accessToken,
      refreshToken
    }
  }
 
  async storeRefreshToken(token: string,userId,accessToken){
    const expiryDate=new Date();
    expiryDate.setDate(expiryDate.getDate()+3);
    // await this.RefreshTokenModel.create({
    //   token,userId,expiryDate
    // });
    await this.RefreshTokenModel.updateOne({
      token,userId,accesstoken
    },
  {set:{expiryDate}},
{upsert:true})
  }
    
}
