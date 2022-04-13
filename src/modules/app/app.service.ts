import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  register(): object {
    return {
      call: 'Hello World!',
    };
  }
}
