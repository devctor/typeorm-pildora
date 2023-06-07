import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export class CreateUserDto {
  firstName: string;
  email: string;
}

export class UpdateUserDto {
  firstName: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, email } = createUserDto;
    const newUser = this.userRepository.create({ firstName, email });
    return this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { firstName, email } = updateUserDto;
    const user = await this.getUserById(id);
    user.firstName = firstName;
    user.email = email;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }
}
