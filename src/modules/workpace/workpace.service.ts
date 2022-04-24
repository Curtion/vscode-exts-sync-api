import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto/workpace.dto';
import { UserEntity } from './entity/workpace.entity';
import { Repository } from 'typeorm';
import { md5 } from '@utils/crypto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async register(user: UserDTO) {
    const existUser = await this.getUserByName(user.username);
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.UserRepository.create(user);
    await this.UserRepository.save({
      ...newUser,
      password: md5(newUser.password),
    });
    return {
      message: '注册成功',
      data: {
        username: newUser.username,
      },
    };
  }

  async login(user: UserDTO) {
    const { username, password } = user;
    const userInfo = await this.getUserByName(username);
    if (!userInfo) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (userInfo.password !== md5(password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    return {
      message: '登录成功',
      data: {
        username: userInfo.username,
      },
    };
  }

  async getUserByName(username: string): Promise<UserEntity> {
    return await this.UserRepository.findOne({
      where: { username },
    });
  }
}
