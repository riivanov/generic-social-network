import { User } from '@lib/entity/User';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/v1/user/')
export class UserController {
  constructor(private readonly svcUser: UsersService) {}

  //
  // CRUD routes for User
  //

  // Create
  @Post()
  createUser(@Body() user: User) {
    if (!('username' in user))
      throw new HttpException('Username not provided', 400);
    if (!('password' in user))
      throw new HttpException('Password not provided', 400);
    if (!('email' in user)) throw new HttpException('Email not provided', 400);

    return this.svcUser.createUser(user);
  }

  // Read
  @Get(':id')
  async getUser(@Param('id') id) {
    // TODO - when DB uses UUID this will go away
    const ID = Math.floor(Number(id)) ?? null;
    if (!ID) throw new HttpException('ID was not a number', 500);

    const user = await this.svcUser.findOneByID(ID.toString());
    if (!user) throw new HttpException('User not found', 500);

    return user;
  }

  // Update
  @Put('user/:id')
  async updateUser(@Request() req, @Param('id') id) {
    if (!id) throw new HttpException('ID was not provided', 500);
    if (!req?.body)
      throw new HttpException('Body was not defined in request', 500);
    if (!req?.body?.user)
      throw new HttpException('User was not defined in body', 500);

    return await this.svcUser.updateUser(req.body.user);
  }

  // Delete
  @Delete(':id')
  async deleteUser(@Request() req, @Param('id') id: number) {
    if (!id) throw new HttpException('ID was not provided', 400);
    if (!('user' in req?.body))
      throw new HttpException('User was not part of request', 400);
    if (!('id' in req?.body?.user))
      throw new HttpException('ID was not part of user object', 400);

    const user = req?.body?.user;

    return await this.svcUser.deleteUser(user, user?.id);
  }
}
