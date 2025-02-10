import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

const logger = new ConsoleLogger('app', {
  logLevels: ['log'],
  timestamp: true,
});

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Server listening on ${port}`);
}
bootstrap();

AppDataSource.initialize().catch((error) =>
  console.log(error),
);
