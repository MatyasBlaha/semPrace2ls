import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from "../repositories/employee.repository";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import Prisma from '@prisma/client'

@Injectable()
export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    getAll() {
        return this.employeeRepository.findAll();
    }

    getById(id: string) {
        return this.employeeRepository.findById(id);
    }

    getByUserId(userId: string) {
        return this.employeeRepository.findByUserId(userId);
    }

    async create(dto: CreateEmployeeDto) {
        const { name, phoneNumber, email, userId, branchId } = dto;

        const employee = await this.employeeRepository.create({
            name,
            phoneNumber,
            email,
            userId,
            branchId,
        });

        return this.employeeRepository.findById(employee.id);
    }
}