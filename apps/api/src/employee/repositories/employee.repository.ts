// employee/repositories/employee.repository.ts
import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';

@Injectable()
export class EmployeeRepository {
    constructor(private prisma: PrismaService) {
    }

    findAll() {
        return this.prisma.employee.findMany({
            include: {
                User: true,
                Branch: {
                    include: {
                        owner: true,
                    },
                },
            },
        });
    }

    findById(id: string) {
        return this.prisma.employee.findUnique({
            where: {id},
            include: {
                User: true,
                Branch: {
                    include: {
                        owner: true,
                    },
                },
            },
        });
    }

    findByUserId(userId: string) {
        return this.prisma.employee.findFirst({
            where: {userId},
            include: {
                User: true,
                Branch: {
                    include: {
                        owner: true,
                    },
                },
            },
        });
    }

    create(data: {
        name: string;
        phoneNumber: string;
        email: string;
        userId: string;
        branchId: string;
        ownerId: string
    }) {
        return this.prisma.employee.create({
            data,
            include: {
                User: true,
                Branch: {
                    include: {
                        owner: true,
                    },
                },
            },
        });
    }

    findByOwnerId(ownerId: string) {
        return this.prisma.employee.findMany({
            where: {ownerId},
            include: {
                User: true,
                Branch: {
                    include: {
                        owner: true,
                    },
                },
            },
        });
    }
}