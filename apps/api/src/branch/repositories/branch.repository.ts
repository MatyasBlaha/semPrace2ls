// src/branches/branch.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BranchType } from '@prisma/client';

@Injectable()
export class BranchRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: string) {
        return this.prisma.branch.findUnique({
            where: { id },
            include: {
                owner: {
                    include: {
                        userOwners: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.branch.findMany({
            include: {
                owner: true,
            },
        });
    }

    findByOwnerId(ownerId: string){
        return this.prisma.branch.findMany({
            where: {
                ownerId
            },
            include: {
                owner: true,
            }
        })
    }

    async create(data: {
        name: string;
        location: string;
        type: BranchType;
        ownerId: string;
    }) {
        return this.prisma.branch.create({
            data,
        });
    }
}