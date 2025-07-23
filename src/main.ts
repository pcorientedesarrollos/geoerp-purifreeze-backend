
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- INICIO DE LA MODIFICACIÓN ---

  // Registrar el ValidationPipe de forma global
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true -> Elimina automáticamente las propiedades que no están en el DTO.
      whitelist: true,

      // forbidNonWhitelisted: true -> Lanza un error si se envían propiedades no deseadas.
      forbidNonWhitelisted: true,

      // transform: true -> Transforma los datos de entrada a sus tipos de DTO (ej. string a number).
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000, '0.0.0.0');
  // --- FIN DE LA MODIFICACIÓN ---

  // Habilitar CORS si tu frontend está en otro dominio
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();