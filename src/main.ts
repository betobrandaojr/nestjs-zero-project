import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentLoaderService } from './shared/utils/environment-load.service';
import { Logger } from '@nestjs/common';
import { SwaggerService } from './shared/utils/swagger.service';
import * as dotenv from 'dotenv';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  const environmentLoaderService = app.get(EnvironmentLoaderService);
  const port = environmentLoaderService.getPort();

  const globalPrefix = process.env.GLOBAL_PREFIX || '';

  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix, {
      exclude: ['/docs'],
    });
  }

  SwaggerService.setup(app);

  try {
    await app.listen({ port, host: 'localhost' });
    const address = await app.getUrl();

    const apiUrl = globalPrefix ? `${address}/${globalPrefix}` : address;

    Logger.log(
      `## Application is running on: ${apiUrl} in profile: ${process.env.NODE_ENV} ##`,
    );
    Logger.log(
      'Swagger API documentation is available at ' + address + '/docs',
    );
  } catch (err) {
    Logger.error(err);
    process.exit(1);
  }
}
bootstrap();
