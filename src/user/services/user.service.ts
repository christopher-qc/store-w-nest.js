import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user/user';
import { Order } from '../../orders/entities/order/order';
import { ProductService } from '../../product/services/product.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private productService: ProductService) {}

  private counterId = 1;

  private users: User[] = [
    {
      id: 1,
      name: 'Juan',
      last_name: 'Pérez',
      fullname: 'Juan Pérez',
      email: 'juan.perez@example.com',
      age: 30,
      isActive: true,
    },
    {
      id: 2,
      name: 'Ana',
      last_name: 'Gómez',
      fullname: 'Ana Gómez',
      email: 'ana.gomez@example.com',
      age: 25,
      isActive: false,
    },
    {
      id: 3,
      name: 'Carlos',
      last_name: 'Rodríguez',
      fullname: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@example.com',
      age: 28,
      isActive: true,
    },
    {
      id: 4,
      name: 'María',
      last_name: 'López',
      fullname: 'María López',
      email: 'maria.lopez@example.com',
      age: 35,
      isActive: true,
    },
  ];

  findAll(querys) {
    const { limit, page } = querys;
    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const validPage = pageNumber > 0 ? pageNumber : 1;
    const validLimit = pageSize > 0 ? pageSize : 10;

    const startIndex = (validPage - 1) * validLimit;
    const endIndex = validPage * validLimit;

    const users = this.users.slice(startIndex, endIndex);
    return users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  created(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      return 'User not found';
    }
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  remove(id: number) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const index = this.users.findIndex((p) => p.id === id);
    this.users.splice(index, 1);
    return user;
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productService.findAll(),
    };
  }
}
