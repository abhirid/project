import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './auth/config/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[config]
    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (config)=>({
        secret:config.get('jwt.secret')
      }),
      global:true,
      inject:[ConfigService]
    }),
    MongooseModule.forRootAsync(
      {
        imports:[ConfigModule],
        useFactory: async (config)=>({
          uri:config.get("database.connectionString")
        }),
        inject:[ConfigService]
      }
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
