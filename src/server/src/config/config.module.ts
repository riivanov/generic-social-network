import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { EnvService } from './env.service';

@Module({
  imports: [NestConfig],
  providers: [EnvService],
})
export class ConfigModule {}
