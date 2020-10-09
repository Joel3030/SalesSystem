import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Inventory, InventoryDocument } from './schema/inventory.schema';
import { Product, ProductDocument } from './schema/product.schema';
import { Category, CategoryDocument } from './schema/category.schema';
import { CreateInventoryDto } from './dto/inventory.dto';
import { CreateProductDto } from './dto/product.dto';
import { CreateCategoryDto } from './dto/category.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Inventory.name)
    private inventoryModel: Model<InventoryDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  //this part is for product
  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const products = await this.productModel.findById(id);
    return products;
  }

  async createProduct(req: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(req);
    return await newProduct.save();
  }

  async updateProduct(id: string, req: CreateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, req);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct;
  }

  // this part is for inventroy
  async createInventory(): Promise<Inventory>{
      const newInventory = new this.inventoryModel();
      return await newInventory.save();
  }

  async updateInventory(id: string, req: CreateInventoryDto): Promise<Inventory> {
    const updatedInventory = await this.inventoryModel.findByIdAndUpdate(id, req);
    return updatedInventory;
  }

  //this part is for category
  async getCategory(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }


  async createCategory(req: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(req);
    return await newCategory.save();
  }

  async updateCategory(id: string, req: CreateCategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, req);
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
    return deletedCategory;
  }


}
