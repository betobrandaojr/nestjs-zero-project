import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentLoaderService {
  constructor(private readonly configService: ConfigService) {
    this.validateEnvVariables();
  }

  private validateEnvVariables(): void {
    const requiredVariables = [
      'PORT', //Start port
    ];
    requiredVariables.forEach((variable) => {
      const value = this.configService.get(variable);
      if (!value) {
        throw new Error(`Missing environment variable: ${variable}`);
      }
    });
    Logger.log(`## environment variables louders ##`);
  }

  public getEnvVariable(key: string): string {
    return this.configService.get<string>(key);
  }

  public getPort(): number {
    return this.configService.get<number>('PORT') || 3000;
  }
}
