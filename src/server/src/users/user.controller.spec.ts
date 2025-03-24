import { Test, TestingModule } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
import { AppDataSource } from './../data-source';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let userController: UserController;
  let svcUser: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
    }).compile();
    userController = app.get<UserController>(UserController);
    svcUser = app.get<UsersService>(UsersService);
  });

  describe('CRUD API', () => {
    // Create user
    it('should create a user when /user is called', async () => {
      if (!AppDataSource.isInitialized) await AppDataSource.initialize();
      const postReq = {
        id: null,
        username: 'Joe',
        password: 'password',
        email: 'joe@gmail.com',
      };
      let user = await userController.createUser(postReq);
      delete user.id;
      expect(user).toEqual({
        username: 'Joe',
        password: 'password',
        email: 'joe@gmail.com',
      });
    });

    // Read user
    it('should read a User from the DB, when GET /api/v1/user/:id is called', async () => {
      if (!AppDataSource.isInitialized) await AppDataSource.initialize();

      const user = await svcUser.getRandomUser();
      if (!user) {
        expect(user).toBeFalsy();
      } else {
        const getUser = await userController.getUser(user?.id);
        expect(getUser?.id).toBeDefined();
        expect(getUser?.id).toBeTruthy();
        expect(getUser?.email).toBeDefined();
        expect(getUser?.email).toBeTruthy();
        expect(getUser?.username).toBeDefined();
        expect(getUser?.username).toBeTruthy();
        expect(getUser?.password).toBeDefined();
        expect(getUser?.password).toBeTruthy();
      }
    });

    // Update user
    it('should update props of user when PUT /api/v1/user/:id is called', async () => {
      if (!AppDataSource.isInitialized) await AppDataSource.initialize();
      let putReq = {
        id: '1',
        password: null,
        email: null,
        username: null,
      };
      await expect(() => userController.updateUser(putReq, 1)).rejects.toThrow(
        QueryFailedError,
      );
      putReq = {
        id: '1',
        password: 'password',
        email: null,
        username: null,
      };
      await expect(() => userController.updateUser(putReq, 1)).rejects.toThrow(
        QueryFailedError,
      );
      putReq = {
        id: '1',
        password: 'password',
        email: 'joe@gmail.com',
        username: null,
      };
      await expect(() => userController.updateUser(putReq, 1)).rejects.toThrow(
        QueryFailedError,
      );
      const random = await svcUser.getRandomUser();
      if (!random) return;

      putReq = {
        id: random.id,
        email: 'jstalin@gmail.com',
        password: 'ihatepasswords',
        username: 'jstalin',
      };
      const updatedUser = await userController.updateUser(putReq, random.id);
      await expect(updatedUser).toEqual({
        id: random.id,
        email: 'jstalin@gmail.com',
        password: 'ihatepasswords',
        username: 'jstalin',
      });
    });

    // Delete user
    it('should delete User in the DB when DELETE /api/v1/user/:id is called', async () => {
      const user = await svcUser.getRandomUser();
      await userController.deleteUser(Number(user?.id) ?? null);
    });
  });
});
