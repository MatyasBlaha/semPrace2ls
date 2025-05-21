// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaModule } from '../prisma/prisma.module'; // Add this

@Module({
  imports: [PrismaModule], // Add PrismaModule here
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}