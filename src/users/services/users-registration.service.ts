import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from '../dto/create_user_dto/create-registration.dto';
import { ReturnRegistrationDto } from '../dto/return_user_dto/return-registration.dto';
import { UsersService } from './users.service';

@Injectable()
export class UsersRegistrationService extends UsersService {
  async registration(
    profile: CreateRegistrationDto,
  ): Promise<ReturnRegistrationDto> {
    const { user, roles, partner } = profile;
    const isExistsUser = await this.userModel.findOne({
      where: { email: user.email },
    });
    if (isExistsUser) {
      throw new BadRequestException('User exists');
    }
    const newUser = await this.userModel.create(user);
    const userId = newUser.id;
    const addUserIdRoles = roles.map(({ role }) => ({ role, userId }));
    const newRoles = await this.roleModel.bulkCreate(addUserIdRoles);
    const inviterId = partner.inviterId;
    const newPartner = await this.partnerModel.create({ userId, inviterId });
    return { newUser, newRoles, newPartner };
  }
}
