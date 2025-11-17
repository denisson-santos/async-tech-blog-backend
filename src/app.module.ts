import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from './modules/prometheus/prometheus.module';
import { PrometheusController } from './modules/prometheus/prometheus.controller';
import { APP_GUARD } from '@nestjs/core';
import { PrometheusService } from './modules/prometheus/prometheus.service';

@Module({
  imports: [
    AuthModule,
    PostModule,
    PrismaModule,
    PrometheusModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 60000,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 20,
        },
      ],
    }),
  ],
  controllers: [AppController, PrometheusController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    PrometheusService,
  ],
})
export class AppModule {}
