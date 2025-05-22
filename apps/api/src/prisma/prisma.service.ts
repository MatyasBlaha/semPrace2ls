// src/prisma/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL!,   // ← only the connection string
                },
            },
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app: INestApplication) {
        // @ts-ignore
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}