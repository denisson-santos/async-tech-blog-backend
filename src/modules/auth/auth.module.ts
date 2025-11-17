import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { USER_REPOSITORY } from './domain/auth.repository.token';
import { PrismaUserRepository } from './repository/prisma-user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    AuthService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
