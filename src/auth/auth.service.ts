import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private user: UserService) {}
  performLogin(createAuthDto: CreateAuthDto) {
    return this.user.createUser(createAuthDto);
  }

  performSignup(createAuthDto: CreateAuthDto) {
    return `This action returns  auth`;
  }

  performTokenRefresh(updateAuthDto: UpdateAuthDto) {
    return `This action updates aauth`;
  }
}
