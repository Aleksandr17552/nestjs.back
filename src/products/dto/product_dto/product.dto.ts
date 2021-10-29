import { IsInt, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;
  @IsInt()
  category: number;
  @IsInt()
  price: number;

  authorId: number;
}
