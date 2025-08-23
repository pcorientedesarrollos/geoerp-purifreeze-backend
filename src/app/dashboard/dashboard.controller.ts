// RUTA: src/dashboard/dashboard.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats(@Query('month') month?: string, @Query('year') year?: string) {
    const monthNum = month ? parseInt(month, 10) : undefined;
    const yearNum = year ? parseInt(year, 10) : undefined;
    return this.dashboardService.getDashboardStats(monthNum, yearNum);
  }

  @Get('live-locations')
  getLiveLocations() {
    return this.dashboardService.getLiveLocations();
  }
}
