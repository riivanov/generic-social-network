import { User } from '../../lib/entity/User';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'gsn',
  synchronize: false,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [__dirname + "/../migrations/**/*.ts"],
});
