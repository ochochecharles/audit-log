# Audit Log System (NestJS + ORM‑Agnostic)

## Overview
This project implements an audit logging system using NestJS, Prisma, and PostgreSQL.  
It automatically records user/system actions (CREATE, UPDATE, DELETE, GET) with metadata such as IP address, device info, and location.  
The goal is to provide accountability and traceability for application events.

## Features
- NestJS Interceptor for automatic logging of requests
- Prisma ORM with PostgreSQL for structured storage
- Captures:
  - Action type (CREATE, UPDATE, DELETE, GET)
  - Entity and entity ID
  - Before and after state
  - IP address
  - Device info
  - Location (via GeoIP lookup)
  - Timestamp

## Installation
```bash
npm i @ochoche/audit-log
```

## Setup Instructions

### 1. Add the AuditLog model to your Prisma schema
```Prisma
model AuditLog {
  id          String   @id @default(uuid())
  action      String
  entity      String
  entityId    String?
  beforeState Json?
  afterState  Json?
  ipAddress   String?
  deviceInfo  String?
  location    String?
  timestamp   DateTime @default(now())
}
```
#### Run migrations:
```bash
npx prisma migrate dev --name add_audit_log
npx prisma generate
```

### 2. Configure environment variables
Create a .env file with your database connection:
```Env
DATABASE_URL="postgresql://user:password@localhost:5432/auditlogdb"
npm install
```

### 3. Import the module 
In your app.module.ts:
```ts
import { Module } from '@nestjs/common';
import { AuditLogModule } from '@ochoche/audit-log';

@Module({
  imports: [AuditLogModule],
})
export class AppModule {}
```

### 4. Apply the interceptor globally
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditLogInterceptor } from '@ochoche/audit-log';
import { AuditlogService } from '@ochoche/audit-log';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const auditLogService = app.get(AuditlogService);
  app.useGlobalInterceptors(new AuditLogInterceptor(auditLogService));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## Usage
You can also inject the service directly for manual logging:
```ts
import { AuditLogService } from '@ochoche/audit-log';

@Injectable()
export class OrdersService {
  constructor(private readonly auditLogService: AuditLogService) {}

  async updateOrder(orderId: string, data: any) {
    // ... update logic
    await this.auditLogService.createLog({
      action: 'UPDATE',
      entity: 'Order',
      entityId: orderId,
      beforeState: { /* old data */ },
      afterState: { /* new data */ },
      ipAddress: '127.0.0.1',
      deviceInfo: 'Mozilla/5.0',
      location: 'Nigeria',
    });
  }
}
```

## Using Other ORMs
This package is ORM‑agnostic. Prisma is provided as the default adapter, but you can implement your own adapter for TypeORM, Sequelize, MikroORM, or raw SQL.

### Example: TypeORM Adapter
```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogRepository, AuditLogEntry, AUDIT_LOG_REPOSITORY } from '@ochoche/audit-log';
import { AuditLog } from './auditlog.entity';

@Injectable()
export class TypeORMAuditLogRepository implements AuditLogRepository {
  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}

  async saveLog(log: AuditLogEntry): Promise<void> {
    await this.repo.save(log);
  }
}
```

### Bind Your Adapter
```ts
@Module({
  providers: [
    AuditlogService,
    {
      provide: AUDIT_LOG_REPOSITORY,
      useClass: TypeORMAuditLogRepository,
    },
  ],
  exports: [AuditlogService],
})
export class AuditlogModule {}
```

## Summary
	Works out of the box with Prisma.
• 	Fully ORM‑agnostic: you can plug in TypeORM, Sequelize, or any other ORM by implementing the    AuditLogRepository interface.
• 	Provides a NestJS interceptor for automatic logging and a service for manual logging.
### Author
Ochoche




