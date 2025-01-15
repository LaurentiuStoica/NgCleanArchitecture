// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { UserRepository } from './app/core/interfaces/user-repository.interface';
import { UserApiService } from './app/infrastructure/services/user-api.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    { provide: UserRepository, useClass: UserApiService }, // Use UserApiService for UserRepository
  ],
}).catch((err) => console.error(err));
