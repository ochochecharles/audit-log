import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import goeip from 'geoip-lite';
import { AuditlogService } from './auditlog.service.js';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly auditLogService: AuditlogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ipAddress = request.ip || request.headers['x-forwarded-for'];
    const deviceInfo = request.headers['user-agent'];
    const method = request.method;
    const geo = ipAddress ? goeip.lookup(ipAddress) : null;
    const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown';
    let action: 'CREATE' | 'UPDATE' | 'DELETE' | 'GET' | 'UNKNOWN' = 'UNKNOWN';
    if (method === 'POST') action = 'CREATE';
    if (method === 'PATCH' || method === 'PUT') action = 'UPDATE';
    if (method === 'DELETE') action = 'DELETE';
    if (method === 'GET') action = 'GET';

    return next.handle().pipe(
      tap(async (result) => {
        await this.auditLogService.logAction({
          action,
          entity: 'AuditLog', // since that's my only model
          entityId: result?.id?.toString() || 'N/A',
          beforeState: request.body, // optional
          afterState: result,        // optional
          ipAddress,
          deviceInfo,
          location,
        });
      }),
    );
  }
}