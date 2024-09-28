import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = process.env.NODE_ENV === 'production' ? 3000 : 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
