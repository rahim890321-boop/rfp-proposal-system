import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(appModule);

  // Requirement: Swagger UI must be accessible at /api/docs
  const config = new DocumentBuilder()
    .setTitle('RFP Proposal System')
    .setDescription('The RFP Backend API documentation')
    .setVersion('1.0')
    .addTag('proposals')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
