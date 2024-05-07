import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../repository/models/models';
import { Store } from '@ngrx/store';
import { selectLoading, selectUsers } from './store/users.feature';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { loadUsers } from './store/users.actions';


@Component({
  selector: 'app-ngrx',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss'
})
export class NgrxComponent {
  users$: Observable<User[]> = this.store.select(selectUsers);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private store: Store) {
    this.store.dispatch(loadUsers());
  }
}
