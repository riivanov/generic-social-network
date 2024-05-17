import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, NestConfig.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
