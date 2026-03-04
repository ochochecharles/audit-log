import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditLogInterceptor } from './auditlog/auditlog.interceptor';
import { AuditlogService } from './auditlog/auditlog.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const auditLogService = app.get(AuditlogService);
  app.useGlobalInterceptors(new AuditLogInterceptor(auditLogService));
  const config = new DocumentBuilder()
    .setTitle('Test API')
    .setDescription('Backend Testing')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
