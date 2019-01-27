import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getInt(key: string): number {
    return parseInt(this.envConfig[key], 10);
  }

  getBoolean(key: string): boolean {
    return this.envConfig[key] === 'true';
  }
}
