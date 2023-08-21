import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { appendFile } from 'fs/promises';
import { rotate } from 'src/utils';

const { MAX_FILE_SIZE } = process.env;
const max = +MAX_FILE_SIZE;

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: string) {
    this.writeToFile('📢 ' + message);
  }

  error(message: string, trace: string) {
    this.writeErrors('❌ ' + message);
    this.writeErrors('🔍 Stack Trace: ' + trace);
  }

  warn(message: string) {
    this.writeErrors('⚠️ ' + message);
  }

  debug(message: string) {
    this.writeToFile('🐞 ' + message);
  }
  private async writeToFile(message: string) {
    try {
      process.stdout.write(message);
      await appendFile('logs.log', `${message}\n`);
      await rotate('logs.log', max);
    } catch (error) {
      throw new InternalServerErrorException("File didn't write");
    }
  }
  private async writeErrors(message: string) {
    try {
      process.stderr.write(message);
      await appendFile('errors.log', `${message}\n`);
      await rotate('errors.log', max);
    } catch (error) {
      throw new InternalServerErrorException("File didn't write");
    }
  }
}
