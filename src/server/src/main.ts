import { User } from '@lib/entity/User';
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

AppDataSource.initialize()
  // .then(async () => {
  //   console.log(
  //     'Inserting a new user into the database...',
  //   );
  //   // const user = {"firstName": "Joe", "lastName": "Blow", "age": 37 };
  //   const user = new User();
  //   user.username = 'Joe';
  //   user.password = 'password';
  //   await AppDataSource.manager.save(user);
  //   console.log('Saved a new user with id: ' + user.id);

  //   console.log('Loading users from the database...');
  //   const users = await AppDataSource.manager.find(User);
  //   console.log('Loaded users: ', users);

  //   console.log(
  //     'Here you can setup and run express / fastify / any other framework.',
  //   );
  // })
  .catch((error) => console.log(error));
