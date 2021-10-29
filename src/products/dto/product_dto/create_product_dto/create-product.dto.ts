import { Type } from 'class-transformer';
import { IsInstance, ValidateNested } from 'class-validator';
import { DiscountDto } from '../discount.dto';
import { ProductDto } from '../product.dto';

export class CreateProductDto {
  @ValidateNested()
  @IsInstance(ProductDto)
  @Type(() => ProductDto)
  product: ProductDto;

  @ValidateNested()
  @IsInstance(DiscountDto)
  @Type(() => DiscountDto)
  discount: DiscountDto;
}
