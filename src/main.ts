import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global JSON parser
  app.use(bodyParser.json());

  // Raw parser for Stripe webhooks
  app.use('/webhook/stripe', bodyParser.raw({ type: 'application/json' }));

  // ----- Swagger Setup -----
  const config = new DocumentBuilder()
    .setTitle('My API')                // API title
    .setDescription('API documentation for My Project')
    .setVersion('1.0')
    .addBearerAuth()                   // optional: adds Authorization header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  //Swagger UI is served at http://localhost:3000/api-docs
  // -------------------------

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
