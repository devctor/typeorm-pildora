import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { Post } from './posts.entity';
import { User } from '../users/user.entity';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
