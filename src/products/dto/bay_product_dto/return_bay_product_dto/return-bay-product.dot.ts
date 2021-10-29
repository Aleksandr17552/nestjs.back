import { Type } from 'class-transformer';
import { IsInstance, ValidateNested } from 'class-validator';
import { BagProduct } from 'src/products/entities/bag-product.entity';
import { HistoryBayProduct } from 'src/products/entities/history-bay-product.entity';

export class ReturnBayProductDto {
  @ValidateNested()
  @IsInstance(BagProduct)
  @Type(() => BagProduct)
  newBagProduct: BagProduct;

  @ValidateNested()
  @IsInstance(HistoryBayProduct)
  @Type(() => HistoryBayProduct)
  newHistotyBayProduct: HistoryBayProduct;
}
