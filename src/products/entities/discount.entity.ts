import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Product } from './product.entity';

@Table
export class Discount extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column
  bronze: number;

  @Column
  silver: number;

  @Column
  gold: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
