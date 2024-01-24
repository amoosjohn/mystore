import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Query as ExpressQuery} from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getAllProducts(@Query()  query: ExpressQuery): Promise<Product[]> {
        return this.productsService.getAllProducts(query);
    }

    @Post()
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${extname(file.originalname)}`);
            },
        })
    }))
    async createProduct(
        @UploadedFile() file,
        @Body()
        product: CreateProductDto,
        @Req() req,
    ): Promise<Product> {
        const imageUrl = file ? file.path : null;
        product.image = imageUrl;
        return this.productsService.create(product, req.user);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getProduct(
        @Param('id')
        id: string
    ): Promise<Product> {
        return this.productsService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateProduct(
        @Param('id')
        id: string,
        @Body()
        product: UpdateProductDto
    ): Promise<Product> {
        return this.productsService.update(id ,product);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteProduct(
        @Param('id')
        id: string
    ): Promise<Product> {
        return this.productsService.delete(id);
    }

}
