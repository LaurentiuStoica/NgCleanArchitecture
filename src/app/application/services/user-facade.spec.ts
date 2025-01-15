import { TestBed } from '@angular/core/testing';
import { UserFacade } from './user-facade';
import { GetUsersUseCase } from '../../core/use-cases/get-users.use-case';
import { of } from 'rxjs';

describe('UserFacade', () => {
  let facade: UserFacade;
  let mockGetUsersUseCase: jasmine.SpyObj<GetUsersUseCase>;

  beforeEach(() => {
    mockGetUsersUseCase = jasmine.createSpyObj('GetUsersUseCase', ['execute']);
    mockGetUsersUseCase.execute.and.returnValue(
      of([{ id: 1, name: 'John Doe', email: 'john@example.com' }])
    );

    TestBed.configureTestingModule({
      providers: [
        UserFacade,
        { provide: GetUsersUseCase, useValue: mockGetUsersUseCase },
      ],
    });

    facade = TestBed.inject(UserFacade);
  });

  it('should fetch users using GetUsersUseCase', () => {
    facade.getUsers().subscribe((users) => {
      expect(users).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
    });
    expect(mockGetUsersUseCase.execute).toHaveBeenCalled();
  });
});
