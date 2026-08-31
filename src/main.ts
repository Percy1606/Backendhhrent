import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validación global: rechaza campos no declarados en DTOs, transforma tipos automáticamente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // Lanza error si llegan campos extra
      transform: true,           // Transforma tipos (ej. string '1' → number 1)
    }),
  );

  // CORS: permite el dominio del frontend; en desarrollo acepta localhost:3000
  const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim());
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Asegura que la carpeta de archivos subidos exista (fotos y documentos de equipos)
  mkdirSync(join(process.cwd(), 'uploads'), { recursive: true });

  // Sirve los archivos subidos (fotos y documentos de equipos)
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  const port = process.env.PORT || 4001;
  await app.listen(port);
  console.log(`🚀 Backend NestJS escuchando en http://localhost:${port}`);
}
bootstrap();
