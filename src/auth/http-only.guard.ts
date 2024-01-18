// http-only.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    if (request.cookies && 'token' in request.cookies && request.cookies.token.length > 0) {
      // The cookie is present
      return true;
    }

    // The cookie is not present, deny access
    return false;
  }
}