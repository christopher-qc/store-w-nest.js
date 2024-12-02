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
  Res,
} from '@nestjs/common';

import { Response } from 'express';

@Controller('products')
export class ProductController {
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('page') page = 1,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products limit ${limit} and page ${page} and brand ${brand}`,
    };
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Res() response: Response, @Param('productId') productId: string) {
    response.status(200).send({
      message: `product ${productId}`,
    });
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create product',
      payload,
    };
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `update product ${id}`,
      payload,
    };
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return {
      message: `delete product ${id}`,
    };
  }
}
