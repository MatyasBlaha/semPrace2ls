import { ApiProperty } from '@nestjs/swagger';
import {IsEnum, IsString} from "class-validator";
import {BranchType} from "@prisma/client";

export class CreateBranchDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    location: string;

    @ApiProperty({ enum: BranchType })
    @IsEnum(BranchType)
    type: BranchType;

    @ApiProperty()
    @IsString()
    ownerId: string;
}