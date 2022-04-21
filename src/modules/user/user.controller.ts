import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: UserDTO) {
    return this.userService.register(user);
  }

  @Post('login')
  login(@Body() user: UserDTO) {
    return this.userService.login(user);
  }
}
