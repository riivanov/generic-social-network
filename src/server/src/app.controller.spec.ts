import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;
  let svcUser: UsersService;

  beforeEach(async () => {
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

  it('should return a JWT when /api/v1/auth/login is called', async () => {
    // expect.assertions(1);
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
  });
});
