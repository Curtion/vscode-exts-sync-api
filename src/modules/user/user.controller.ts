import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: User): User {
    return this.userService.register(user);
  }
}
