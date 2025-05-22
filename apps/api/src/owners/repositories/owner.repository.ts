// owner/repositories/owner.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {Prisma} from '@prisma/client'

@Injectable()
export class OwnerRepository {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.owner.findMany({
            include: {
                Branches: {
                    include: {
                        Employees: true
                    }
                }
            }
        });
    }

    async addUserToOwner(userId: string, ownerId: string) {
        return this.prisma.userOwner.create({
            data: {
                userId,
                ownerId,
            },
        });
    }

    findById(id: string) {
        return this.prisma.owner.findUnique({
            where: { id },
            include: {
                Branches: {
                    include: {
                        Employees: true
                    }
                }
            }
        });
    }

    findByUserId(userId: string) {
        return this.prisma.owner.findMany({
            where: {
                userOwners: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                Branches: {
                    include: {
                        Employees: true
                    }
                }
            }
        });
    }

    create(data: {
        name: string;
        description: string; // vždy string
        createdAt: Date;
        deletedAt?: Date;
    }) {
        return this.prisma.owner.create({
            data,
            include: {
                userOwners: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    delete(id: string) {
        return this.prisma.owner.delete({ where: { id } });
    }
}