import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';

@Injectable()
export class UserService {
  register(user: User) {
    console.log(user);
    return user;
  }
}
