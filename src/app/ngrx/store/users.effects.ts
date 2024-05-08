import { Injectable } from '@angular/core';
import {
  switchMap,
  takeUntil,
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usersActions from './users.actions';
import { UsersApiService } from '../services/users-api.service';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private apiService: UsersApiService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.getUser),
      mergeMap((action) =>
        this.apiService
          .getOne$(action.id)
          .pipe(map((user) => usersActions.getUserSuccess({ user })))
      )
    )
  );

  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUsers),
      switchMap(() =>
        this.apiService.getAll$().pipe(
          takeUntil(this.actions$.pipe(ofType(usersActions.loadUsersCancel))),
          map((users) => usersActions.loadUsersSuccess({ users })),
          catchError(() => [usersActions.loadUsersFailure()])
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.createUser),
      mergeMap((action) =>
        this.apiService
          .post$(action.user)
          .pipe(map((user) => usersActions.createUserSuccess({ user })))
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.updateUser),
      mergeMap((action) =>
        this.apiService
          .patch$(action.update.id, action.update.changes)
          .pipe(map((user) => usersActions.updateUserSuccess({ user })))
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.deleteUser),
      mergeMap((action) =>
        this.apiService
          .delete$(action.id)
          .pipe(map(() => usersActions.deleteUserSuccess({ id: action.id })))
      )
    )
  );
}
