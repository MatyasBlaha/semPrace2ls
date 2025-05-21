import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
}