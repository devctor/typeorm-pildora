import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';

export class PostsDto {
  id: number;
  title: string;
  content: string;
  userId?: number;
}
export class CreatePostsDto {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export class UpdatePostsDto {
  id: number;
  title: string;
  content: string;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  async createPosts(@Body() createPostsDto: CreatePostsDto): Promise<PostsDto> {
    const post = await this.postService.createPosts(createPostsDto);
    return {
      id: post.id,
      title: post.title,
      content: post.content,
    };
  }

  @Get()
  async getAllPostss(): Promise<PostsDto[]> {
    const posts = await this.postService.getPostss();
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
    }));
  }

  @Get(':id')
  async getPostsById(@Param('id') id: number): Promise<PostsDto> {
    const post = await this.postService.getPostsById(id);
    return {
      id: post.id,
      title: post.title,
      content: post.content,
    };
  }

  @Put(':id')
  async updatePosts(@Param('id') id: number, @Body() updatePostsDto: UpdatePostsDto): Promise<PostsDto> {
    const post = await this.postService.updatePosts(id, updatePostsDto);
    return {
      id: post.id,
      title: post.title,
      content: post.content,
    };
  }

  @Delete(':id')
  async deletePosts(@Param('id') id: number): Promise<void> {
    await this.postService.deletePosts(id);
  }
}
