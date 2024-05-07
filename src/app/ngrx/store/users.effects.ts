import { Injectable } from "@angular/core";
import { switchMap, takeUntil, catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createUser, createUserSuccess, deleteUser, deleteUserSuccess, getUser, getUserSuccess, loadUsers, loadUsersCancel, loadUsersFailure, loadUsersSuccess, updateUser, updateUserSuccess } from "./users.actions";
import { UsersApiService } from "../../reactive/services/users-api.service";

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private apiService: UsersApiService,
  ) { }

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      mergeMap(action =>
        this.apiService.getOne$(action.id).pipe(
          map(user => getUserSuccess({ user }))
        )
      )
    )
    );

  getAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(loadUsers),
        switchMap(
            () => this.apiService.getAll$()
                .pipe(
                    takeUntil(this.actions$.pipe(ofType(loadUsersCancel))),
                    map(users => loadUsersSuccess({ users })),
                    catchError(() => [loadUsersFailure()])
                ),
        )
    ));

  createUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(createUser),
        mergeMap(action =>
          this.apiService.post$(action.user).pipe(
            map(user => createUserSuccess({ user })
          )
        )
      )
  ))

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(action =>
        this.apiService.patch$(action.update.id, action.update.changes).pipe(
          map(user => updateUserSuccess({ user })),
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(action =>
        this.apiService.delete$(action.id).pipe(
          map(() => deleteUserSuccess({ id: action.id }))
        )
      )
    )
  );
}
