import { User } from '@lib/entity/User';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private svcUser: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.svcUser.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserByEmail(email: string, pass: string) {
    const user = await this.svcUser.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    if (await this.validateUserByEmail(user?.email, user?.password)) {
      const payload = {
        email: user.email,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } else throw new UnauthorizedException();
  }
}
