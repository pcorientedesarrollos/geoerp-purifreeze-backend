// RUTA COMPLETA: src/main.ts (Versión Final y Correcta)

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS, permitiendo que tu frontend en localhost:4200 (o cualquier otro)
  // pueda hacer peticiones a este backend.
  app.enableCors();

  // Configura la validación global para los DTOs.
  // Esto asegura que los datos que llegan a tus controladores cumplan las reglas.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Activa el interceptor global para la serialización.
  // Esencial para que decoradores como @Exclude en tus entidades funcionen.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Inicia el servidor.
  const port = process.env.PORT ?? 3000;
  await app.listen(port); // Simplificado para desarrollo local

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
