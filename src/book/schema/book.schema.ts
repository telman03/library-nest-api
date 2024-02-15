import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/schema/user.schema";

export enum Category {
    ADVENTURE = 'Adventure',
    FANTASY = 'Fantasy',
    CRIME = 'Crime',
    CLASSIC = 'Classic',
}
@Schema({ 
    timestamps: true
})

export class Book {
    
    @Prop()
    @ApiProperty()
    title: string;

    @ApiProperty()
    @Prop()
    description: string;

    @ApiProperty()
    @Prop()
    author: string;

    // delete price and category from here
    @ApiProperty()
    @Prop()
    price: number;

    @ApiProperty()
    @Prop()
    category:  Category;

    // add user property here
    @Prop()
    user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);