import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // Permite solicitudes desde Next.js (port 3000)

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
