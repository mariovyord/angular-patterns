import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {  selectStatus, selectUsers } from './store/users.feature';
import { JsonPipe } from '@angular/common';
import { loadUsers } from './store/users.actions';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-ngrx',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss'
})
export class NgrxComponent {
  users = toSignal(this.store.select(selectUsers));
  status = toSignal(this.store.select(selectStatus));

  constructor(private store: Store) {
    this.store.dispatch(loadUsers());
  }
}
