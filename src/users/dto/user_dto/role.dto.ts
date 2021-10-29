import { IsIn } from 'class-validator';

export class RoleDto {
  id?: number;
  userId?: number;
  @IsIn(['person', 'agent'])
  readonly role: string;
}
