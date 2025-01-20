import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product/product';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  // Exportamos el ProductService para que otros módulos puedan utilizarlo.
  // Esto permite que cualquier módulo que importe ProductModule tenga acceso a ProductService.
  exports: [ProductService],
})
export class ProductModule {}
