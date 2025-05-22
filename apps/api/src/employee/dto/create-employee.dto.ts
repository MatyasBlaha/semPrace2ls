import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
    @IsString()
    name: string;

    @IsString()
    phoneNumber: string;

    @IsEmail()
    email: string;

    @IsUUID()
    userId: string;

    @IsUUID()
    branchId: string;

    @IsUUID()
    ownerId: string;
}