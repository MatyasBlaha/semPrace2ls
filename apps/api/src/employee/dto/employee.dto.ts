import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import {BranchDto} from "../../branch/dto/branch.dto";
import {OwnerDto} from "../../owners/dto/owner.dto";

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
    branchId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    ownerId: string;

    @ApiProperty({ type: () => BranchDto })
    branch: BranchDto;

    @ApiProperty({ type: () => UserDto })
    user: UserDto;

    @ApiProperty({ type: () => OwnerDto })
    owner: OwnerDto;
}