import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
  @Get()
  getProducts(@Query('limit') limit = 100, @Query('page') page = 1) {
    return `productos limit ${limit} and page ${page}`;
  }

  @Get('/:id/products/:productId')
  getCategories(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return `categorias ${id} and productos ${productId}`;
  }
}
