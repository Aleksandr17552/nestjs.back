import { IsInt } from 'class-validator';

export class CategoryDto {
  id?: number;
  userId: number;
  @IsInt()
  readonly category: number;
}
