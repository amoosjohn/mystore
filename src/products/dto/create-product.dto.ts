import { IsNotEmpty, IsNumber, IsString, IsEnum, IsEmpty, IsOptional } from "class-validator";
import { Category } from "../schemas/product.schema";
import { User } from "../..//auth/schemas/user.schema";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, {message: 'Please enter correct category'})
    readonly category: Category;

    @IsEmpty({message: 'You cannot pass user id'})
    readonly user:User;

    @IsOptional()
    image: string;
}