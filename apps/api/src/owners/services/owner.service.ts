import { Injectable } from '@nestjs/common';
import { OwnerRepository } from '../repositories/owner.repository';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import Prisma from '@prisma/client'

@Injectable()
export class OwnerService {
    constructor(private ownerRepository: OwnerRepository) {}

    getAll() {
        return this.ownerRepository.findAll();
    }

    getById(id: string) {
        return this.ownerRepository.findById(id);
    }

    getByUserId(userId: string) {
        return this.ownerRepository.findByUserId(userId);
    }

    async create(dto: CreateOwnerDto) {
        const { name, createdAt, deletedAt, userOwnerId } = dto;

        const description = dto.description ?? '';

        const owner = await this.ownerRepository.create({
            name,
            description,
            createdAt: new Date(createdAt),
            deletedAt: deletedAt ? new Date(deletedAt) : undefined,
        });

        // Validate it's an array before mapping
        if (Array.isArray(userOwnerId)) {
            await Promise.all(
                userOwnerId.map((userId) =>
                    this.ownerRepository.addUserToOwner(userId, owner.id)
                )
            );
        }

        return this.ownerRepository.findById(owner.id);
    }



    delete(id: string) {
        return this.ownerRepository.delete(id);
    }
}