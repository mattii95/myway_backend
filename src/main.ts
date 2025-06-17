import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true
  }));
  
  await app.listen(process.env.PORT ?? 3000, process.env.HOST ?? 'localhost');
  Logger.debug(`Servidor levantado en: ${process.env.HOST} : ${process.env.PORT}`)
}
bootstrap();
