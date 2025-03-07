import { Module } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';
import { AppDataSource } from './data-source';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { enviroments } from 'enviroments';
import config from './config';
import { DatabaseModule } from './database/database.module';

// Category
import { CategoryModule } from './category/category.module';

// Product
import { ProductModule } from './product/product.module';

// Ordes
import { OrdersModule } from './orders/orders.module';

// User
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    ProductModule,
    OrdersModule,
    UserModule,
    CategoryModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
