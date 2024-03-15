import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity(createUserDto);
    const existingUser = this.db.users.find(
      (user) => user.login === newUser.login,
    );

    if (existingUser) {
      throw new HttpException(
        'User with the same name already exists',
        HttpStatus.CONFLICT,
      );
    }

    // TODO: add "await" when implemented in DB
    this.db.users.push(newUser);
    return newUser;
  }

  async findAllUsers() {
    return this.db.users;
  }

  async findOneUser(id: string) {
    const currentUser = this.db.users.find((user) => user.id === id);
    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return currentUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.findOneUser(id);

    if (currentUser.password !== updateUserDto.oldPassword) {
      throw new HttpException('Old password does not match', 403);
    }

    currentUser.password = updateUserDto.newPassword;
    currentUser.version = currentUser.version + 1;
    currentUser.updatedAt = Date.now();

    return currentUser;
  }

  async removeUser(id: string) {
    const currentUser = await this.findOneUser(id);
    const index = this.db.users.findIndex((u) => u.id === currentUser.id);
    if (index !== -1) {
      this.db.users.splice(index, 1);
    }
  }
}
