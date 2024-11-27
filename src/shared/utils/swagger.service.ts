import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerService {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Título da API')
      .setDescription('[Collection Json](/api-docs-json)')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    const httpAdapter = app.getHttpAdapter();

    if (httpAdapter && httpAdapter.getType() === 'fastify') {
      const fastifyApp = httpAdapter.getInstance();

      fastifyApp.get('/api-docs-json', (request, reply) => {
        reply
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(document);
      });
    } else {
      app.use('/api-docs-json', (req, res) => {
        res.header('Content-Type', 'application/json');
        res.send(document);
      });
    }
  }
}
