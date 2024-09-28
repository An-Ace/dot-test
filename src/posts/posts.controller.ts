import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostData } from './types';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, @Inject(CACHE_MANAGER) private cacheService: Cache,) {}

  @Get('json')
  async getJsonApi() {
    const cachedData = await this.cacheService.get('json_api_cache');
    if (cachedData) {
      // console.log("Cached Data:", cachedData)
      return cachedData
    }
    // Jika tidak ada, proses data baru dan simpan ke cache
    // console.log("New Data:", cachedData)
    const newData = await this.postsService.getJson();
    await this.cacheService.set('json_api_cache', newData, 3600 * 1000);
    return newData;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts() {
    const cachedData = await this.cacheService.get('db_posts_cache');
    if (cachedData) {
      // console.log("Cached Data:", cachedData)
      return cachedData
    }
    // Jika tidak ada, proses data baru dan simpan ke cache
    // console.log("New Data:", cachedData)
    const newData = await this.postsService.getPosts();
    await this.cacheService.set('db_posts_cache', newData, 3600 * 1000);
    return newData;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() postData: PostData) {
    await this.cacheService.del('db_posts_cache');
    return this.postsService.createPost(postData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('many')
  async createPosts(@Body() postData: PostData[]) {
    await this.cacheService.del('db_posts_cache');
    return this.postsService.createPosts(postData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() postData: PostData) {
    await this.cacheService.del('db_posts_cache');
    return this.postsService.updatePost(Number(id), postData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchPost(@Param('id') id: string, @Body() postData: PostData) {
    await this.cacheService.del('db_posts_cache');
    return this.postsService.patchPost(Number(id), postData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':ids/many')
  async updatePosts(@Param('ids') ids: string, @Body() postData: PostData) {
    await this.cacheService.del('db_posts_cache');
    return this.postsService.updatePosts(JSON.parse(ids), postData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':ids/many')
  async patchPosts(@Param('ids') ids: string, @Body() postData: PostData) {
    await this.cacheService.del('db_posts_cache');
    return this.postsService.patchPosts(JSON.parse(ids), postData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.cacheService.del('db_posts_cache');
    return this.postsService.deletePost(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':ids/many')
  async deletePosts(@Param('ids') ids: string) {
    await this.cacheService.del('db_posts_cache');
    return this.postsService.deletePosts(JSON.parse(ids));
  }
}
