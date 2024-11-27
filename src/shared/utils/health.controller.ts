import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as os from 'os';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @HttpCode(HttpStatus.OK)
  @Get()
  async getHealth(): Promise<string> {
    const memoryUsage = process.memoryUsage();
    const totalMemory = os.totalmem();
    const rss = memoryUsage.rss;
    const memoryUsagePercentage = ((rss / totalMemory) * 100).toFixed(2);

    Logger.log(`Server is ok... 
Memory Usage: ${memoryUsagePercentage}%`);

    return `Server is ok...
Memory Usage: ${memoryUsagePercentage}%`;
  }
}
