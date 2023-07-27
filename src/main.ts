import { NestFactory } from '@nestjs/core';
import { Database } from 'database/database';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
export const database = new Database();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(4000);
}
bootstrap();
