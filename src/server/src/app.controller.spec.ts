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

  describe('root', () => {});

  //
  // CRUD routes for User
  //

  describe('CRUD /api/v1', () => {
    // Create user
    it('should ceraate a user when /user is called', async () => {
      await AppDataSource.initialize();
      const postReq = {
        body: {
          username: 'Joe',
          password: 'password',
          email: 'joe@gmail.com',
        },
      };
      let user = await appController.createUser(postReq);
      delete user.id;
      expect(user).toEqual({
        username: 'Joe',
        password: 'password',
        email: 'joe@gmail.com',
      });
    });

    it('should read a User from the DB, when GET /api/v1/user/:id is called', async () => {
      await AppDataSource.destroy();
      await AppDataSource.initialize();
      const user = await svcUser.getRandomUser();
      const getUser = await appController.getUser(
        user?.id,
      );
      expect(getUser?.id).toBeDefined();
      expect(getUser?.id).toBeTruthy();
      expect(getUser?.email).toBeDefined();
      expect(getUser?.email).toBeTruthy();
      expect(getUser?.username).toBeDefined();
      expect(getUser?.username).toBeTruthy();
      expect(getUser?.password).toBeDefined();
      expect(getUser?.password).toBeTruthy();
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
