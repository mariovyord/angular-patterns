import { Component, inject } from '@angular/core';
import { UsersStoreService } from './services/users-store.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss'
})
export class ReactiveComponent {
  usersStore = inject(UsersStoreService);

  users$ = this.usersStore.store$;
  loading$ = this.usersStore.state$.pipe(map(state => state === 'loading'));
}
