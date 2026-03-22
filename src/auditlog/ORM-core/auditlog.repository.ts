// src/auditlog/core/auditlog.repository.ts

export interface AuditLogRepository {
    saveLog(log: AuditLogEntry): Promise<void>;
}

export interface AuditLogEntry {
    action: string;       // e.g. "CREATE", "UPDATE", "DELETE"
    entity: string;       // e.g. "User", "Order"
    entityId?: string;    // optional ID of the entity
    beforeState?: any;    // snapshot before change
    afterState?: any;     // snapshot after change
    ipAddress?: string;   // request IP
    deviceInfo?: string;  // user-agent or device details
    location?: string;    // optional geo info
    timestamp: Date;      // when the action happened
}