import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  createUser() {
    return {
      username: 'Joe',
      password: 'password'
    }
  }
}
