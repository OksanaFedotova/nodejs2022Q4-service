import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomLogger } from './logger/logger.service';
import { AllExceptionsFilter } from './filters/exeption.filter';
import { HttpAdapterHost } from '@nestjs/core';
//import { getDocs } from './utils';

const PORT: number = Number(process.env.PORT) || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false, bufferLogs: true });

  app.useLogger(app.get(CustomLogger));
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .setDescription('Documentation for nest js app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  //const document = await getDocs('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
