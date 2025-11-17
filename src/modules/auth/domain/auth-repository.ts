import { SignUpAuthDto } from '../dto/signup-auth.dto';
import { UserEntity } from './user-entity';

export interface IAuthRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  createUser(data: SignUpAuthDto): Promise<UserEntity | null>;
}
