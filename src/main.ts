import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { setupSwagger } from './swagger/swaggerConfig';

const defaultPort = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await setupSwagger(app);

  const PORT = process.env.PORT || defaultPort;
  await app.listen(PORT, () =>
    console.log(`\x1b[35mApplication is running on port: ${PORT}\x1b[0m`),
  );  
}
bootstrap();
