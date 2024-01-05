import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
    MOBILE = "Mobile",
    LAPTOP = "Laptop",
    SPEAKERS = "Speakers",
    ACCESSORIES = "Accessories",

}

@Schema({
    timestamps: true
})
export class Product {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);