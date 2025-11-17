import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { IAuthRepository } from './domain/auth-repository';
import { USER_REPOSITORY } from './domain/auth.repository.token';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private authRepository: IAuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpAuthDto) {
    const userAlreadyExists = await this.authRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const hash = await bcrypt.hash(data.password, 10);

    const createdUser = await this.authRepository.createUser({
      ...data,
      password: hash,
    });

    if (!createdUser) {
      throw new Error('Erro ao criar usuário');
    }

    const { password, ...result } = createdUser;

    return result;
  }

  async login(data: LoginAuthDto) {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('E-mail not found');
    }

    const comparePassword = await bcrypt.compare(data.password, user.password);

    if (!comparePassword) {
      throw new UnauthorizedException('E-mail or password is not valid');
    }

    const payload = { id: user.id, name: user.firstName };
    const { password, ...result } = user;

    return {
      user: result,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
