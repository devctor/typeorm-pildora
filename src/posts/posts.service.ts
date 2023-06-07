import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { User } from '../users/user.entity';
import { CreatePostsDto, UpdatePostsDto } from './posts.controller';

@Injectable()
export class PostsService {
    constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPosts(createPostsDto: CreatePostsDto): Promise<Post> {
    const { title, content, userId } = createPostsDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPosts = this.postRepository.create({ title, content, user });
    return this.postRepository.save(newPosts);
  }

  async getPostss(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostsById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Posts not found');
    }
    return post;
  }

  async updatePosts(id: number, updatePostsDto: UpdatePostsDto): Promise<Post> {
    const { title, content } = updatePostsDto;
    const post = await this.getPostsById(id);
    post.title = title;
    post.content = content;
    return this.postRepository.save(post);
  }

  async deletePosts(id: number): Promise<void> {
    const post = await this.getPostsById(id);
    await this.postRepository.remove(post);
  }
}
