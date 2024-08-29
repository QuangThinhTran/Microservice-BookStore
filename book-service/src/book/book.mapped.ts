import { Book } from './schema/book.schema';
import { CategoryService } from '../category/category.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookMapped {
  constructor(readonly categoryService: CategoryService) {}

  /**
   * Map book to readable format
   * @param book
   * */
  async mappedBook(book: Book) {
    return {
      code: book.code,
      name: book.name,
      price: book.price,
      description: book.description,
      category: await this.categoryService
        .findById(book.category.id)
        .then((category) => category.name),
    };
  }

  /**
   * Map books to readable format
   * @param books
   * */
  async mappedBooks(books: Book[]) {
    return await Promise.all(
      books.map(async (book) => {
        const category = await this.categoryService.findById(book.category.id);
        return {
          code: book.code,
          name: book.name,
          price: book.price,
          description: book.description,
          category: category.name,
        };
      }),
    );
  }
}
