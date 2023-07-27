import { NestFactory } from '@nestjs/core';
import { Database } from 'database/database';
import { AppModule } from './app.module';
export const database = new Database();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
