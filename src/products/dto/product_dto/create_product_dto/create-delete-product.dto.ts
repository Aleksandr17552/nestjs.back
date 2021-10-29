import { IsInt } from 'class-validator';

export class CreateDeleteProductDto {
  @IsInt()
  productId: number;
  @IsInt()
  authorId: number;
}
