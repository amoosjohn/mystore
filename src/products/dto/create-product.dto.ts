import { IsNotEmpty, IsNumber, IsString, IsEnum } from "class-validator";
import { Category } from "../schemas/product.schema";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, {message: 'Please enter correct category'})
    readonly category: Category;
}