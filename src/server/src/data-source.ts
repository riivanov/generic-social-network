import { DataSource } from 'typeorm';
import { User } from '../../lib/entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'gsn',
  synchronize: false,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [__dirname + '/../migrations/**/*.ts'],
});
