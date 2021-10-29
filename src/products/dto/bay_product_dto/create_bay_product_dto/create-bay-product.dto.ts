import { IsInt, IsString } from 'class-validator';

export class CreateBayProductDto {
  userId: number;
  @IsInt()
  productId: number;
  @IsString()
  discountName: string;
}
