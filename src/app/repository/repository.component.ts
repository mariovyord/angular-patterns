import { Component, inject } from '@angular/core';
import { UsersApiService } from './services/users-api.service';
import { UsersCacheService } from './services/users-cache.service';
import { UsersRepositoryService } from './services/users-repository.service';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [],
  providers: [UsersApiService, UsersCacheService, UsersRepositoryService],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss'
})
export class RepositoryComponent {
  usersRepositoryService = inject(UsersRepositoryService);

  users$ = this.usersRepositoryService.getAll$();
}
