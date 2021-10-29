import { Column, Model, Table, HasOne, HasMany } from 'sequelize-typescript';
import { ProductCategory } from './category.entity';
import { Document } from './document.entity';
import { Partner } from './partner.entity';
import { BagProduct } from 'src/products/entities/bag-product.entity';
import { Role } from './role.entity';

@Table
export class User extends Model {
  @Column
  password: string;

  @Column
  email: string;

  @Column
  firstName?: string;

  @Column
  lastName?: string;

  @HasOne(() => Partner)
  partner: Partner;

  @HasMany(() => Role)
  roles: Role;

  @HasMany(() => ProductCategory)
  productCategory: ProductCategory;

  @HasMany(() => Document)
  documents: Document[];

  @HasMany(() => BagProduct)
  franchises: BagProduct[];
}
