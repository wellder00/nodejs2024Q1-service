import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto });
    return new UserEntity(user);
  }

  async findAllUsers() {
    const allPrismaUsers = await this.prisma.user.findMany();
    const allUsers = allPrismaUsers.map((user) => new UserEntity(user));
    return allUsers;
  }

  async findOneUser(id: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return new UserEntity(currentUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (currentUser.password !== updateUserDto.oldPassword) {
      throw new HttpException('Old password does not match', 403);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: { increment: 1 },
      },
    });

    return new UserEntity(updatedUser);
  }

  async removeUser(id: string) {
    try {
      const deleteUser = await this.prisma.user.delete({
        where: { id },
      });
      return deleteUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
