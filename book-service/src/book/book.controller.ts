import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiController } from '../../common/ApiController';
import { Response } from 'express';
import { BookMapped } from './book.mapped';

@Controller('book')
export class BookController extends ApiController {
  constructor(
    private readonly bookService: BookService,
    private readonly bookMapped: BookMapped,
  ) {
    super();
  }

  /**
   * Create a new book
   * @param createBookDto
   * @param res
   * */
  @Post('/create')
  async create(
    @Body() createBookDto: CreateBookDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      let checkExist = await this.bookService.checkCodeExist(createBookDto.code);
      if (!checkExist) {
        this.responseMessage(HttpStatus.BAD_REQUEST, 'Book already exist', res);
        return;
      }

      let book = await this.bookService.create(createBookDto);

      this.responseDataAndMessage(
        HttpStatus.CREATED,
        'Book created',
        await this.bookMapped.mappedBook(book),
        res,
      );
    } catch (e) {
      this.responseException(e.message, res);
    }
  }

  /**
   * Get all books
   * @param res
   * */
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      let books = await this.bookService.findAll();
      this.responseData(HttpStatus.OK, await this.bookMapped.mappedBooks(books), res);
    } catch (e) {
      this.responseException(e.message, res);
    }
  }

  /**
   * Get a book by code
   * @param code
   * @param res
   * */
  @Get('/find/:code')
  async findOne(
    @Param('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      let book = await this.bookService.findOne(code);
      if (!book) {
        this.responseMessage(HttpStatus.NOT_FOUND, 'Book not found', res);
        return;
      }

      this.responseData(HttpStatus.OK, await this.bookMapped.mappedBook(book), res);
    } catch (e) {
      this.responseException(e.message, res);
    }
  }

  /**
   * Update a book by code
   * @param code
   * @param updateBookDto
   * @param res
   * */
  @Put('/update/:code')
  async update(
    @Param('code') code: string, @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      let checkExist = await this.bookService.checkCodeExist(code);
      if (!checkExist) {
        this.responseMessage(HttpStatus.BAD_REQUEST, 'Book already exist', res);
        return;
      }

      let book = await this.bookService.findOne(code);
      if (!book) {
        this.responseMessage(HttpStatus.NOT_FOUND, 'Book not found', res);
        return;
      }

      await this.bookService.update(code, updateBookDto);

      this.responseMessage(HttpStatus.OK, 'Book updated', res);
    } catch (e) {
      this.responseException(e.message, res);
    }
  }

  /**
   * Delete a book by code
   * @param code
   * @param res
   * */
  @Delete('/destroy/:code')
  async remove(
    @Param('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      let book = await this.bookService.findOne(code);
      if (!book) {
        this.responseMessage(HttpStatus.NOT_FOUND, 'Book not found', res);
        return;
      }

      await this.bookService.remove(code);

      this.responseMessage(HttpStatus.OK, 'Book deleted', res);
    } catch (e) {
      this.responseException(e.message, res);
    }
  }
}
