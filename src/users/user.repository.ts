// user.repository.ts
// import { Repository } from 'typeorm';
// import { User } from './user.entity';

// export class UserRepository extends Repository<User> {
//   // Custom repository methods can be added here
//   async findByName(name: string): Promise<User[]> {
//     return this.createQueryBuilder('user')
//       .where('user.firstName = :name', { name })
//       .getMany();
//   }
// }
