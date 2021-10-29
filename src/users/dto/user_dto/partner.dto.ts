import { IsInt } from 'class-validator';

export class PartnerDto {
  id?: number;
  userId?: number;
  @IsInt()
  readonly inviterId: number;
}
