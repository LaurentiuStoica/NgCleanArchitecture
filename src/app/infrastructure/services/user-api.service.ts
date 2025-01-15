import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../core/entities/user';
import { UserRepository } from '../../core/interfaces/user-repository.interface';

@Injectable({
  providedIn: 'root',
})
export class UserApiService implements UserRepository {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
