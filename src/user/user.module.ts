import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

import { ProductModule } from '../product/product.module';

@Module({
  // Importamos ProductModule para acceder a los servicios y proveedores exportados por ese módulo.
  // En este caso, estamos habilitando el acceso a ProductService en UserModule.
  imports: [ProductModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
