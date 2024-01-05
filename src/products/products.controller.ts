import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Post()
    async createProduct(
        @Body()
        product: CreateProductDto
    ): Promise<Product> {
        return this.productsService.create(product);
    }

    @Get(':id')
    async getProduct(
        @Param('id')
        id: string
    ): Promise<Product> {
        return this.productsService.findById(id);
    }

    @Put(':id')
    async updateProduct(
        @Param('id')
        id: string,
        @Body()
        product: UpdateProductDto
    ): Promise<Product> {
        return this.productsService.update(id ,product);
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id')
        id: string
    ): Promise<Product> {
        return this.productsService.delete(id);
    }

}
