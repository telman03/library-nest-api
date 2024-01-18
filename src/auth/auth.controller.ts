import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, Response, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Request as ExpressRequest } from 'express';
import { HttpOnlyGuard } from './http-only.guard';
import { UseGuards } from '@nestjs/common';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  async signin(@Request() req, @Response() res, @Body() dto: SignInDto) {
    return this.authService.signIn(dto, req, res);
  }

  @Get('logout')
  async logout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }


  @Get('/profile')
  async getProfile(@Req() req: ExpressRequest) {
    const token = req.cookies.token;

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const user = await this.authService.getMe(token);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }



  @Get('protected')
  @UseGuards(HttpOnlyGuard)
  protectedRoute(@Req() req: any) {
    const token = req.cookies.token;

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const user = this.authService.decodeToken(token);
    const userId = user.id;
    
    return {
      userId
    };
  }

  @Get('unprotected')
  unprotectedRoute() {
    return 'This route is accessible without HTTP-only cookie check';
  }

}
