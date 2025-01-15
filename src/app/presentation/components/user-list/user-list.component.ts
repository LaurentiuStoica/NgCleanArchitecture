import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { UserFacade } from '../../../application/services/user-facade';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent], // Add CommonModule here
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  isLoading = true;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.users$ = this.userFacade.getUsers();
    this.users$.subscribe(() => (this.isLoading = false));
  }
}
