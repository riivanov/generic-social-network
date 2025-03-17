import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AppDataSource } from './data-source';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;
  let svcUser: UsersService;

  beforeEach(async () => {
    // AppDataSource.initialize().catch((error) =>
    //   console.log(error),
    // );
    const app: TestingModule =
      await Test.createTestingModule({
        controllers: [AppController],
        providers: [
          AppService,
          AuthService,
          JwtService,
          UsersService,
        ],
      }).compile();

    appController = app.get<AppController>(AppController);
    svcUser = app.get<UsersService>(UsersService);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    // expect(appController.getHello()).toBe(
    // 'Hello World!',
    // );
    // });
  });

  //
  // CRUD routes for User
  //

  describe('CRUD /api/v1', () => {
    // Create user
    it('should ceraate a user when /user is called', async () => {
      await AppDataSource.initialize();
      let user = await svcUser.createUser({
        username: 'Joe',
        password: 'password',
        email: 'joe@gmail.com',
      });
      delete user.id; 
      expect(user).toEqual({
        username: 'Joe',
        password: 'password',
        email: 'joe@gmail.com',
      });
      await AppDataSource.destroy();
    });

    // Read user
    // it('should return a JWT when /api/v1/auth/login is called', async () => {
    //   // expect.assertions(1);
    //   const result = { access_token: '' };
    //   jest
    //     .spyOn(appController, 'login')
    //     .mockImplementation(async () => result);

    //   const req = {
    //     username: 'Joe',
    //     password: 'password',
    //   };
    //   const res = await appController.login(req);
    //   expect(res).toStrictEqual({
    //     id: 1,
    //     username: 'Joe',
    //   });
    // });
  });
});
