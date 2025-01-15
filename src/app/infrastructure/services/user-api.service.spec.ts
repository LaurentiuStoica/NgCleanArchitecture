import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { UserApiService } from './user-api.service';
import { User } from '../../core/interfaces/user.interface';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        UserApiService,
        { provide: HttpClient, useValue: httpClientSpy }, // Provide mocked HttpClient
      ],
    });

    service = TestBed.inject(UserApiService);
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ];

    httpClientSpy.get.and.returnValue(of(mockUsers)); // Mock the HTTP GET request

    service.fetchUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });
});
