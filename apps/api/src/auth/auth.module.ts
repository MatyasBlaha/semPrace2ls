import {Global, Module} from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import {JwtAuthGuard} from "./JwtAuthGuard";
import {PrismaModule} from "../prisma/prisma.module";

@Global()
@Module({
  imports: [PrismaModule], // Add this line
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
})
export class AuthModule {}