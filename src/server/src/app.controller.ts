import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('/api/v1/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //
  // CRUD routes for User
  //

  @Post('user')
  createUser() {
    return this.appService.createUser();
  }
}
