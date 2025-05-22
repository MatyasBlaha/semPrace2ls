import {Module} from "@nestjs/common";
import {PrismaModule} from "../prisma/prisma.module";
import {EmployeeService} from "./services/employee.service";
import {EmployeeRepository} from "./repositories/employee.repository";
import {EmployeeController} from "./controllers/employee.controller";

@Module({
    imports: [PrismaModule],
    providers: [EmployeeService, EmployeeRepository],
    controllers: [EmployeeController],
})
export class EmployeeModule {}