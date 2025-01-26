import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';


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

  // Create
  @Post('user')
  createUser() {
    return this.appService.createUser();
  }

  // Read
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login (@Request() req) {
    return req.user;
  }
}
