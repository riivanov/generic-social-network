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
  UseGuards,
  Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { validate } from 'uuid';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/api/v1/user/')
export class UserController {
  constructor(private readonly svcUser: UsersService) {}

  //
  // CRUD routes for User
  //

  // Create
  @Post()
  async createUser(@Body() user: User) {
    if (!('password' in user))
      throw new HttpException('Password not provided', 400);
    if (!('email' in user)) throw new HttpException('Email not provided', 400);

    const created  = await this.svcUser.createUser(user);
    delete created.password
    return created;
  }

  // Read
  @Get(':id')
  async getUser(@Param('id') id) {
    if (!validate(id)) throw new HttpException('ID was not a UUID', 500);

    const user = await this.svcUser.findOneByID(id);
    if (!user) throw new HttpException('User not found', 500);

    return user;
  }

  // Update
  @Put(':id')
  async updateUser(@Body() user: Partial<User>, @Param('id') id) {
    return await this.svcUser.updateUser(user, id);
  }

  // Delete
  @Delete(':id')
  async deleteUser(@Param('id') id) {
    if (!id) throw new HttpException('ID was not provided', 400);

    return await this.svcUser.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
