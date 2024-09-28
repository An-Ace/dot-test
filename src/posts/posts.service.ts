import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import { Post } from './types';

@Injectable()
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private prisma: PrismaService) {}

  // GET request to fetch all posts
  async getJson() {
    try {
      const { data } = await axios.get(this.apiUrl);
      return data;
    } catch (error) {
      throw new HttpException('Error fetching posts', HttpStatus.BAD_REQUEST);
    }
  }

  async getPosts() {
    try {
      const data = await this.prisma.post.findMany({ orderBy: { id: 'desc' } });
      return data;
    } catch (error) {
      throw new HttpException('Error fetching posts', HttpStatus.BAD_REQUEST);
    }
  }

  async getPost(id: number) {
    try {
      const data = await this.prisma.post.findFirst({ where: { id } });
      return data;
    } catch (error) {
      throw new HttpException('Error fetching posts', HttpStatus.BAD_REQUEST);
    }
  }

  // POST request to create a new post
  async createPost(postData: Post) {
    try {
      return this.prisma.post.create({
        data: postData,
      });
    } catch (error) {
      throw new HttpException('Error creating post', HttpStatus.BAD_REQUEST);
    }
  }

  async createPosts(postsData: Post[]) {
    try {
      const postsDataChunks = [];
      for (let i = 0; i < postsData.length; i += 20) {
        postsDataChunks.push(postsData.slice(i, i + 20));
      }

      postsDataChunks.forEach(async (postsDataChunk) => {
        const data = postsDataChunk.map(item => ({ userId: item.userId, title: item.title, body: item.body }) )
        await this.prisma.post.createMany({
          data
        });
      })

      return { message: 'Posts created successfully' };

    } catch (error) {
      throw new HttpException('Error creating post', HttpStatus.BAD_REQUEST);
    }
  }

  // PUT request to update a post
  async updatePost(id: number, postData: Post) {
    try {
      const { id: postId, ...data } = postData
      return this.prisma.post.update({
        where: { id },
        data: {
          userId: data.userId,
          title: data.title || "",
          body: data.body || ""
        },
      });
    } catch (error) {
      throw new HttpException('Error updating post', HttpStatus.BAD_REQUEST);
    }
  }

  // PATCH request to partially update a post
  async patchPost(id: number, postData: Post) {
    try {
      const { id: postId, ...data } = postData;
      return this.prisma.post.update({
        where: { id },
        data: {
          userId: postData.userId || undefined,
          title: postData.title || undefined,
          body: postData.body || undefined
        },
      });
    } catch (error) {
      throw new HttpException('Error patching post', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePosts(ids: number[], postData: Post) {
    try {
      const { id: postId, ...data } = postData
      await this.prisma.post.updateMany({
        where: { id: { in: ids } },
        data: {
          userId: data.userId,
          title: data.title || "",
          body: data.body || ""
        },
      })
      return ids.map(id => ({ id, ...{ userId: data.userId, title: data.title || "", body: data.body || "" } }));
    } catch (error) {
      throw new HttpException('Error updating post', HttpStatus.BAD_REQUEST);
    }
  }

  // PATCH request to partially update a post
  async patchPosts(ids: number[], postData: Post) {
    try {
      const { id: postId, ...data } = postData;
      await this.prisma.post.updateMany({
        where: { id: { in: ids } },
        data: {
          userId: data.userId || undefined,
          title: data.title || undefined,
          body: data.body || undefined
        },
      })
      return ids.map(id => ({ id, ...{ userId: data.userId || undefined, title: data.title || undefined, body: data.body || undefined } }));
    } catch (error) {
      throw new HttpException('Error patching post', HttpStatus.BAD_REQUEST);
    }
  }

  // DELETE request to delete a post
  async deletePost(id: number) {
    try {
      return this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Error deleting post', HttpStatus.BAD_REQUEST);
    }
  }

  async deletePosts(ids: number[]) {
    try {
      return this.prisma.post.deleteMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      throw new HttpException('Error deleting post', HttpStatus.BAD_REQUEST);
    }
  }
}
