import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors({
    origin: "*", // Permite solo solicitudes CORS de este origen
    methods: "GET,POST,PUT,DELETE", // Métodos HTTP permitidos
    allowedHeaders: "Content-Type, Authorization", // Encabezados permitidos
  });


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
