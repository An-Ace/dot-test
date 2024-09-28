import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  providers: [AuthService, UsersService, JwtService, PrismaService, AccountsService],
  controllers: [UsersController]
})
export class UsersModule {}
