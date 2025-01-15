import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<User[]> {
    return this.userRepository.fetchUsers();
  }
}
