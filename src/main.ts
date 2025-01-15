import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { UserRepository } from './app/core/repositories/user.repository';
import { UserApiService } from './app/infrastructure/services/user-api.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    { provide: UserRepository, useClass: UserApiService }
  ],
}).catch((err) => console.error(err));
