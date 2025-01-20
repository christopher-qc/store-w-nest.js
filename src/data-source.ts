import { DataSource } from 'typeorm';
import { Product } from './product/entities/product/product';
import { User } from './user/entities/user/user';
import { Order } from './orders/entities/order/order';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'my_database',
  entities: [Product, User, Order],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
