import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
import { AppDataSource } from './../data-source';
import { UsersService } from './../users/users.service';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { User } from '@lib/entity/User';

describe('AuthController', () => {
  let svcUser: UsersService;
  let svcAuth: AuthService;
  let svcJwt: JwtService;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [AuthController],
      providers: [AuthService, JwtService, UsersService],
    }).compile();

    svcUser = module.get<UsersService>(UsersService);
    svcAuth = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    svcJwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(svcUser).toBeDefined();
    expect(svcAuth).toBeDefined();
  });

  it('should create a user and successfully log in', async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    let user: Partial<User> = {
      email: 'joe@gmail.com',
      username: 'joe',
      password: 'password',
    };

    if (await svcUser.findOneByEmail(user.email)) {
      await expect(svcUser.createUser(user)).rejects.toThrow(QueryFailedError);
    } else {
      await expect(await svcUser.createUser(user)).toBeTruthy();
    }
    const jwtToken = await controller.login(user);
    expect(jwtToken).toBeDefined();
    const jwtDecoded = svcJwt.decode(jwtToken.access_token);
    expect('email' in jwtDecoded).toBeTruthy();
    expect('iat' in jwtDecoded).toBeTruthy();
    expect('exp' in jwtDecoded).toBeTruthy();


    user = {
      email: 'john@gmail.com',
      username: 'joe',
      password: 'password',
    };
    await expect(controller.login(user)).rejects.toThrow(UnauthorizedException);
    user = {
      username: 'joe',
      password: 'password',
    };
    await expect(controller.login(user)).rejects.toThrow(HttpException);
    user = {
      email: 'john@gmail.com',
      username: 'joe',
    };
    await expect(controller.login(user)).rejects.toThrow(HttpException);
  });
});
