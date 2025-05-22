import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreateBranchDto} from "../dto/create-branch.dto";
import {BranchDto} from "../dto/branch.dto";
import {BranchService} from "../services/branch.service";


@ApiTags('Branch')
@Controller('branch')
export class BranchController {

    constructor(private readonly branchService: BranchService) {}


    @Get()
    @ApiOperation({summary: 'Get all Branches'})
    getAll(){
        return this.branchService.getAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get Branch by ID'})
    @ApiParam({name: 'id'})
    getById(@Param('id') id: string){
        return this.branchService.getById(id);
    }

    @Get('/owner/:ownerId')
    @ApiOperation({summary: 'Get All Branches by owner Id'})
    @ApiResponse({type: [BranchDto]})
    @ApiParam({name: 'ownerId'})
    getBranchByOwnerId(@Param('ownerId') ownerId: string){
        return this.branchService.getBranchByOwnerId(ownerId)
    }

    @Post()
    @ApiOperation({summary: 'Create Branch'})
    @ApiResponse({type: BranchDto})
    @ApiBody({type: CreateBranchDto})
    create(@Body() dto: CreateBranchDto) {
        return this.branchService.create(dto)
    }
}