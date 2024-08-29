import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from '../../category/schema/category.schema';

export type BookSchema = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  id: Buffer;

  @Prop({ unique: true })
  code: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  quantity: number;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
