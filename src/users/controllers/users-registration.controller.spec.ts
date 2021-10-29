import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { UsersRegistrationController } from './users-registration.controller';

describe('RegistrationController', () => {
  let controller: UsersRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRegistrationController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersRegistrationController>(
      UsersRegistrationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
