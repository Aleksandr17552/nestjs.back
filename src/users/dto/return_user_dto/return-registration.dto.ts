import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsInstance, ValidateNested } from 'class-validator';
import { PartnerDto } from '../user_dto/partner.dto';
import { RoleDto } from '../user_dto/role.dto';
import { UserDto } from '../user_dto/user.dto';

export class ReturnRegistrationDto {
  @ValidateNested()
  @IsInstance(UserDto)
  @Type(() => UserDto)
  newUser: UserDto;

  @ArrayNotEmpty()
  readonly newRoles: RoleDto[];

  @ValidateNested()
  @IsInstance(PartnerDto)
  @Type(() => PartnerDto)
  newPartner: PartnerDto;
}
