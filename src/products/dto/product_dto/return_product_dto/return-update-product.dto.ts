import { ArrayNotEmpty } from 'class-validator';
import { DiscountDto } from '../discount.dto';
import { ProductDto } from '../product.dto';

export class ReturnUpdateProductDto {
  @ArrayNotEmpty()
  newProduct: [number, ProductDto[]];
  @ArrayNotEmpty()
  newDiscount: [number, DiscountDto[]];
}
