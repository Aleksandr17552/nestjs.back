import { Type } from 'class-transformer';
import { IsInstance, ValidateNested } from 'class-validator';
import { DiscountDto } from '../discount.dto';
import { ProductDto } from '../product.dto';

export class ReturnProductDto {
  @ValidateNested()
  @IsInstance(ProductDto)
  @Type(() => ProductDto)
  newProduct: ProductDto;

  @ValidateNested()
  @IsInstance(DiscountDto)
  @Type(() => DiscountDto)
  newDiscount: DiscountDto;
}
