import { ApiProperty } from '@nestjs/swagger';
import {IsString} from "class-validator";

export class UserDto {
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty({ required: false })
    name?: string;

    @IsString()
    @ApiProperty()
    createdAt: string;

    @IsString()
    @ApiProperty()
    deletedAt: string;
}