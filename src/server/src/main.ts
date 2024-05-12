import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new ConsoleLogger('app', {
  logLevels: ['log'],
  timestamp: true,
});

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Server listening on ${port}`)
}
bootstrap();
