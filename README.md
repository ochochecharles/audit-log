# Audit Log System (NestJS + Prisma + PostgreSQL)

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

## Tech Stack
- NestJS (framework)
- Prisma (ORM)
- PostgreSQL (database)
- GeoIP-lite (location lookup)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/audit-log-system.git
cd audit-log-system

### 2. Install dependencies
npm install


### 3. Configure environment variables
Create a .env file:
DATABASE_URL="postgresql://user:password@localhost:5432/auditlogdb"

### 4. Run migrations
npx prisma migrate dev --name init


###5. Generate Prisma client
npx prisma generate


### 6. Start the server
npm run start:dev

Author
Ochoche




