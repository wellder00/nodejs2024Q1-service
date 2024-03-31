import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { stat, appendFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import { cwd } from 'node:process';

@Injectable()
export class EnhancedLoggingService extends ConsoleLogger {
  private readonly logLevel: number;
  private readonly logFileMaxSizeBytes: number;
  private readonly logsFolderPath: string;
  private logFileName = 'application.log';
  private errorLogFileName = 'errors.log';

  constructor(private configService: ConfigService) {
    super();
    this.logLevel = parseInt(this.configService.get<string>('LOG_LEVEL'), 10);
    this.logFileMaxSizeBytes = parseInt(
      this.configService.get<string>('LOG_SIZE'),
      10,
    );

    this.logsFolderPath = path.join(
      cwd(),
      this.configService.get<string>('LOGS_DIR'),
    );
    this.initializeLogFiles();
  }

  private initializeLogFiles(): void {
    mkdirSync(this.logsFolderPath, { recursive: true });
    this.rotateLogFile(this.logFileName);
    this.rotateLogFile(this.errorLogFileName);
  }

  private rotateLogFile(fileName: string): void {
    const newFileName = this.generateFileName(fileName);
    const filePath = path.join(this.logsFolderPath, newFileName);
    appendFile(filePath, '', { flag: 'w' }).catch((error) =>
      console.error('Failed to create log file:', error),
    );
    if (fileName.includes('error')) {
      this.errorLogFileName = newFileName;
    } else {
      this.logFileName = newFileName;
    }
  }
  private timeStamp(): string {
    return new Date()
      .toISOString()
      .replace('T', ' ')
      .slice(0, -5)
      .replace(/:/g, '-');
  }

  private generateFileName(baseName: string): string {
    const time = this.timeStamp();

    return `${time}-${baseName}`;
  }

  private async appendLogMessage(
    filePath: string,
    message: string,
  ): Promise<void> {
    const fileStats = await stat(filePath).catch(() => null);
    const isFileTooLarge = fileStats?.size > this.logFileMaxSizeBytes;

    if (isFileTooLarge) {
      this.rotateLogFile(
        filePath.includes('error') ? 'errors.log' : 'application.log',
      );
    }

    await appendFile(filePath, message, { encoding: 'utf-8' }).catch((error) =>
      console.error('Failed to append to log file:', error),
    );
  }

  override log(message: any, context?: string): void {
    if (this.logLevel >= 2) {
      context !== undefined ? super.log(message, context) : super.log(message);
      const formattedMsg = `[${this.timeStamp().replace(/-/g, ':')}] [${
        context || 'Context not provided'
      }] ${message}\n`;
      this.appendLogMessage(
        path.join(this.logsFolderPath, this.logFileName),
        formattedMsg,
      );
    }
  }

  override error(message: any, trace?: string, context?: string): void {
    if (this.logLevel >= 0) {
      super.error(message, trace, context);
      const formattedMsg = `[${this.timeStamp().replace(/-/g, ':')}] [ERROR] [${
        context || 'Context not provided'
      }] ${message} - Trace: ${trace || 'Trace not provided'}\n`;
      this.appendLogMessage(
        path.join(this.logsFolderPath, this.errorLogFileName),
        formattedMsg,
      );
    }
  }

  override warn(message: any, context?: string): void {
    if (this.logLevel >= 1) {
      super.warn(message, context);
      const formattedMsg = `[${this.timeStamp().replace(/-/g, ':')}] [WARN] [${
        context || 'Context not provided'
      }] ${message}\n`;
      this.appendLogMessage(
        path.join(this.logsFolderPath, this.logFileName),
        formattedMsg,
      );
    }
  }
}
