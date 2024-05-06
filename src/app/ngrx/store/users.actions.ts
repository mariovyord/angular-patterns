import { createAction, props } from "@ngrx/store"
import { Update } from '@ngrx/entity';
import { User } from "../../repository/models/models"

const namespace = '[ALL POSTS]'

export const getUser = createAction(
  '[User/API] Get User',
  props<{ id: string }>()
);

export const getUserSuccess = createAction(
  '[User/API] Get User Success',
  props<{ user: User }>()
);
export const loadUsers = createAction(
    `${namespace} load posts`,
)

export const loadUsersSuccess = createAction(
    `${namespace} load posts success`,
    props<{ users: User[] }>(),
)

export const loadUsersFailure = createAction(
    `${namespace} load posts failure`,
)

export const loadUsersCancel = createAction(
    `${namespace} load posts cancel`,
)

export const createUser = createAction(
  '[User/API] Create User',
  props<{ user: User }>()
);

export const createUsersSuccess = createAction(
  '[User/API] Create User Success',
  props<{ user: User }>()
);

export const createUsersFailure = createAction(
  '[User/API] Create User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User/API] Update User',
  props<{ update: Update<User> }>()
);

export const updateUserSuccess = createAction(
  '[User/API] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User/API] Update User Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User/API] Delete User',
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  '[User/API] Delete User Success',
  props<{ id: number }>()
);

export const deleteUserFailure = createAction(
  '[User/API] Delete User Failure',
  props<{ error: any }>()
);
