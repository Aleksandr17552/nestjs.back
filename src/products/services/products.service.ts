import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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
import { BagProduct } from '../entities/bag-product.entity';
import { Discount } from '../entities/discount.entity';
import { HistoryBayProduct } from '../entities/history-bay-product.entity';
import { Product } from '../entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(HistoryBayProduct)
    private historyBayProductModel: typeof HistoryBayProduct,
    @InjectModel(Discount)
    private discountModel: typeof Discount,
    @InjectModel(BagProduct)
    private bagProductModel: typeof BagProduct,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ReturnProductDto> {
    const { product, discount } = createProductDto;
    const newProduct = await this.productModel.create(product);
    discount.productId = newProduct.id;
    const newDiscount = await this.discountModel.create(discount);
    return { newProduct, newDiscount };
  }

  async createBayProduct(
    bayProductDto: CreateBayProductDto,
  ): Promise<ReturnBayProductDto> {
    const { userId, productId, discountName } = bayProductDto;
    const product = await this.productModel.findByPk(productId);
    const discountProduct = await this.discountModel.findOne({
      where: { productId: product.id },
    });
    const newBagProduct = await this.bagProductModel.create({
      userId,
      productId,
    });
    const price = product.price;
    const discountPercentage = discountProduct[discountName];
    const finalPrice = price - (price / 100) * discountPercentage;
    const history = {
      bagProductId: newBagProduct.id,
      price: finalPrice,
      discount: discountPercentage,
    };
    const newHistotyBayProduct = await this.historyBayProductModel.create(
      history,
    );
    return { newBagProduct, newHistotyBayProduct };
  }

  async findAll(): Promise<ProductDto[]> {
    return this.productModel.findAll();
  }

  async findOne(
    findProduct: CreateFindProductDto,
  ): Promise<ReturnFindProductDto> {
    const {
      productId,
      categories: userCategories,
      roles: userRoles,
    } = findProduct;
    console.log(userCategories, 'userCategories');

    const query = userRoles.includes('person')
      ? { id: productId }
      : { id: productId, category: { [Op.in]: userCategories } };

    const product = await this.productModel.findOne({
      where: query,
    });
    const discount = await this.discountModel.findOne({
      where: { productId: productId },
    });
    return { product, discount };
  }

  async update(
    updateProductDto: CreateUpdateProductDto,
  ): Promise<ReturnUpdateProductDto> {
    const { userId, productId, product, discount } = updateProductDto;
    const newProduct = await this.productModel.update(product, {
      where: { id: productId, authorId: userId },
    });
    const newDiscount =
      newProduct &&
      (await this.discountModel.update(discount, {
        where: { productId: productId },
      }));
    return { newProduct, newDiscount };
  }

  async remove(deleteProduct: CreateDeleteProductDto): Promise<number> {
    const { productId, authorId: userAuthorId } = deleteProduct;
    return this.productModel.destroy({
      where: { id: productId, authorId: userAuthorId },
    });
  }
}
