import { IsInt } from 'class-validator';

export class HistoryBayProductDto {
  @IsInt()
  bagProductId: number;
  @IsInt()
  price: number;
  @IsInt()
  discount: number;
}
