import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataSourceModule } from 'src/data-source.module';

@Module({
  imports: [DataSourceModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
