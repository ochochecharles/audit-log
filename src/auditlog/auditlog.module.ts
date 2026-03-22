import { Module } from '@nestjs/common';
import { AuditlogService } from './auditlog.service';
import { AuditLogInterceptor } from './auditlog.interceptor';
import { AuditlogController } from './auditlog.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaAuditLogRepository } from './adapters/prisma-adapter/prisma-auditlog.repository';
import { AUDIT_LOG_REPOSITORY } from './ORM-core/auditlog.constants.js';

@Module({
  providers: [
    AuditlogService,
    AuditLogInterceptor,
    PrismaService,
    PrismaAuditLogRepository,
    { provide: AUDIT_LOG_REPOSITORY, useClass: PrismaAuditLogRepository }
  ],
  controllers: [AuditlogController],
})
export class AuditlogModule {}
