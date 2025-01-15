import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { UserRepository } from '../../core/repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends UserRepository {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
    super(); // Call the constructor of the abstract class
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
