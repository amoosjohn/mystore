import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(data: CreateUserInput) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
        status: data.status,
      },
    });
  }

  findAll() {
    return prisma.user.findMany();
  }

  findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: CreateUserInput) {
    return prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}
