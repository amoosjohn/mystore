import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product} from './schemas/product.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';


@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>
    ){}
    

    async getAllProducts(query: Query): Promise<Product[]> {
        console.log('query',query)
        
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword ? {
            name:{
                $regex: query.keyword,
                $options: 'i'
            }
        } : {};
        const products = await this.productModel
            .find({...keyword})
            .limit(resPerPage)
            .skip(skip);
        return  products;
    }

    async create(product: Product): Promise<Product> {
        const res = await this.productModel.create(product);
        return res;
    }


    async findById(id: string): Promise<Product> {

        const isValidId = mongoose.isValidObjectId(id);

        if(!isValidId) {
            throw new BadRequestException('Please enter correct id');
        }
        
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
