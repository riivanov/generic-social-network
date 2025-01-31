import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';
import { User } from '@lib/entity/User';

@Controller('/api/v1/')
export class AppController {
  constructor(
    private readonly svcApp: AppService,
    private svcAuth: AuthService,
    private svcUser: UsersService
  ) {}

  @Get()
  getHello(): string {
    return this.svcApp.getHello();
  }

  //
  // CRUD routes for User
  //

  // Create
  @Post('user')
  createUser(@Request() req: Req) {
    return this.svcUser.createUser(req.body as Partial<User>);
  }

  // Read
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.svcAuth.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req: Req) {
    // return req.logOut((err) => {
    //   if (err) {
    //     throw err
    //   }
    // })
  }
}
