import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import {PrismaClient} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {Role} from '@prisma/client'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.cookies['access_token'];
        console.log(token)

        if (!token) throw new UnauthorizedException('Missing access token');

        try {
            // Update JwtAuthGuard to fetch user role
            const secret = process.env.SUPABASE_JWT_SECRET;
            if (!secret) throw new Error('Missing SUPABASE_JWT_SECRET');

            const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
            console.log(decoded)
            const prisma = new PrismaClient();
            const userWithRole = await prisma.user.findUnique({
                where: { email: decoded.sub },
                include: { UserRole: true },
            });
            console.log(userWithRole)
            request.user = {
                id: decoded.sub,
                email: decoded.email,
                role: userWithRole?.UserRole?.role ?? Role.USER,
                ...decoded, // other claims if needed
            };
            return true;
        } catch (err) {
            console.error('JWT Verification Error:', err);
            throw new UnauthorizedException('Invalid token');
        }
    }
}