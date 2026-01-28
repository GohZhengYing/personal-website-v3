import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Body size limits (good for image uploads, base64, etc.)
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

  // CORS
  app.enableCors({
  origin: (origin, callback) => {
    console.log('CORS check, origin:', origin); // debug

    // allow non-browser clients (Postman, curl)
    if (!origin) return callback(null, true);

    // simple check: allow your frontend domain (including www)
    if (
      origin.startsWith('https://gohzhengying.netlify.app') ||
      origin === process.env.FRONTEND_URL
    ) {
      return callback(null, true);
    }

    console.warn('CORS blocked for origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

  const port = process.env.PORT || 3000;

  // IMPORTANT: listen on 0.0.0.0 for cloud providers
  await app.listen(port, '0.0.0.0');
}
bootstrap();
