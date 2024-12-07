import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product/product';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos';

@Injectable()
export class ProductService {
  private counterId = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    },
    {
      id: 3,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    },
    {
      id: 4,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  created(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updated(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) {
      return 'Product not found';
    }
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  remove(id: number) {
    const product = this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const index = this.products.findIndex((p) => p.id === id);
    this.products.splice(index, 1);
    return product;
  }
}

export default ProductService;
