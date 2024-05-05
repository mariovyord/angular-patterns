import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IRepository, User } from '../models/models';
import { UsersCacheService } from './users-cache.service';
import { UsersApiService } from './users-api.service';

@Injectable()
export class UsersRepositoryService implements IRepository<User> {
  private cache = inject(UsersCacheService);
  private apiService = inject(UsersApiService);
  private lifetime = 600000; // 10 minutes

  public getAll$(): Observable<User[]> {
    const cached = this.cache.getAll();

    if (cached.length && Date.now() - this.cache.timestamp < this.lifetime) {
      return of(cached);
    }

    return this.apiService.getAll$().pipe(
      tap((users) => {
        this.cache.setAll(users);
      })
    );
  }

  public get$(id: number): Observable<User | undefined> {
    const cached = this.cache.get(id);

    if (cached && Date.now() - this.cache.timestamp < this.lifetime) {
      return of(cached);
    }

    return this.apiService.getOne$(id.toString()).pipe(
      tap((user) => {
        this.cache.set(user);
      })
    );
  }

  public create$(item: User): Observable<User> {
    return this.apiService.post$(item).pipe(
      tap((user) => {
        this.cache.set(user);
      })
    );
  }

  public update$(item: User): Observable<User> {
    return this.apiService.put$(item.id.toString(), item).pipe(
      tap((user) => {
        this.cache.set(user);
      })
    );
  }

  public delete$(id: number): Observable<void> {
    return this.apiService.delete$(id.toString()).pipe(
      tap(() => {
        this.cache.remove(id);
      })
    );
  }
}
