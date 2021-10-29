import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { BagProduct } from './bag-product.entity';

@Table
export class HistoryBayProduct extends Model {
  @ForeignKey(() => BagProduct)
  @Column
  bagProductId: number;

  @BelongsTo(() => BagProduct)
  bagProduct: BagProduct;

  @Column
  price: number;

  @Column
  discount: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
