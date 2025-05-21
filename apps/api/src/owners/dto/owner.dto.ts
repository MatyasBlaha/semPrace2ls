import { ApiProperty } from '@nestjs/swagger';
import {UserDto} from "../../users/dto/user.dto";

export class OwnerDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ type: () => [UserDto], required: false })
    users?: UserDto[];
}