import {
  Column,
  CreatedAt,
  HasMany,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Discount } from './discount.entity';
import { BagProduct } from './bag-product.entity';

@Table
export class Product extends Model {
  @Column
  name: string;

  @Column
  category: number;

  @Column
  price: number;

  @Column
  authorId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasOne(() => Discount)
  discount: Discount;

  @HasMany(() => BagProduct)
  franchises: BagProduct[];
}
