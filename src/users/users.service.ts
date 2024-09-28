import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from './types';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findWithEmail(email: string) {
    const data = await this.prisma.user.findUnique({
      where: { email }, select: { id: true, name: true, picture: true, accounts: { select: { id: true, email: true, provider: true, refreshToken: true, expiredAt: true } } }
    });
    return data;
  }
  async getUsers() {
    try {
      const data = await this.prisma.user.findMany();
      return data;
    } catch (error) {
      throw new HttpException('Error fetching posts', HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(id: number) {
    try {
      const data = await this.prisma.user.findFirst({ where: { id } });
      return data;
    } catch (error) {
      throw new HttpException('Error fetching posts', HttpStatus.BAD_REQUEST);
    }
  }

  async findFirst(options: Prisma.UserFindFirstArgs) {
    try {
      const data = await this.prisma.user.findFirst(options);
      return data;
    } catch (error) {
      throw new HttpException('Error fetching posts', HttpStatus.BAD_REQUEST);
    }
  }

  // POST request to create a new post
  async createUser(user: Prisma.UserUncheckedCreateInput) {
    try {
      return this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      throw new HttpException('Error creating post', HttpStatus.BAD_REQUEST);
    }
  }

  async createUsers(user: User[]) {
    try {
      return this.prisma.user.createMany({
        data: user,
      });
    } catch (error) {
      throw new HttpException('Error creating post', HttpStatus.BAD_REQUEST);
    }
  }

  // PUT request to update a post
  async updateUser(id: number, postData: User) {
    try {
      const { id: userId, ...data } = postData
      return this.prisma.user.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      throw new HttpException('Error updating post', HttpStatus.BAD_REQUEST);
    }
  }

  // PATCH request to partially update a post
  async patchUser(id: number, postData: User) {
    try {
      const { id: userId, ...data } = postData;
      return this.prisma.user.update({
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
  async deleteUser(id: number) {
    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Error deleting post', HttpStatus.BAD_REQUEST);
    }
  }
}
