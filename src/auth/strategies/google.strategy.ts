import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import axios from 'axios';
import { UsersService } from 'src/users/users.service';
import { Provider } from '@prisma/client';
import { AccountsService } from 'src/accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UsersService, private accountService: AccountsService, private jwtService: JwtService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: CallbackProfile, done: VerifyCallback): Promise<any> {
    try {
      const { name, emails, photos } = profile;
      // validate accessToken
      const googleValidateURL = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token"
      const validateUser: CallbackValidation = (await axios.get(`${googleValidateURL}=${accessToken}`)).data
      const isOldUser = await this.userService.findWithEmail(validateUser.email)
      const uuid = crypto.randomUUID()
      if (!isOldUser?.id) {
        // Create New User
        this.userService.createUser({
          email: validateUser.email,
          name: `${name.givenName} ${name.familyName}`,
          picture: photos[0].value,
          accounts: {
            create: {
              provider: Provider.GOOGLE,
              refreshToken: uuid,
              expiredAt: new Date(Date.now() + validateUser.expires_in * 1000)
            }
          }
        })
      } else if (!isOldUser.accounts.find(account => account.provider === Provider.GOOGLE)) {
        // Add Google Account to Old User
        this.accountService.createAccount({
          email: validateUser.email,
          provider: Provider.GOOGLE,
          refreshToken: uuid,
          expiredAt: new Date(Date.now() + 2629743 * 1000)
        })
      } else if (isOldUser.accounts.find(account => account.provider === Provider.GOOGLE)) {
        // Update refresh Token Account 
        this.accountService.updateAccount(isOldUser.accounts.find(account => account.provider === Provider.GOOGLE).id, { refreshToken: uuid, expiredAt: new Date(Date.now() + 2629743 * 1000) })
      }
      // const payload = { token: uuid, id: isOldUser.id, email: validateUser.email };
      done(null, {
        // accessToken: this.jwtService.sign(payload, { expiresIn: '30d', secret: 'secret-key' }),
        refreshToken: uuid,
        // picture: isOldUser.picture,
        // name: isOldUser.name,
      });
    } catch (error) {
      console.log(error)
      done(null, null);
    }
  }
}

interface CallbackValidation {
  issued_to: string,
  audience: string,
  user_id: string,
  scope: string,
  expires_in: number,
  email: string,
  verified_email: boolean,
  access_type: string
}

interface CallbackProfile {
  id:          string;
  displayName: string;
  name:        {
    familyName: string;
    givenName:  string;
  };
  emails:      {
    value:    string;
    verified: boolean;
  }[];
  photos:      {
    value: string;
  }[];
  provider:    string;
  _raw:        string;
  _json: {
    sub:            string;
    name:           string;
    given_name:     string;
    family_name:    string;
    picture:        string;
    email:          string;
    email_verified: boolean;
  };
}