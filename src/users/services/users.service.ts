import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from '../dto/create_user_dto/create-profile.dto';
import { CreateUpdateProfileDto } from '../dto/create_user_dto/create-update-profile.dto';
import { ReturnFindProfileDto } from '../dto/return_user_dto/return-find-profile.dto';
import { ReturnProfileDto } from '../dto/return_user_dto/return-profile.dto';
import { ReturnUpdateProfileDto } from '../dto/return_user_dto/return_update-profile.dto';
import { UserDto } from '../dto/user_dto/user.dto';
import { ProductCategory } from '../entities/category.entity';
import { Document } from '../entities/document.entity';
import { Partner } from '../entities/partner.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    protected userModel: typeof User,
    @InjectModel(Role)
    protected roleModel: typeof Role,
    @InjectModel(Partner)
    protected partnerModel: typeof Partner,
    @InjectModel(Document)
    protected documentModel: typeof Document,
    @InjectModel(ProductCategory)
    protected categoryModel: typeof ProductCategory,
  ) {}

  async create(profile: CreateProfileDto): Promise<ReturnProfileDto> {
    const { user, roles, partner, documents, categories } = profile;
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
    const newPartner = await this.partnerModel.create({ inviterId, userId });
    const addUserIdDocument = documents.map(({ url }) => ({ url, userId }));
    const newDocuments = await this.documentModel.bulkCreate(addUserIdDocument);
    const addUserIdCategories = categories.map(({ category }) => ({
      category,
      userId,
    }));
    const newCategories = await this.categoryModel.bulkCreate(
      addUserIdCategories,
    );
    return { newUser, newRoles, newPartner, newDocuments, newCategories };
  }

  async findAll(): Promise<UserDto[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<ReturnFindProfileDto> {
    const user = await this.userModel.findByPk(id);
    const roles = await this.roleModel.findAll({
      where: { userId: id },
    });
    const partner = await this.partnerModel.findOne({
      where: { userId: id },
    });
    const documents = await this.documentModel.findAll({
      where: { userId: id },
    });
    const categories = await this.categoryModel.findAll({
      where: { userId: id },
    });
    return { user, roles, partner, documents, categories };
  }

  async update(
    id: number,
    updateUser: CreateUpdateProfileDto,
  ): Promise<ReturnUpdateProfileDto> {
    const { user, roles, partner, documents, categories } = updateUser;
    const newUser = await this.userModel.update(user, { where: { id: id } });
    const addUserIdRoles = roles.map((data) => {
      data.userId = id;
      return data;
    });
    const newRoles = await this.roleModel.bulkCreate(addUserIdRoles, {
      fields: ['id', 'userId', 'role'],
      updateOnDuplicate: ['role'],
    });
    const newPartner = await this.partnerModel.update(partner, {
      where: { userId: id },
    });
    const addUserIdDocument = documents.map((data) => {
      data.userId = id;
      return data;
    });
    const newDocuments = await this.documentModel.bulkCreate(
      addUserIdDocument,
      {
        fields: ['id', 'userId', 'url'],
        updateOnDuplicate: ['url'],
      },
    );
    const addUserIdCategories = categories.map((data) => {
      data.userId = id;
      return data;
    });
    const newCategories = await this.categoryModel.bulkCreate(
      addUserIdCategories,
      {
        updateOnDuplicate: ['category'],
      },
    );
    return { newUser, newRoles, newPartner, newDocuments, newCategories };
  }

  async remove(id: number): Promise<number> {
    const user = await this.userModel.destroy({ where: { id: id } });
    return user;
  }
}
