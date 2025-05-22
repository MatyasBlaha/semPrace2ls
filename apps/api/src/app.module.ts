import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {DatabaseService} from './database.service';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {PrismaModule} from './prisma/prisma.module';
import {OwnersModule} from "./owners/owners.module";
import {resolve} from 'path'
import {BranchModule} from "./branch/branch.module";
import {EmployeeModule} from "./employee/employee.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: resolve(__dirname, '../.env')
        }),
        PrismaModule,
        AuthModule,
        UsersModule,
        OwnersModule,
        BranchModule,
        EmployeeModule
    ],
    providers: [DatabaseService]
})

export class AppModule {
}