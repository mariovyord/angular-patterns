import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { ApiService } from '../core/api.service';

@Injectable()
export class UsersApiService extends ApiService<User> {
  override getPath(): string {
    return 'users';
  }
}
