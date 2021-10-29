import { IsInt } from 'class-validator';

export class BagProductDto {
  @IsInt()
  userId: number;
  @IsInt()
  productId: number;
}
