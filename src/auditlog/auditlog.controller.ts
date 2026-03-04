import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditlogService } from './auditlog.service.js';

@Controller('auditlog')
export class AuditlogController {
    constructor(
    private readonly auditLogService: AuditlogService,
    private readonly prisma: PrismaService,
  ) {}

  // Create a log manually (for testing)
  @Post()
  async createLog(@Body() body: any) {
    return body; 
  }

  // Fetch all logs
  @Get()
  async getLogs() {
    return this.prisma.auditLog.findMany({
      orderBy: { timestamp: 'desc' },
    });
  }

}
