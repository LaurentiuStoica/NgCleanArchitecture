# Documentație: Arhitectura Clean pentru Angular - POC

Aceasta documentație explică structura și fluxul de funcționare al unui Proof of Concept (POC) implementat pe baza **arhitecturii Clean** într-un proiect Angular. Scopul este să prezinte modul în care layerele comunică și să clarifice responsabilitățile fiecărui layer.

---

## **1. Prezentare Generală**
Arhitectura Clean separă clar responsabilitățile în layere distincte pentru a asigura:
- **Modularitate**: Fiecare layer are un scop unic și clar definit.
- **Testabilitate**: Layerele pot fi testate izolat.
- **Extensibilitate**: Implementări concrete pot fi schimbate fără a afecta alte layere.

Structura este organizată astfel:

```plaintext
core/
├── interfaces/
│   └── user.interface.ts              # Interfața pentru User
├── repositories/
│   └── user.repository.ts             # Interfața pentru UserRepository
└── use-cases/
    ├── get-users.use-case.ts          # Use Case pentru obținerea utilizatorilor
    └── get-users.use-case.spec.ts     # Teste pentru Use Case

infrastructure/
└── services/
    ├── user-api.service.ts            # Implementarea repository-ului pentru API
    └── user-api.service.spec.ts       # Teste pentru UserApiService

application/
└── services/
    ├── user-facade.service.ts         # Facade pentru utilizatori
    └── user-facade.spec.ts            # Teste pentru UserFacadeService

presentation/
└── components/
    └── user-list/
        ├── user-list.component.ts     # Componenta pentru listarea utilizatorilor
        ├── user-list.component.html   # HTML-ul componentei
        ├── user-list.component.scss   # Stilurile componentei
        ├── user-list.component.spec.ts# Teste pentru componentă
        └── user-list.routes.ts        # Rutele pentru componentă

shared/
└── components/
    ├── loading-spinner/
    │   ├── loading-spinner.component.ts  # Componenta pentru afișarea unui spinner de încărcare
    │   ├── loading-spinner.component.html
    │   ├── loading-spinner.component.scss
    │   └── loading-spinner.component.spec.ts
└── pipes/
    ├── capitalize.pipe.ts              # Pipe pentru capitalizarea textului
    └── capitalize.pipe.spec.ts         # Teste pentru Pipe

src/
├── app.component.ts
├── app.component.html
├── app.component.scss
├── app.component.spec.ts
├── app.config.ts
├── app.module.ts
└── app.routes.ts
```

---

## **2. Descrierea Layerelor**

### **2.1 Core Layer**
Conține abstracții pentru logica aplicației, cum ar fi interfețe și cazuri de utilizare.

#### **Interfaces**
- Definește structura pentru entitățile utilizate în aplicație.
  ```typescript
  // core/interfaces/user.interface.ts
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  ```

#### **Repositories**
- Definește contractele pentru repository-uri.
  ```typescript
  // core/repositories/user.repository.ts
  import { Observable } from 'rxjs';
  import { User } from '../interfaces/user.interface';

  export interface UserRepository {
    fetchUsers(): Observable<User[]>;
  }
  ```

#### **Use Cases**
- Conține logica specifică aplicației, utilizând abstracțiile definite în interfaces și repositories.
  ```typescript
  // core/use-cases/get-users.use-case.ts
  import { UserRepository } from '../repositories/user.repository';
  import { User } from '../interfaces/user.interface';
  import { Observable } from 'rxjs';

  export class GetUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    execute(): Observable<User[]> {
      return this.userRepository.fetchUsers();
    }
  }
  ```

---

### **2.2 Infrastructure Layer**
Conține implementările repository-urilor pentru interacțiunea cu surse externe (API-uri, baze de date).

```typescript
// infrastructure/services/user-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { UserRepository } from '../../core/repositories/user.repository';

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
```

---

### **2.3 Application Layer**
Servește ca un mediator între Core și Presentation, simplificând interacțiunile cu logica de business.

```typescript
// application/services/user-facade.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { GetUsersUseCase } from '../../core/use-cases/get-users.use-case';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  constructor(private getUsersUseCase: GetUsersUseCase) {}

  fetchUsers(): Observable<User[]> {
    return this.getUsersUseCase.execute();
  }
}
```

---

### **2.4 Presentation Layer**
Conține componenta UI, care afișează datele obținute din Application Layer.

```typescript
// presentation/components/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { UserFacadeService } from '../../../application/services/user-facade.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private userFacade: UserFacadeService) {}

  ngOnInit(): void {
    this.users$ = this.userFacade.fetchUsers();
  }
}
```

```html
<!-- presentation/components/user-list/user-list.component.html -->
<ul>
  <li *ngFor="let user of users$ | async">
    {{ user.name }} ({{ user.email }})
  </li>
</ul>
```

---

### **2.5 Shared Layer**
Acest layer conține componente, directive și pipe-uri reutilizabile în mai multe părți ale aplicației.

- **Componenta Loading Spinner**:
  ```typescript
  // shared/components/loading-spinner/loading-spinner.component.ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
  })
  export class LoadingSpinnerComponent {}
  ```

  ```html
  <!-- shared/components/loading-spinner/loading-spinner.component.html -->
  <div class="spinner"></div>
  ```

- **Pipe Capitalize**:
  ```typescript
  // shared/pipes/capitalize.pipe.ts
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'capitalize',
  })
  export class CapitalizePipe implements PipeTransform {
    transform(value: string): string {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  }
  ```

- **Shared Module**:
  ```typescript
  // shared/shared.module.ts
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
  import { CapitalizePipe } from './pipes/capitalize.pipe';

  @NgModule({
    declarations: [LoadingSpinnerComponent, CapitalizePipe],
    imports: [CommonModule],
    exports: [LoadingSpinnerComponent, CapitalizePipe],
  })
  export class SharedModule {}
  ```

---

## **3. Fluxul de Comunicare între Layere**
1. **Presentation → Application**:
   - Componenta `UserListComponent` apelează `UserFacadeService` pentru a obține datele utilizatorilor.
   
2. **Application → Core**:
   - `UserFacadeService` delegă cererea la `GetUsersUseCase`.

3. **Core → Infrastructure**:
   - `GetUsersUseCase` folosește `UserRepository` pentru a obține utilizatorii.
   - `UserRepository` este implementat de `UserApiService`, care accesează datele API-ului.

4. **Infrastructure → API**:
   - `UserApiService` trimite o cerere HTTP către API și returnează datele către Core.

---

## **4. Avantajele Arhitecturii**
- **Separarea responsabilităților**: Layerele sunt independente și fiecare are un scop unic.
- **Testabilitate**: Fiecare layer poate fi testat izolat.
- **Extensibilitate**: Se pot schimba implementări și tehnologii fără a afecta logica principală.
- **Reutilizare**: Logica de business este reutilizabilă în alte aplicații.

---

## **5. Concluzie**
Această arhitectură Clean permite o aplicație Angular bine organizată, modulară și ușor de extins. Fiecare layer joacă un rol clar și comunică cu celelalte prin contracte bine definite.

