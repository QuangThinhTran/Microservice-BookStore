import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('Database connected');
        });
        connection.on('error', (error) => {
          console.error('Database connection error:', error);
        });
        return connection;
      },
    }),
    BookModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
