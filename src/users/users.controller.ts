import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UserService, CreateUserDto, UpdateUserDto } from './users.service';

class UserDto {
  id: number;
  firstName: string;
  email: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.createUser(createUserDto);
    return {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    };
  }

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userService.getUsers();
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    }));
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    const user = await this.userService.getUserById(id);
    return {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    };
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
