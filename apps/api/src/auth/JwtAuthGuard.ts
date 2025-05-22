// src/auth/JwtAuthGuard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req   = context.switchToHttp().getRequest<Request>();
        const token = req.cookies['access_token'];
        if (!token) throw new UnauthorizedException('Missing access token');

        // 1) Verify & decode the JWT
        let payload: jwt.JwtPayload;
        try {
            payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as jwt.JwtPayload;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        // 2) Make sure `sub` is actually a string
        const userId = payload.sub;
        if (typeof userId !== 'string') {
            throw new UnauthorizedException('Invalid token payload');
        }
        console.log(userId)
        // 3) Now TypeScript knows userId is a string, so Prisma is happy:
        const userWithRole = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { UserRole: true },
        });

        if (!userWithRole) {
            throw new UnauthorizedException('User not found');
        }


        console.log(userWithRole)
        // 4) Attach to request
        req.user = {
            id:    userId,
            email: payload.email!,
            role:  userWithRole.UserRole?.role ?? Role.USER,
            // ...other claims if you like
        };

        return true;
    }
}