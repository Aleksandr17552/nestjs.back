import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateProfileDto } from '../dto/create_user_dto/create-profile.dto';
import { CreateUpdateProfileDto } from '../dto/create_user_dto/create-update-profile.dto';
import { ReturnFindProfileDto } from '../dto/return_user_dto/return-find-profile.dto';
import { ReturnProfileDto } from '../dto/return_user_dto/return-profile.dto';
import { ReturnUpdateProfileDto } from '../dto/return_user_dto/return_update-profile.dto';
import { AuthUserDto } from '../dto/user_dto/auth-user.dto';
import { UserDto } from '../dto/user_dto/user.dto';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('person')
  create(@Body() createProfile: CreateProfileDto): Promise<ReturnProfileDto> {
    return this.usersService.create(createProfile);
  }

  @Get()
  @Roles('person', 'agent')
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  findOneProfile(@User() user: AuthUserDto): Promise<ReturnFindProfileDto> {
    return this.usersService.findOne(user.id);
  }

  @Get(':id')
  @Roles('person')
  findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ReturnFindProfileDto> {
    return this.usersService.findOne(+id);
  }

  @Patch()
  update(
    @User() user: AuthUserDto,
    @Body() updateProfile: CreateUpdateProfileDto,
  ): Promise<ReturnUpdateProfileDto> {
    return this.usersService.update(user.id, updateProfile);
  }

  @Delete()
  @Roles('person')
  remove(@User() user: AuthUserDto): Promise<number> {
    return this.usersService.remove(user.id);
  }

  @Delete(':id')
  @Roles('person')
  removeId(@Param('id', new ParseIntPipe()) id: number): Promise<number> {
    return this.usersService.remove(id);
  }
}
