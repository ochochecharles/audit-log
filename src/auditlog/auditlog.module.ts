import { Module } from '@nestjs/common';
import { AuditlogService } from './auditlog.service';
import { AuditLogInterceptor } from './auditlog.interceptor';
import { AuditlogController } from './auditlog.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestController } from './test/test.controller';

@Module({
  providers: [AuditlogService, AuditLogInterceptor, PrismaService,],
  controllers: [AuditlogController, TestController],
})
export class AuditlogModule {}
