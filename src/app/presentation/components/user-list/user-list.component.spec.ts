// presentation/user-list/user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserFacade } from '../../../application/services/user-facade';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserFacade: jasmine.SpyObj<UserFacade>;

  beforeEach(async () => {
    // Create a mock UserFacade
    mockUserFacade = jasmine.createSpyObj('UserFacade', ['getUsers']);
    mockUserFacade.getUsers.and.returnValue(
      of([{ id: 1, name: 'John Doe', email: 'john@example.com' }])
    );

    // Configure the testing module
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent, // Import standalone component
        CommonModule, // Import CommonModule for directives like *ngFor
        LoadingSpinnerComponent, // Import LoadingSpinnerComponent
      ],
      providers: [{ provide: UserFacade, useValue: mockUserFacade }], // Provide mock UserFacade
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list of users', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userListItems = compiled.querySelectorAll('li');
    expect(userListItems.length).toBe(1);
    expect(userListItems[0].textContent).toContain('John Doe');
  });

  it('should show the loading spinner when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('app-loading-spinner');
    expect(spinner).not.toBeNull();
  });

  it('should hide the loading spinner when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('app-loading-spinner');
    expect(spinner).toBeNull();
  });
});
