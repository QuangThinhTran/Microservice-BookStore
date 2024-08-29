import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { BookMapped } from './book.mapped';
import { CategoryService } from '../category/category.service';
import { Category, CategorySchema } from '../category/schema/category.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Book.name, schema: BookSchema },
    { name: Category.name, schema: CategorySchema },
  ])],
  controllers: [BookController],
  providers: [BookService, BookMapped, CategoryService],
  exports: [BookService],
})
export class BookModule {
}
