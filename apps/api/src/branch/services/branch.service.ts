import {Injectable} from "@nestjs/common";
import {CreateBranchDto} from "../dto/create-branch.dto";
import {BranchRepository} from "../repositories/branch.repository";

@Injectable()
export class BranchService {
    constructor(private branchRepository: BranchRepository) {}

    getAll() {
        return this.branchRepository.findAll();
    }

    getById(id: string){
        return this.branchRepository.findById(id);
    }

    getBranchByOwnerId(ownerId: string){
        return this.branchRepository.findByOwnerId(ownerId)
    }

    async create(dto: CreateBranchDto){
        const {name, location, type, ownerId } = dto

    const branch = await this.branchRepository.create({
        name, location, type, ownerId
    })

        return this.branchRepository.findById(branch.id)
    }
}