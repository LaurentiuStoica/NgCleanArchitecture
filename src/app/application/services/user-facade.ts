import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { GetUsersUseCase } from '../../core/use-cases/get-users.use-case';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private getUsersUseCase: GetUsersUseCase) {}

  getUsers(): Observable<User[]> {
    return this.getUsersUseCase.execute();
  }
}