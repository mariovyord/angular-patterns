import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class UsersStoreService {
  private _store = new BehaviorSubject<User[] | undefined>(undefined);
  public store$ = this._store.asObservable();

  private state = new BehaviorSubject<'loading' | 'idle' | 'error'>('idle');
  public state$ = this.state.asObservable();

  public setState(state: 'loading' | 'idle' | 'error') {
    this.state.next(state);
  }

  public setStore(data: User[]) {
    this._store.next(data);
  }
}
