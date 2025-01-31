import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;
  let svcUser: UsersService;

  beforeEach(async () => {
    const app: TestingModule =
      await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService, UsersService],
      }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
  //
  // CRUD routes for User
  //

  describe('/api/v1', () => {
    // Create user
    it('should ceraate a user when /user is called', () => {
      expect.assertions(1);
      expect(svcUser.createUser({
        id: 1,
        username: 'Joe',
        password: 'password'
      })).toStrictEqual({
        id: 1,
        username: 'Joe',
        password: 'password',
      });
    });

    // Read user
    it('should return a JWT when /api/v1/auth/login is called', async () => {
      // expect.assertions(1);
      const result = { access_token: "" }
      jest
        .spyOn(appController, 'login')
        .mockImplementation(async () => result);

      const req = {
        username: 'Joe',
        password: 'password',
      };
      const res = await appController.login(req);
      expect(res).toStrictEqual({
        id: 1,
        username: 'Joe',
      });
    });
  });
});
