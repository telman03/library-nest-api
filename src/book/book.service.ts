import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
@Injectable()
export class BookService {
   
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
    ) {}

    async findAll(): Promise<Book[]> {
        return await this.bookModel.find();
    }

    async create(book: CreateBookDto): Promise<Book> {
        const newBook = new this.bookModel(book);
        return await newBook.save();
    }

    async findById(id: string): Promise<Book> {
        return await this.bookModel.findById(id);
    }
}
