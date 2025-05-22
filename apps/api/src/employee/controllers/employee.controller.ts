import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {EmployeeDto} from "../dto/employee.dto";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {EmployeeService} from "../services/employee.service";
import {OwnerDto} from "../../owners/dto/owner.dto";


@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    @ApiOperation({ summary: 'Get all Employees' })
    getAll() {
        return this.employeeService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get employee by ID' })
    @ApiParam({ name: 'id' })
    getById(@Param('id') id: string) {
        return this.employeeService.getById(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get all employees by branch' })
    @ApiResponse({ type: [OwnerDto] })
    @ApiParam({ name: 'userId' })
    getByUserId(@Param('userId') userId: string) {
        return this.employeeService.getByUserId(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Create employee' })
    @ApiResponse({ type: EmployeeDto })
    @ApiBody({ type: CreateEmployeeDto })
    create(@Body() dto: CreateEmployeeDto) {
        return this.employeeService.create(dto);
    }

    @Get('owner/:ownerId')
    @ApiOperation({summary: 'Get all employees by Owner ID'})
    @ApiResponse({type: EmployeeDto})
    @ApiParam({name: 'ownerId'})
    getByOwnerId(@Param('ownerId') ownerId: string){
        return this.employeeService.getByOwnerId(ownerId)
    }
}