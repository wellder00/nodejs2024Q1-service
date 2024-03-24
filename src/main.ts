import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { setupSwagger } from './swagger/swaggerConfig';
import { EnhancedLoggingService } from './logger/logger.service';
import { setupGlobalExceptionHandlers } from './utils/handlers/setupGlobalExceptionHandlers';

const defaultPort = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = await app.resolve(EnhancedLoggingService);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());

  await setupSwagger(app);

  setupGlobalExceptionHandlers(logger);

  const PORT = process.env.PORT || defaultPort;
  await app.listen(PORT, () =>
    console.log(`\x1b[35mApplication is running on port: ${PORT}\x1b[0m`),
  );

  //TODO Here we will test unhandled exceptions and unhandled rejections and work with logger
  // Promise.reject('Test unhandled rejection for logging');
  // throw new Error('Test unhandled error for logging');
}
bootstrap();
