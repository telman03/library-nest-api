import { Controller, Get, Post, Body, Param  } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
@Controller('book')
@ApiTags('books')
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
}
