import {Role} from '@prisma/client'

export class MeResponseDto {
    id: string;
    email: string;
    role: Role;
}