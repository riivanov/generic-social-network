import { User } from '@lib/entity/User';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';

@Controller('/api/v1/')
export class AppController {
  constructor(
    private readonly svcApp: AppService,
    private svcAuth: AuthService,
    private svcUser: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.svcApp.getHello();
  }

  //
  // CRUD routes for User
  //





  //
  // TODO() - move to AuthController.ts
  //
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.svcAuth.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
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
