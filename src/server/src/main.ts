import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new ConsoleLogger('app', {
  logLevels: ['log'],
  timestamp: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO(rivanov): iterate and introduce a custom interface;
  // See: https://docs.nestjs.com/techniques/configuration#using-the-configservice
  const svcConfig = app.get(ConfigService);
  const port = svcConfig.get<string>('PORT');

  await app.listen(port);
  logger.log(`Server listening on ${port}`);
}
bootstrap();
