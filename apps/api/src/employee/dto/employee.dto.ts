import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { OwnerDto } from '../../owners/dto/owner.dto';
import { BranchDto } from '../../branch/dto/branch.dto';

export class EmployeeDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    ownerId: string;

    @ApiProperty()
    branchId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({ type: () => OwnerDto })
    owner: OwnerDto;

    @ApiProperty({ type: () => BranchDto })
    branch: BranchDto;

    @ApiProperty({ type: () => UserDto })
    user: UserDto;
}