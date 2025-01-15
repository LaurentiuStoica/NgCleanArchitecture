import { TestBed } from '@angular/core/testing';
import { GetUsersUseCase } from './get-users.use-case';
import { UserRepository } from '../interfaces/user-repository.interface';
import { of } from 'rxjs';

describe('GetUsersUseCase', () => {
  let useCase: GetUsersUseCase;
  let mockUserRepository: jasmine.SpyObj<UserRepository>;

  beforeEach(() => {
    mockUserRepository = jasmine.createSpyObj('UserRepository', ['fetchUsers']);
    mockUserRepository.fetchUsers.and.returnValue(
      of([{ id: 1, name: 'John Doe', email: 'john@example.com' }])
    );

    TestBed.configureTestingModule({
      providers: [
        GetUsersUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    });

    useCase = TestBed.inject(GetUsersUseCase);
  });

  it('should fetch users from the repository', () => {
    useCase.execute().subscribe((users) => {
      expect(users).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
    });
    expect(mockUserRepository.fetchUsers).toHaveBeenCalled();
  });
});
