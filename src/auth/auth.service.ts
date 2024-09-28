import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../accounts/accounts.service';
import { Provider } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private accountsService: AccountsService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.accountsService.findWithEmail(username, "CREDENTIALS");
    if (user && user.password && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const uuid = crypto.randomUUID();
    await this.accountsService.updateAccount(user.id, { refreshToken: uuid, expiredAt: new Date(Date.now() + 2629743 * 1000) })
    const payload = { token: uuid, id: user.user.id, email: email };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '30d', secret: 'secret-key' }),
      refreshToken: uuid,
      picture: user.user.picture,
      name: user.user.name,
    };
  }
  
  async signUp(email: string, name: string, password: string) {
    const isOldUser = await this.accountsService.findWithEmail(email, "CREDENTIALS");
    const uuid = crypto.randomUUID()
    if (!isOldUser?.id) {
      // Create Credential User
      const userCreated = await this.usersService.createUser({
        email, name,
        accounts: {
          create: {
            provider: Provider.CREDENTIALS,
            refreshToken: uuid,
            // 1 month
            expiredAt: new Date(Date.now() + 2629743 * 1000)
          }
        }
      })
      await this.accountsService.updateAccount(userCreated.id, { refreshToken: uuid, expiredAt: new Date(Date.now() + 2629743 * 1000) })
      const payload = { token: uuid, id: userCreated.id, email: email };
      return {
        accessToken: this.jwtService.sign(payload, { expiresIn: '30d', secret: 'secret-key' }),
        refreshToken: uuid,
        picture: userCreated.picture,
        name: userCreated.name,
      };
    }
    // await this.accountsService.updateAccount(isOldUser.user.id, { refreshToken: uuid, expiredAt: new Date(Date.now() + 2629743 * 1000) })
    // const payload = { token: uuid, id: isOldUser.user.id, email: email };
    return {
      // accessToken: this.jwtService.sign(payload, { expiresIn: '30d', secret: 'secret-key' }),
      // refreshToken: uuid,
      // picture: isOldUser.user.picture,
      // name: isOldUser.user.name,
      message: "Email already exists, try with another email"
    };
  }

  googleLogin(req): {
    accessToken: string;
    refreshToken: string;
    picture: string;
    name: string;
  } | null {
    if (!req.user) {
      return null;
    }

    return req.user;
  }

  async refreshToken(refreshToken: string) {
    const account = await this.accountsService.findWithRefreshToken(refreshToken);
    const payload = { id: account?.user.id, email: account?.email };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '30d', secret: 'secret-key' }),
      refreshToken,
      picture: account.user.picture,
      name: account.user.name,
    };
  }
}
