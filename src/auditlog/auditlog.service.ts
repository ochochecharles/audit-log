import { Injectable, Inject } from '@nestjs/common';
import type { AuditLogEntry, AuditLogRepository } from './ORM-core/auditlog.repository.js';
import { AUDIT_LOG_REPOSITORY } from './ORM-core/auditlog.constants.js';

@Injectable()
export class AuditlogService {
  constructor(@Inject(AUDIT_LOG_REPOSITORY)private readonly repo: AuditLogRepository) {}

  async logAction(params: AuditLogEntry): Promise<void> {
    await this.repo.saveLog(params);
  }
}


