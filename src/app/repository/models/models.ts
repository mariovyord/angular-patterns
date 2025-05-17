import { Observable } from 'rxjs';
import { Params } from '@angular/router';

export interface IApiService<T> {
  getPath(): string;
  getOne$(id: string): Observable<T>;
  getAll$(queryParams?: Params): Observable<T[]>;
  post$(body: T): Observable<T>;
  put$(id: string, body: T): Observable<T>;
  delete$(id: string): Observable<void>;
}

export interface ICacheService<T> {
  getAll(): T[];
  get(id: number): T | undefined;
  setAll(items: T[]): void;
  set(item: T): void;
  remove(id: number): void;
  clear(): void;
}

export interface IRepository<T> {
  getAll$(): Observable<T[]>;
  get$(id: number): Observable<T | undefined>;
  create$(item: T): Observable<T>;
  update$(item: T): Observable<T>;
  delete$(id: number): Observable<void>;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
