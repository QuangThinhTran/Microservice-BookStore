import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schema/category.schema';
import { CategoryMapped } from './category.mapped';
import { BookService } from '../book/book.service';
import { Book, BookSchema } from '../book/schema/book.schema';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryMapped, BookService],
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
