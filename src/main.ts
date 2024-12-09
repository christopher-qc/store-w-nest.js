import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Se usa ValidationPipe globalmente para todas las solicitudes entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: Elimina las propiedades que no están definidas en el DTO (Data Transfer Object).
      // Esto asegura que solo los datos que se definieron en el DTO sean permitidos en el cuerpo de la solicitud.
      whitelist: true,

      // forbidNonWhitelisted: Si se establece en `true`, genera un error (HTTP 400 Bad Request) cuando
      // se reciben propiedades no permitidas (que no están en el DTO).
      // Si `whitelist` está activado, pero `forbidNonWhitelisted` está desactivado, simplemente las propiedades no permitidas se eliminarían sin generar un error.
      forbidNonWhitelisted: true,

      transform: true,
    }),
  );

  // AGREGAR DOCUMENTACION CON SWAGGER

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('CHRIS STORE')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  // Inicia el servidor en el puerto especificado en el entorno, o en el puerto 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
