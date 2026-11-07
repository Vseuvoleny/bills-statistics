import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const corsOrigins = config.get<string>(
    'CORS_ORIGINS',
    'http://localhost:5173',
  );
  app.enableCors({
    origin: corsOrigins.split(','),
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
