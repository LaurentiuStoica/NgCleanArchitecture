import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', loadChildren: () => import('./presentation/components/user-list/user-list.routes').then(m => m.userListRoutes) },
  { path: '**', redirectTo: 'users' }, // Fallback route
];
