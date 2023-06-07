import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/posts/posts.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[];
}
