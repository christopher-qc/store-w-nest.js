import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Category
import { CategoryController } from './category/controllers/category.controller';
import { CategoryService } from './category/services/category.service';

// Product
import { ProductController } from './product/controllers/product.controller';
import { ProductService } from './product/services/product.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [AppController, CategoryController, ProductController],
  providers: [AppService, ProductService, CategoryService],
})
export class AppModule {}
