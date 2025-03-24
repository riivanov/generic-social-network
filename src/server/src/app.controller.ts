import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/v1/')
export class AppController {
  constructor(private readonly svcApp: AppService) {}

  @Get()
  getHello(): string {
    return this.svcApp.getHello();
  }
}
