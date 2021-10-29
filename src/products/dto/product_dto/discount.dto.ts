import { IsInt } from 'class-validator';

export class DiscountDto {
  productId: number;
  @IsInt()
  bronze: number;
  @IsInt()
  silver: number;
  @IsInt()
  gold: number;
}
