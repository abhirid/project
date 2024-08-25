import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schems';
import { Info, InfoSchema } from './schemas/info.schema';

@Module({
  imports: [MongooseModule.forFeature([{
   name: User.name,
   schema:UserSchema 
  },
  {
    name: RefreshToken.name,
   schema:RefreshTokenSchema,
  },
  { name: Info.name, schema: InfoSchema }
]
  )],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
