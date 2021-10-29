import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsInstance,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CategoryDto } from './category.dto';
import { DocumentDto } from './document.dto';
import { PartnerDto } from './partner.dto';
import { RoleDto } from './role.dto';

export class AuthUserDto {
  @IsInt()
  readonly id: number;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @ArrayNotEmpty()
  roles: RoleDto[];
  @ValidateNested()
  @IsInstance(PartnerDto)
  @Type(() => PartnerDto)
  partner: PartnerDto;
  @ArrayNotEmpty()
  documents: DocumentDto[];
  @ArrayNotEmpty()
  productCategory: CategoryDto[];
}
