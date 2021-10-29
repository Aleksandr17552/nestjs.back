import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { HistoryBayProduct } from './history-bay-product.entity';
import { Product } from './product.entity';

@Table
export class BagProduct extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @HasOne(() => HistoryBayProduct)
  discount: HistoryBayProduct;
}
