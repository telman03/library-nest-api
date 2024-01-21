import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

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
}

export const BookSchema = SchemaFactory.createForClass(Book);