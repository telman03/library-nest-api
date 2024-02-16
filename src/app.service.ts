import { Injectable } from '@nestjs/common';

// The @Injectable() decorator is used to define a class as a provider.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
