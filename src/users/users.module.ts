import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCategory } from './entities/category.entity';
import { User } from './entities/user.entity';
import { Document } from './entities/document.entity';
import { Partner } from './entities/partner.entity';
import { UsersAuthService } from './services/users-auth.service';
import { UsersService } from './services/users.service';
import { UsersRegistrationController } from './controllers/users-registration.controller';
import { UsersRegistrationService } from './services/users-registration.service';
import { Role } from './entities/role.entity';
@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      ProductCategory,
      Document,
      Partner,
    ]),
  ],
  controllers: [UsersRegistrationController, UsersController],
  providers: [UsersAuthService, UsersService, UsersRegistrationService],
  exports: [UsersAuthService, UsersService],
})
export class UsersModule {}
