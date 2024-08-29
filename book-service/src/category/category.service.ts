import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {
  }

  /**
   * Create category
   * @param createCategoryDto
   * */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
  }

  /**
   * Find all categories
   * */
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  /**
   * Find one category
   * @param name
   * */
  async findOne(name: string): Promise<Category> {
    return this.categoryModel.findOne({ name }).exec();
  }

  /**
   * Find category by id
   * @param id
   * */
  async findById(id: Buffer): Promise<Category> {
    return this.categoryModel.findById(id.toString('hex')).exec();
  }

  /**
   * Update category
   * @param name
   * @param updateCategoryDto
   * */
  async update(name: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryModel.findOneAndUpdate({ name }, updateCategoryDto).exec();
  }

  /**
   * Remove category
   * @param name
   * */
  async remove(name: string): Promise<void> {
    await this.categoryModel.deleteOne({ name });
  }

  /**
   * Check category name exist
   * @param name
   * */
  async checkNameExist(name: string): Promise<boolean> {
    let checkExist = this.categoryModel.findOne({ name }).exec();
    return !!checkExist;
  }
}
