import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsInstance, ValidateNested } from 'class-validator';
import { CategoryDto } from '../user_dto/category.dto';
import { DocumentDto } from '../user_dto/document.dto';
import { PartnerDto } from '../user_dto/partner.dto';
import { RoleDto } from '../user_dto/role.dto';
import { UserDto } from '../user_dto/user.dto';

export class CreateProfileDto {
  @ValidateNested()
  @IsInstance(UserDto)
  @Type(() => UserDto)
  readonly user: UserDto;

  @ArrayNotEmpty()
  readonly roles: RoleDto[];

  @ValidateNested()
  @IsInstance(PartnerDto)
  @Type(() => PartnerDto)
  readonly partner: PartnerDto;

  @ArrayNotEmpty()
  readonly documents: DocumentDto[];

  @ArrayNotEmpty()
  readonly categories: CategoryDto[];
}
