import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user_dto/user.dto';
import { UsersService } from './users.service';

@Injectable()
export class UsersAuthService extends UsersService {
  async authorization(email: string): Promise<UserDto> {
    return this.userModel.findOne({
      where: { email: email },
    });
  }

  async getAuthUser(userId: number): Promise<any> {
    const auth = await this.userModel.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        { model: this.roleModel },
        { model: this.partnerModel },
        { model: this.documentModel },
        { model: this.categoryModel },
      ],
    });
    return auth ? auth.get({ plain: true }) : null;
  }
}
