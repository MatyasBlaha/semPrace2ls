import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateOwnerDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    createdAt: string;

    @IsOptional()
    @IsString()
    deletedAt?: string;

    @IsArray()
    @IsString({ each: true })
    userOwnerId: string[];
}