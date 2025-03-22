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

  // Create
  @Post('user')
  createUser(@Request() req) {
    return this.svcUser.createUser(
      req.body as Partial<User>,
    );
  }

  // Read
  @Get('user/:id')
  async getUser(@Param('id') id) {
    // TODO - when DB uses UUID this will go away
    const ID = Math.floor(Number(id)) ?? null;
    if (!ID)
      throw new HttpException('ID was not a number', 500);

    const user = await this.svcUser.findOneByID(
      ID.toString(),
    );
    if (!user)
      throw new HttpException('User not found', 500);

    return user;
  }

  // Update
  @Put('user/:id')
  async updateUser(@Request() req, @Param('id') id) {
    if (!id)
      throw new HttpException('ID was not provided', 500);
    if (!req?.body)
      throw new HttpException(
        'Body was not defined in request',
        500,
      );
    if (!req?.body?.user)
      throw new HttpException(
        'User was not defined in body',
        500,
      );

    return await this.svcUser.updateUser(req.body.user);
  }

  // Delete
  @Delete('user/:id')
  async deleteUser(@Request() req, @Param('id') id: number) {

    if (!id)
      throw new HttpException('ID was not provided', 400);
    if (!('user' in req?.body))
      throw new HttpException(
        'User was not part of request',
        400,
      );
    if (!('id' in req?.body?.user))
      throw new HttpException(
        'ID was not part of user object',
        400,
      );

      const user = req?.body?.user;

    return await this.svcUser.deleteUser(
      user,
      user?.id
    );
  }

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
