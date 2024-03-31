import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { skipAuth } from './decorators/skipAuth.decorator';
import { UserCredentialsValidationGuard } from './guards/userCredentialsValidationGuard.guard';
import { RefreshTokenAuthGuard } from './guards/RefreshTokenAuth.guard';
import { UserEntity } from 'src/user/entities/user.entity';

interface UserTokens {
  userId: string;
  login: string;
  accessToken: string;
  refreshToken: string;
}
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    login: string;
    password: string;
  };
}

@skipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(UserCredentialsValidationGuard, AuthGuard('local'))
  @Post('login')
  @HttpCode(StatusCodes.OK)
  login(@Req() req: AuthenticatedRequest): Promise<UserTokens> {
    return this.authService.loginUser(req.user);
  }

  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  signup(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Body() updateAuthDto: UpdateAuthDto) {
    return await this.authService.refreshToken(updateAuthDto);
  }
}
