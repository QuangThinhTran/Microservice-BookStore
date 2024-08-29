import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {
  }

  /**
   * Create a new book
   * @param createBookDto
   * */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto);
  }

  /**
   * Get all books
   * */
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  /**
   * Get book by code
   * @param code
   * */
  async findOne(code: string): Promise<Book> {
    return this.bookModel.findOne({ code }).exec();
  }

  /**
   * Get book by ID
   * @param id
   * */
  async findByID(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  /**
   * Update book
   * @param code
   * @param updateBookDto
   * */
  async update(code: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookModel.findOneAndUpdate({ code }, updateBookDto).exec();
  }

  /**
   * Remove book
   * @param code
   * */
  async remove(code: string): Promise<void> {
    await this.bookModel.deleteOne({ code });
  }

  /**
   * Check if book exist
   * @param code
   * */
  async checkCodeExist(code: string): Promise<boolean> {
    let checkExist = this.bookModel.findOne({ code }).exec();
    return !!checkExist;
  }
}
