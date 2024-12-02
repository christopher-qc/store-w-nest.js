import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './categories/controllers/category.controller';
import { ProductController } from './product/controllers/product.controller';

@Module({
  imports: [],
  controllers: [AppController, CategoryController, ProductController],
  providers: [AppService],
})
export class AppModule {}
