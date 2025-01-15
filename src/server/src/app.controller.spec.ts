import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule =
      await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
      }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(
        'Hello World!',
      );
    });

    // CRUD routes for User
    it('/api/v1/user', () => {
      expect.assertions(1);
      expect(appController.createUser()).toStrictEqual({
        username: 'Joe',
        password: 'password',
      });
    });
  });
});
