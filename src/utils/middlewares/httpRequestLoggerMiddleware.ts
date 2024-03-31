import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EnhancedLoggingService } from 'src/logger/logger.service';

@Injectable()
export class HttpRequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: EnhancedLoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    res.on('finish', () => {
      if (res.getHeader('Skip-Logging') === 'true') {
        return;
      }
      const { method, originalUrl, body, query, ip } = req;
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `${method} ${originalUrl} - StatusCode: ${statusCode}, Body: ${JSON.stringify(
          body,
        )}, Query: ${JSON.stringify(
          query,
        )}, IP: ${ip}, ResponseTime: ${responseTime}ms`,
      );
    });
    next();
  }
}
