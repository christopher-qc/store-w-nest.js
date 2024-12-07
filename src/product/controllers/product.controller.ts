import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import ProductsService from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
// import { Response } from 'express';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('page') page = 1,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
    // message: `products limit ${limit} and page ${page} and brand ${brand}`,
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'create product',
    //   payload,
    // };
    return this.productService.created(payload);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    // return {
    //   message: `update product ${id}`,
    //   payload,
    // };
    return this.productService.updated(id, payload);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
