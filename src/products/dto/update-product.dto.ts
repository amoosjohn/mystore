import { IsOptional, IsNumber, IsString, IsEnum } from "class-validator";
import { Category } from "../schemas/product.schema";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsEnum(Category, {message: 'Please enter correct category'})
    readonly category: Category;
}