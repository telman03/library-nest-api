import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),JwtModule, PassportModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
