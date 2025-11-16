import { UserEntity } from './user-entity';

export interface IAuthRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
}
