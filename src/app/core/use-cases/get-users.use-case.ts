import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { UserRepository } from '../interfaces/user-repository.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {} // Inject UserRepository

  execute(): Observable<User[]> {
    return this.userRepository.fetchUsers();
  }
}
