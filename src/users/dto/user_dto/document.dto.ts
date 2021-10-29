import { IsString } from 'class-validator';

export class DocumentDto {
  id?: number;
  userId: number;
  @IsString()
  readonly url: string;
}
