import { Observable } from 'rxjs';
import { User } from '../entities/user';

export abstract class UserRepository {
  abstract fetchUsers(): Observable<User[]>;
}
