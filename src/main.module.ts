import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { ProductCategory } from './users/entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { Document } from './users/entities/document.entity';
import { Partner } from './users/entities/partner.entity';
import { Discount } from './products/entities/discount.entity';
import { BagProduct } from './products/entities/bag-product.entity';
import { HistoryBayProduct } from './products/entities/history-bay-product.entity';
import { UserMiddleware } from './middlewares/user.middleware';
import { APP_PIPE } from '@nestjs/core';
import { Role } from './users/entities/role.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'aleksandr',
      password: '038841230026Alex',
      database: 'aleksandrdb',
      synchronize: true,
      autoLoadModels: true,
      // query: { raw: true },
      define: {
        timestamps: false,
      },
      models: [
        User,
        Role,
        Product,
        ProductCategory,
        Document,
        Partner,
        Discount,
        BagProduct,
        HistoryBayProduct,
      ],
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
