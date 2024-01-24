import { Module } from "@nestjs/common";

import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./schemas/product.schema";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[
        AuthModule,
        MongooseModule.forFeature([{name: 'Product',schema:  ProductSchema}])
    ],
    controllers: [ProductsController],
    providers: [ProductsService]
})

export class ProductsModule { }