import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { CreateProductDto } from './dto/product.dto';
import { CreateCategoryDto } from './dto/category.dto';
import { CreateInventoryDto } from './dto/inventory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = {
  storage: diskStorage({
    destination: './uploads/img-product',
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      return cb(null, `${randomName}${extname(file.originalname)}`)
    },
  }),
};

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getClients(@Res() res: Response) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file', storage))
  async createProduct(
    @UploadedFile() file,
    @Body() req: CreateProductDto,
    @Res() res: Response,
  ) {
    const inventory = await this.productService.createInventory();

    const newReq: CreateProductDto = {
      descrition: req.descrition,
      category: req.category,
      inventory: inventory,
      supplier: req.supplier,
      imgPath: file.path,
      status: req.status,
      service: req.service,
    };

    const newProduct = await this.productService.createProduct(newReq);
    return res.status(HttpStatus.CREATED).json({
      message: 'Product Successfully Created',
      newProduct,
    });
  }

  @Put('/update/:id')
  async uptadeClient(
    @Param('id') id: string,
    @Body() req: CreateProductDto,
    @Res() res: Response,
  ) {
    const updatedProduct = await this.productService.updateProduct(id, req);
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Updated',
      updatedProduct,
    });
  }

  @Delete('/delete')
  async deleteClient(@Query('id') id, @Res() res: Response) {
    const deletedProduct = await this.productService.deleteProduct(id);
    if (!deletedProduct) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Deleted',
      deletedProduct,
    });
  }

  //inventory
  @Put('inventory/update/:id')
  async uptadeInventory(
    @Param('id') id: string,
    @Body() req: CreateInventoryDto,
    @Res() res: Response,
  ) {
    const updatedInventory = await this.productService.updateInventory(id, req);
    if (!updatedInventory)
      throw new NotFoundException('Inventory does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Inventory Successfully Updated',
      updatedInventory,
    });
  }

  // category

  @Get('/category')
  async getCategory(@Res() res: Response) {
    const category = await this.productService.getCategory();
    return res.status(HttpStatus.OK).json(category);
  }

  @Post('/category/create')
  async createCategory(@Body() req: CreateCategoryDto, @Res() res: Response) {
    const newCategory = await this.productService.createCategory(req);
    return res.status(HttpStatus.CREATED).json({
      message: 'Product Successfully Created',
      newCategory,
    });
  }

  @Put('category/update/:id')
  async uptadeCategory(
    @Param('id') id: string,
    @Body() req: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const updatedCategory = await this.productService.updateCategory(id, req);
    if (!updatedCategory)
      throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Successfully Updated',
      updatedCategory,
    });
  }

  @Delete('/delete')
  async deleteCategory(@Query('id') id, @Res() res: Response) {
    const deletedCategory = await this.productService.deleteCategory(id);
    if (!deletedCategory)
      throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Successfully Deleted',
      deletedCategory,
    });
  }
}
