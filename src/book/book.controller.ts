import { User } from './../auth/schema/user.schema';
import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { HttpOnlyGuard } from '../auth/http-only.guard';
import { Request } from 'express';

@Controller('book')
@ApiTags('books')
@UseGuards(HttpOnlyGuard)
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Post()
    async create(@Body() book: CreateBookDto, @Req() request: Request): Promise<Book> {
        const token = request.cookies; 
        
        // Assuming user information is stored in a cookie named 'user'
        // decode token and send the user details

        return this.bookService.create(book);    
    }

    @Get(':id')
    async findById(@Param("id") id: string): Promise<Book> {
        return this.bookService.findById(id);
    }

    @Patch(':id')
    async updateById(@Param("id") id: string, @Body() book: Book): Promise<Book> {
        // here i want to update only one parameter of the book
        // so i will use patch instead of put
        
        return this.bookService.updateById(id, book);
    }

    @Delete(':id')
    async deleteById(@Param("id") id: string): Promise<Book> {
        return this.bookService.deleteById(id);
    }

    @Get('author/:id')
    async findByAuthor(@Param("id") author: string): Promise<Book[]> {
        return this.bookService.findByAuthor(author);
    }
}
