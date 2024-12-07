import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './categories/controllers/category.controller';
import { ProductController } from './product/controllers/product.controller';
import { ProductService } from './product/services/product.service';

@Module({
  imports: [],
  controllers: [AppController, CategoryController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
