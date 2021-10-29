import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { AuthDto } from '../dto/auth.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('authorization')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@User() user: AuthDto) {
    return this.authService.login(user);
  }
}
