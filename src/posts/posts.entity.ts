import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: true })
  published: boolean;

  @ManyToOne(() => User, (user: User) => user.posts)
  user: User;
}
