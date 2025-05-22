import {Module} from "@nestjs/common";
import {PrismaModule} from "../prisma/prisma.module";
import {BranchService} from "./services/branch.service";
import {BranchRepository} from "./repositories/branch.repository";
import {BranchController} from "./controllers/branch.controller";

@Module({
    imports: [PrismaModule],
    providers: [BranchService, BranchRepository],
    controllers: [BranchController]
})

export class BranchModule {}