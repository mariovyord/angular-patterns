import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { environment } from '../../../enviroments/enviroment';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  private getPath(): string {
    return 'users';
  }

  public getOne$(id: string): Observable<User> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}/${id}`);
    return this.http.get<User>(url.toString());
  }

  public getAll$(queryParams?: Params): Observable<User[]> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}`);

    if (!queryParams) return this.http.get<User[]>(url.toString());

    if (queryParams && Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        url.searchParams.append(key, queryParams[key]);
      });
    }

    return this.http.get<User[]>(url.toString());
  }

  public post$(body: User): Observable<User> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}`);
    return this.http.post<User>(url.toString(), body);
  }

  public put$(id: string | number, body: User): Observable<User> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}/${id}`);
    return this.http.put<User>(url.toString(), body);
  }

  public patch$(id: string | number, body: Partial<User>): Observable<User> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}/${id}`);
    return this.http.patch<User>(url.toString(), body);
  }

  public delete$(id: string | number): Observable<void> {
    const url = `${environment.baseUrl}/${this.getPath()}/${id}`;
    return this.http.delete<void>(url);
  }
}
