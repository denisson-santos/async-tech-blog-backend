import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { AuthGuard } from 'src/guards/auth.guard';
import type { Response } from 'express';

@Controller('metrics')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getMetrics(@Res() res: Response) {
    const metrics = await this.prometheusService.getMetrics();
    res.setHeader('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
