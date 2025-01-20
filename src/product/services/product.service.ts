import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product/product';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
    // if (!querys) {
    //   return this.productRepo.find;
    // }
    // const { limit, page } = querys;
    // const pageNumber = Number(page);
    // const pageSize = Number(limit);

    // const validPage = pageNumber > 0 ? pageNumber : 1;
    // const validLimit = pageSize > 0 ? pageSize : 10;

    // const startIndex = (validPage - 1) * validLimit;
    // const endIndex = validPage * validLimit;

    // const products = this.productRepo.slice(startIndex, endIndex);
    // return products;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}

export default ProductService;
