
import {Seller} from '../../supplier/schema/seller.schema';
import { Category } from '../schema/category.schema';
import { Inventory } from '../schema/inventory.schema';

export class CreateProductDto{
    readonly descrition: string;
    readonly category: Category;
    readonly inventory: Inventory;    
    readonly supplier: Seller;
    readonly imgPath: string;
    readonly status: boolean;
    readonly service: boolean;
}