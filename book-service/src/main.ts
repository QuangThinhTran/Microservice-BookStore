import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.DOMAIN_SALE_SERVICE,
    methods: 'GET,POST,PUT,DELETE',
  });

  await app.listen(3000);
}

bootstrap();
