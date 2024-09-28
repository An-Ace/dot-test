import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Account } from './types';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findWithEmail(email: string, provider: "GOOGLE" | "CREDENTIALS") {
    const data = await this.prisma.account.findFirst({
      where: { email, provider }, include: { user: { select: { id: true, name: true, picture: true } }}
    });
    return data;
  }

  async findWithRefreshToken(refreshToken: string) {
    const data = await this.prisma.account.findUnique({ where: { refreshToken }, include: { user: { select: { id: true, name: true, picture: true } }} });
    return data;
  }
  async getAccounts() {
    try {
      const data = await this.prisma.account.findMany();
      return data;
    } catch (error) {
      throw new HttpException('Error fetching posts', HttpStatus.BAD_REQUEST);
    }
  }

  async getAccount(id: number) {
    try {
      const data = await this.prisma.account.findFirst({ where: { id } });
      return data;
    } catch (error) {
      throw new HttpException('Error fetching posts', HttpStatus.BAD_REQUEST);
    }
  }

  // POST request to create a new post
  async createAccount(account: Prisma.AccountUncheckedCreateInput) {
    try {
      return this.prisma.account.create({
        data: account,
      });
    } catch (error) {
      throw new HttpException('Error creating post', HttpStatus.BAD_REQUEST);
    }
  }

  async createAccounts(accounts: Account[]) {
    try {
      return this.prisma.account.createMany({
        data: accounts,
      });
    } catch (error) {
      throw new HttpException('Error creating post', HttpStatus.BAD_REQUEST);
    }
  }

  // PUT request to update a post
  async updateAccount(id: number, accountData: Prisma.AccountUncheckedUpdateInput) {
    try {
      const { id: accountId, ...data } = accountData
      return this.prisma.account.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      throw new HttpException('Error updating post', HttpStatus.BAD_REQUEST);
    }
  }

  // PATCH request to partially update a post
  async patchAccount(id: number, postData: Account) {
    try {
      const { id, ...data } = postData;
      return this.prisma.account.update({
        where: { id },
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw new HttpException('Error patching post', HttpStatus.BAD_REQUEST);
    }
  }

  // DELETE request to delete a post
  async deleteAccount(id: number) {
    try {
      return this.prisma.account.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Error deleting post', HttpStatus.BAD_REQUEST);
    }
  }
}
