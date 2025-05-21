import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  getById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}