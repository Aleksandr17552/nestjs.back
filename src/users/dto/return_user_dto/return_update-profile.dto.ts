import { ArrayNotEmpty } from 'class-validator';
import { CategoryDto } from '../user_dto/category.dto';
import { DocumentDto } from '../user_dto/document.dto';
import { PartnerDto } from '../user_dto/partner.dto';
import { RoleDto } from '../user_dto/role.dto';
import { UserDto } from '../user_dto/user.dto';

export class ReturnUpdateProfileDto {
  @ArrayNotEmpty()
  newUser: [number, UserDto[]];

  @ArrayNotEmpty()
  newRoles: RoleDto[];

  @ArrayNotEmpty()
  newPartner: [number, PartnerDto[]];

  @ArrayNotEmpty()
  newDocuments: DocumentDto[];

  @ArrayNotEmpty()
  newCategories: CategoryDto[];
}
