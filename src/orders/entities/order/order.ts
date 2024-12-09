import { User } from '../../../user/entities/user/user';
import { Product } from '../../../product/entities/product/product';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
