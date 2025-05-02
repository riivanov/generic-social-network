import { User } from '@lib/entity/User';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthenticatedUser } from '@lib/models/user.interface';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private svcUser: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(user: User, pass) {
    const match = await bcrypt.compare(pass, user?.password)
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUser(username: string, pass: string) {
    const user = await this.svcUser.findOne(username);
    return this.validate(user, pass)
  }

  async validateUserByEmail(email: string, pass: string) {
    const user = await this.svcUser.findOneByEmail(email);
    return this.validate(user, pass);
  }

  async login(user: User): Promise<Partial<AuthenticatedUser>> {
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
