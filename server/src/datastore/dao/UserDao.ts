import { User } from '@motkhss/shared';

export interface UserDao {
  createUser(user: User): Promise<void>;
  updateCurrentUser(user: Partial<User>): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
}
