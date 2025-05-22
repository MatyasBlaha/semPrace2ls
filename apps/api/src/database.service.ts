// src/database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: Client;

  constructor() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        // ← allow self-signed certs
        rejectUnauthorized: false,
      },
    });
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('✅ Connected to Supabase PostgreSQL');
  }

  getClient(): Client {
    return this.client;
  }
}