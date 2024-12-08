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
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Querys } from '../dtos/querys.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAll(@Query() querys: Querys) {
    return this.productService.findAll(querys);
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
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
    return this.productService.updated(id, payload);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
