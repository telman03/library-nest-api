import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,  } from '@nestjs/common';

import { Request } from 'express';
import { Types } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // The JWT token will be extracted from the cookie
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJWT(req: Request): string | null {
    // Check if the cookie is present
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: { id: Types.ObjectId; email: string, firstName: string, lastName: string,role: string }) {
    return payload;
  }
}