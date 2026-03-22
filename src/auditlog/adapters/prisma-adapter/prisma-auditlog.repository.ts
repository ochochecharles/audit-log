import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { AuditLogRepository, AuditLogEntry } from '../../ORM-core/auditlog.repository.js';

@Injectable()
export class PrismaAuditLogRepository implements AuditLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveLog(log: AuditLogEntry): Promise<void> {
    await this.prisma.auditLog.create({ data: log });
  }
}