import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthUserDto } from 'src/users/dto/user_dto/auth-user.dto';
import { CreateBayProductDto } from '../dto/bay_product_dto/create_bay_product_dto/create-bay-product.dto';
import { ReturnBayProductDto } from '../dto/bay_product_dto/return_bay_product_dto/return-bay-product.dot';
import { CreateDeleteProductDto } from '../dto/product_dto/create_product_dto/create-delete-product.dto';
import { CreateFindProductDto } from '../dto/product_dto/create_product_dto/create-find-product.dto';
import { CreateProductDto } from '../dto/product_dto/create_product_dto/create-product.dto';
import { CreateUpdateProductDto } from '../dto/product_dto/create_product_dto/create-update-product.dto';
import { ProductDto } from '../dto/product_dto/product.dto';
import { ReturnFindProductDto } from '../dto/product_dto/return_product_dto/return-find-product.dto';
import { ReturnProductDto } from '../dto/product_dto/return_product_dto/return-product.dto';
import { ReturnUpdateProductDto } from '../dto/product_dto/return_product_dto/return-update-product.dto';
import { ProductsService } from '../services/products.service';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('person')
  createProduct(
    @User() user: AuthUserDto,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ReturnProductDto> {
    createProductDto.product.authorId = user.id;
    return this.productsService.createProduct(createProductDto);
  }

  @Post('bay')
  createBayProduct(
    @User() user: AuthUserDto,
    @Body() bayProductDto: CreateBayProductDto,
  ): Promise<ReturnBayProductDto> {
    bayProductDto.userId = user.id;
    return this.productsService.createBayProduct(bayProductDto);
  }

  @Get()
  @Roles('person')
  findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Get('find/:id')
  findOne(
    @User() user: AuthUserDto,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ReturnFindProductDto> {
    const findProduct: CreateFindProductDto = {
      productId: id,
      categories: user.productCategory.map(({ category }) => category),
      roles: user.roles.map(({ role }) => role),
    };
    return this.productsService.findOne(findProduct);
  }

  @Patch()
  @Roles('person')
  update(
    @User() user: AuthUserDto,
    @Body() updateProductDto: CreateUpdateProductDto,
  ): Promise<ReturnUpdateProductDto> {
    updateProductDto.userId = user.id;
    return this.productsService.update(updateProductDto);
  }

  @Delete(':id')
  @Roles('person')
  remove(
    @Param('id', new ParseIntPipe()) id: number,
    @User() user: AuthUserDto,
  ): Promise<number> {
    const deleteProduct: CreateDeleteProductDto = {
      productId: id,
      authorId: user.id,
    };
    return this.productsService.remove(deleteProduct);
  }
}
