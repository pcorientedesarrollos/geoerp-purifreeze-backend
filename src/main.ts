

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Habilitar CORS si tu frontend está en otro dominio
//   // Es mejor hacerlo antes de iniciar el servidor.
//   app.enableCors();

//   // Registrar el ValidationPipe de forma global
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//       transformOptions: {
//         enableImplicitConversion: true,
//       },
//     }),
//   );

//   // Unificar la lógica del puerto y el host en UNA SOLA LLAMADA a listen()
//   const port = process.env.PORT ?? 3000;
//   await app.listen(port, '0.0.0.0');

//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();



// COPIA Y PEGA ESTE CONTENIDO COMPLETO

// COPIA Y PEGA ESTE CONTENIDO COMPLETO

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

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

  // ===================== ¡LÍNEA IMPORTANTE AÑADIDA! =====================
  // Esto activa el interceptor que usará nuestras reglas @Exclude y @Expose
  // para evitar las referencias circulares al convertir a JSON.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // ======================================================================

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();