import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UserGateway],
  exports: [UsersService],
})
export class UsersModule {}
