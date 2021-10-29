import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/users/dto/user_dto/auth-user.dto';
import { UsersAuthService } from 'src/users/services/users-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private usersAuthService: UsersAuthService,
    private jwtService: JwtService,
  ) {}

  async authUser(userId: number): Promise<AuthUserDto> {
    const user = await this.usersAuthService.getAuthUser(userId);
    return user ? user : null;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersAuthService.authorization(email);
    if (user && user.password === pass) {
      const { id, email } = user;
      return { id, email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
