import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

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

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop()
    image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);