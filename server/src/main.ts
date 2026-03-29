import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './common/filters/mongoose-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongooseExceptionFilter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
