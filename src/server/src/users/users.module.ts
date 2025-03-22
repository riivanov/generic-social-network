import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { UsersService } from './users.service';
import { UserController } from './users.controller';

@Module({
  providers: [UsersService, UserGateway],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
