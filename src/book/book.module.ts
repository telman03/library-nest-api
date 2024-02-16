import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schema/book.schema';

// The @Module() decorator provides metadata that Nest makes use of to organize the application structure.
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
