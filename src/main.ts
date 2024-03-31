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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app);
  setupGlobalExceptionHandlers(logger);

  const PORT = process.env.PORT || defaultPort;
  await app.listen(PORT);
  //TODO Here we will test unhandled exceptions and unhandled rejections and work with logger
  // Promise.reject('Test unhandled rejection for logging');
  // throw new Error('Test unhandled error for logging');
  logger.log(`Application is running on port: ${PORT}`, 'Bootstrap');
}

bootstrap().catch((error) => {
  console.error(
    `\x1b[31mFailed to bootstrap the application: ${error.message}\x1b[0m`,
  );
  process.exit(1);
});
