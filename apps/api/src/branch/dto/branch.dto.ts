import { ApiProperty } from '@nestjs/swagger';

export class BranchDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    location: string;

    @ApiProperty({ enum: ['OFFICCE', 'MARKET'] })
    type: 'OFFICCE' | 'MARKET';
}   