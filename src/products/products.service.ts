import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product} from './schemas/product.schema';
import mongoose from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>
    ){}
    

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return  products;
    }

    async create(product: Product): Promise<Product> {
        const res = await this.productModel.create(product);
        return res;
    }


    async findById(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);

        if(!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async update(id: string, product: Product): Promise<Product> {
        const res = await this.productModel.findByIdAndUpdate(id, product, {
            new: true,
            runValidators: true,
        });
        return res;
    }

    async delete(id: string): Promise<any> {
        const res = await this.productModel.findByIdAndDelete(id);
        return res;
    }
    
}
