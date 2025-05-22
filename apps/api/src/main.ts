// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';           // <-- import this
import * as yaml from 'yaml';
import cookieParser from 'cookie-parser';    // <-- import cookieParser
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from "fs";

async function bootstrap() {
  // 1) Load your cert/key
  const httpsOptions = {
    key:  readFileSync('localhost-key.pem'),
    cert: readFileSync('localhost-cert.pem'),
  };

  // 2) Create the Nest app over HTTPS
  const app = await NestFactory.create(AppModule, { httpsOptions });

  // 3) Register cookie-parser middleware
  app.use(cookieParser());    // <-- correct method

  // 4) CORS for your Next.js frontend
  app.enableCors({
    origin: [ 'http://localhost:3000', 'https://localhost:3000' ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [ 'Content-Type','Authorization','Accept','Cookie' ],
  });

  // 5) Swagger setup (unchanged)
  const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('Auto-generated API docs')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./openapi.yaml', yaml.stringify(document))
  SwaggerModule.setup('api-docs', app, document);

  // 6) Start the server
  await app.listen(3001);
}
bootstrap();