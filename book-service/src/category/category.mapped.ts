import { Category } from './schema/category.schema';
import { BookService } from '../book/book.service';

export class CategoryMapped {
  constructor(private readonly bookService: BookService) {}

  /**
   * Mapped category
   * @param data
   * */
  mappedCategory(data: Category) {
    return {
      name: data.name,
    };
  }

  /**
   * Mapped category detail with book
   * @param data
   * */
  mappedCategoryDetailWithBook(data: Category) {
    return {
      name: data.name,
      books: data.books.map((book) => {
        return {
          title: book.name,
          description: book.description,
          price: book.price,
        };
      }),
    };
  }

  /**
   * Mapped categories
   * @param data
   * */
  mappedCategories(data: Category[]) {
    return data.map((category) => {
      return {
        name: category.name,
      };
    });
  }
}
