import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  // Exportamos el ProductService para que otros módulos puedan utilizarlo.
  // Esto permite que cualquier módulo que importe ProductModule tenga acceso a ProductService.
  exports: [ProductService],
})
export class ProductModule {}
