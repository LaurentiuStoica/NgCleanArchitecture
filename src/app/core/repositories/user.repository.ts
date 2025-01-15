import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

export abstract class UserRepository {
  abstract fetchUsers(): Observable<User[]>;
}