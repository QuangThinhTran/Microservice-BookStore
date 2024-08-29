import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiController } from '../../common/ApiController';
import { Response } from 'express';
import { CategoryMapped } from './category.mapped';

@Controller('category')
export class CategoryController extends ApiController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryMapped: CategoryMapped,
  ) {
    super();
  }

  /**
   * Create a new category
   * @param createCategoryDto
   * @param res
   * */
  @Post('/create')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const checkExist = await this.categoryService.checkNameExist(
        createCategoryDto.name,
      );
      if (!checkExist) {
        return this.responseMessage(
          HttpStatus.BAD_REQUEST,
          'Category already exist',
          res,
        );
      }

      const category = await this.categoryService.create(createCategoryDto);

      return this.responseDataAndMessage(
        HttpStatus.CREATED,
        'Category created',
        this.categoryMapped.mappedCategory(category),
        res,
      );
    } catch (e) {
      return this.responseException(e.message, res);
    }
  }

  /**
   * Get all categories
   * @param res
   * */
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.findAll();
      return this.responseData(
        HttpStatus.OK,
        this.categoryMapped.mappedCategories(categories),
        res,
      );
    } catch (e) {
      return this.responseException(e.message, res);
    }
  }

  /**
   * Get a category by name
   * @param name
   * @param res
   * */
  @Get('/find/:name')
  async findOne(
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const category = await this.categoryService.findOne(name);
      if (!category) {
        return this.responseMessage(
          HttpStatus.NOT_FOUND,
          'Category not found',
          res,
        );
      }

      return this.responseData(
        HttpStatus.OK,
        this.categoryMapped.mappedCategoryDetailWithBook(category),
        res,
      );
    } catch (e) {
      return this.responseException(e.message, res);
    }
  }

  /**
   * Update a category by name
   * @param name
   * @param updateCategoryDto
   * @param res
   * */
  @Put('/update/:name')
  async update(
    @Param('name') name: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const checkExist = await this.categoryService.checkNameExist(
        UpdateCategoryDto.name,
      );
      if (!checkExist) {
        return this.responseMessage(
          HttpStatus.BAD_REQUEST,
          'Category already exist',
          res,
        );
      }

      const category = await this.categoryService.findOne(name);
      if (!category) {
        return this.responseMessage(
          HttpStatus.NOT_FOUND,
          'Category not found',
          res,
        );
      }

      await this.categoryService.update(name, updateCategoryDto);

      return this.responseMessage(HttpStatus.OK, 'Category updated', res);
    } catch (e) {
      return this.responseException(e.message, res);
    }
  }

  /**
   * Delete a category by name
   * @param name
   * @param res
   * */
  @Delete('/delete/:name')
  async remove(
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const category = await this.categoryService.findOne(name);
      if (!category) {
        return this.responseMessage(
          HttpStatus.NOT_FOUND,
          'Category not found',
          res,
        );
      }

      await this.categoryService.remove(name);

      return this.responseMessage(HttpStatus.OK, 'Category deleted', res);
    } catch (e) {
      return this.responseException(e.message, res);
    }
  }
}
