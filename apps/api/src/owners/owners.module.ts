import {OwnerService} from "./services/owner.service";
import {OwnerRepository} from "./repositories/owner.repository";
import {OwnersController} from "./controllers/owners.controller";
import {Module} from "@nestjs/common";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [OwnerService, OwnerRepository],
    controllers: [OwnersController],
})
export class OwnersModule {}