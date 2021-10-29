import { ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateFindProductDto {
  @IsInt()
  productId: number;
  @ArrayNotEmpty()
  categories: number[];
  @ArrayNotEmpty()
  roles: string[];
}
