import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(protected svcConfig: ConfigService) {
    const msg = svcConfig.get<string>('PORT');
    console.log(msg)
  }
}
