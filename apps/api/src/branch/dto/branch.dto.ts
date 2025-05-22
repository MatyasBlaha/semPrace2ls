import { ApiProperty } from '@nestjs/swagger';
import { BranchType } from '@prisma/client';
import {OwnerDto} from "../../owners/dto/owner.dto";

export class BranchDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    location: string;

    @ApiProperty({ enum: BranchType })
    type: BranchType;

    @ApiProperty()
    ownerId: string;

    @ApiProperty({ type: () => OwnerDto })
    owner: OwnerDto;
}