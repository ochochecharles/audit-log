import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuditlogService {
    constructor(private readonly prisma: PrismaService) {}

     async logAction(params: {
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'GET' | 'UNKNOWN';
    entity: string;
    entityId: string;
    beforeState?: any;
    afterState?: any;
    ipAddress?: string;
    deviceInfo?: string;
    location?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        beforeState: params.beforeState,
        afterState: params.afterState,
        ipAddress: params.ipAddress,
        deviceInfo: params.deviceInfo,
        location: params.location,
      },
    });
  }
}
