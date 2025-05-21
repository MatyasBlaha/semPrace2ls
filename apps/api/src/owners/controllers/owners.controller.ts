import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {OwnerService} from "../services/owner.service";
import {CreateOwnerDto} from "../dto/create-owner.dto";
import {OwnerDto} from "../dto/owner.dto";


@ApiTags('Owners')
@Controller('owners')
export class OwnersController {

    constructor(private readonly ownerService: OwnerService) {}

    @Get()
    @ApiOperation({ summary: 'Get all Owners' })
    getAll() {
        return this.ownerService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Owner by ID' })
    @ApiParam({ name: 'id' })
    getById(@Param('id') id: string) {
        return this.ownerService.getById(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get all Owners where user is a member' })
    @ApiResponse({ type: [OwnerDto] })
    @ApiParam({ name: 'userId' })
    getByUserId(@Param('userId') userId: string) {
        return this.ownerService.getByUserId(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Create Owner' })
    @ApiResponse({ type: OwnerDto })
    @ApiBody({ type: CreateOwnerDto })
    create(@Body() dto: CreateOwnerDto) {
        return this.ownerService.create(dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Owner by ID' })
    delete(@Param('id') id: string) {
        return this.ownerService.delete(id);
    }
}