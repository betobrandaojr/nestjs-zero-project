import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentLoaderService } from './shared/utils/environment-load.service';
import { HealthController } from './shared/utils/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
  controllers: [HealthController],
  providers: [EnvironmentLoaderService],
  exports: [EnvironmentLoaderService],
})
export class AppModule {}
