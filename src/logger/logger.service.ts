import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { appendFile } from 'fs/promises';
//import { write } from 'src/utils';

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
    } catch (error) {
      throw new InternalServerErrorException('Something wrong with write logs to file');
    }
  }
  private async writeErrors(message: string) {
    try {
      process.stderr.write(message);
      await appendFile('errors.log', `${message}\n`);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong with write logs to file');
    }
  }
}
