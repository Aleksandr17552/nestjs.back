import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Discount } from './entities/discount.entity';
import { BagProduct } from './entities/bag-product.entity';
import { HistoryBayProduct } from './entities/history-bay-product.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      Discount,
      BagProduct,
      HistoryBayProduct,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
