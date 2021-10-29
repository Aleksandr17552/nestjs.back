import { Controller, Post, Body } from '@nestjs/common';
import { CreateRegistrationDto } from '../dto/create_user_dto/create-registration.dto';
import { ReturnRegistrationDto } from '../dto/return_user_dto/return-registration.dto';
import { UsersRegistrationService } from '../services/users-registration.service';

@Controller('registration')
export class UsersRegistrationController {
  constructor(
    private readonly usersRegistrationService: UsersRegistrationService,
  ) {}

  @Post()
  registration(
    @Body() createUser: CreateRegistrationDto,
  ): Promise<ReturnRegistrationDto> {
    return this.usersRegistrationService.registration(createUser);
  }
}
