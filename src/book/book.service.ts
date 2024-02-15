import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, Category } from './schema/book.schema';
import { User } from 'src/auth/schema/user.schema';
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

    async create(bookDto: CreateBookDto): Promise<Book> {
       const newBook = new this.bookModel({
        ...bookDto,
        // user: user // Assuming user information needs to be associated with the book
    });
    return await newBook.save();
    }


    async findByAuthor(author: string): Promise<Book[]> {
        return await this.bookModel.find({author: author});
    }

    async findByCategory(category: Category): Promise<Book[]> {
        return await this.bookModel.find({category: category});
    }

    async findById(id: string): Promise<Book> {
        
        const book =  await this.bookModel.findById(id);

        if(!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async updateById(id: string, book: Book): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, {new: true});
    }

    async deleteById(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id);
    }

    // TODO: filtering books by category
    // TODO: filtering books by 
}
