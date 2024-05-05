import { Injectable } from '@angular/core';
import { UsersStoreService } from './users-store.service';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private usersStore: UsersStoreService,
    private usersApiService: UsersApiService,
  ) {
    this.fetchAll();
  }

  private fetchAll() {
    this.usersStore.setState('loading');

    this.usersApiService
      .getAll$()
      .subscribe({
        next: (users) => {
          this.usersStore.setStore(users);
          this.usersStore.setState('idle');
        },
        error: (error) => {
          this.usersStore.setState('error')
        },
      });
  }
}
