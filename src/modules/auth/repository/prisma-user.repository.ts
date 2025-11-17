import { PrismaService } from 'src/prisma/prisma.service';
import { IAuthRepository } from '../domain/auth-repository';
import { UserEntity } from '../domain/user-entity';
import { SignUpAuthDto } from '../dto/signup-auth.dto';
import { Role } from 'src/enums/role';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements IAuthRepository {
  constructor(private prismaService: PrismaService) {}
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findFirst({
      where: { email: email },
    });

    if (!user) return null;

    return new UserEntity(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.avatarUrl,
      user.bannerUrl,
      user.bio,
      user.role as Role,
      user.isActive,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  async createUser(data: SignUpAuthDto): Promise<UserEntity | null> {
    const createdUser = await this.prismaService.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        avatarUrl: data.avatarUrl,
        bannerUrl: data.bannerUrl,
        bio: data.bio
      },
    });

    if (!createdUser) return null;

    return new UserEntity(
      createdUser.id,
      createdUser.firstName,
      createdUser.lastName,
      createdUser.email,
      createdUser.password,
      createdUser.avatarUrl,
      createdUser.bannerUrl,
      createdUser.bio,
      createdUser.role as Role,
      createdUser.isActive,
      createdUser.createdAt,
      createdUser.updatedAt,
      createdUser.deletedAt,
    );
  }
}
