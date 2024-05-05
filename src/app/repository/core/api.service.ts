import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { IApiService } from '../models/models';
import { environment } from '../../../enviroments/enviroment';

@Injectable()
export abstract class ApiService<T> implements IApiService<T> {
  constructor(private http: HttpClient) {}

  abstract getPath(): string;

  public getOne$(id: string): Observable<T> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}/${id}`);
    return this.http.get<T>(url.toString());
  }

  public getAll$(queryParams?: Params): Observable<T[]> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}`);

    if (!queryParams) return this.http.get<T[]>(url.toString());

    if (queryParams && Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach(key => {
        url.searchParams.append(key, queryParams[key]);
      });
    }

    return this.http.get<T[]>(url.toString());
  }

  public post$(body: T): Observable<T> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}`);
    return this.http.post<T>(url.toString(), body);
  }

  public put$(id: string, body: T): Observable<T> {
    const url = new URL(`${environment.baseUrl}/${this.getPath()}/${id}`);
    return this.http.put<T>(url.toString(), body);
  }

  public delete$(id: string): Observable<void> {
    const url = `${environment.baseUrl}/${this.getPath()}/${id}`;
    return this.http.delete<void>(url);
  }
}
