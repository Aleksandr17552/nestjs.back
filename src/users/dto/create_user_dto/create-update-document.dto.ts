import { IsInt, IsString } from 'class-validator';

export class UpdateDocumentDto {
  userId: number;
  @IsInt()
  documentId: number;
  @IsString()
  readonly url: string;
}
