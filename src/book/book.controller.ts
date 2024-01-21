import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards  } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { HttpOnlyGuard } from '../auth/http-only.guard';


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
    async create(@Body() book: CreateBookDto): Promise<Book> {
        return this.bookService.create(book);
    }

    @Get(':id')
    async findById(@Param("id") id: string): Promise<Book> {
        return this.bookService.findById(id);
    }

    @Patch(':id')
    async updateById(@Param("id") id: string, @Body() book: Book): Promise<Book> {
        //here i want to update only one parameter of the book
        return this.bookService.updateById(id, book);
    }

    @Delete(':id')
    async deleteById(@Param("id") id: string): Promise<Book> {
        return this.bookService.deleteById(id);
    }
}
