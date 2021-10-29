import { Test, TestingModule } from '@nestjs/testing';
import { UsersRegistrationController } from '../controllers/users-registration.controller';
import { UsersRegistrationService } from './users-registration.service';

describe('UsersRegistrationService', () => {
  let usersRegistrationController: UsersRegistrationController;
  let usersRegistrationService: UsersRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRegistrationController],
      providers: [UsersRegistrationService],
    }).compile();

    usersRegistrationService = module.get<UsersRegistrationService>(
      UsersRegistrationService,
    );
    usersRegistrationController = module.get<UsersRegistrationController>(
      UsersRegistrationController,
    );
  });

  it('should return of user', async () => {
    const result = {
      newUser: {
        id: 1,
        password: 'test',
        email: 'test@mail.io',
        firstName: 'test',
        lastName: 'test',
      },
      newRoles: [
        {
          id: 1,
          role: 'agent',
          userId: 1,
        },
      ],
      newPartner: {
        id: 1,
        userId: 1,
        inviterId: 0,
      },
    };
    const userTest = {
      user: {
        password: 'test',
        email: 'test@mail.io',
        firstName: 'test',
        lastName: 'test',
      },
      roles: [{ role: 'agent' }],
      partner: { inviterId: 0 },
    };
    jest
      .spyOn(usersRegistrationService, 'registration')
      .mockImplementation(async () => result);

    expect(await usersRegistrationController.registration(userTest)).toBe(
      result,
    );
  });
});
