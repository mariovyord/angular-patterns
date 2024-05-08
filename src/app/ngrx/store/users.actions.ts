import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '../models/models';

const namespace = `[USERS]`;

export const getUser = createAction(
  `${namespace} Get User`,
  props<{ id: string }>()
);

export const getUserSuccess = createAction(
  `${namespace} Get User Success`,
  props<{ user: User }>()
);
export const loadUsers = createAction(`${namespace} load users`);

export const loadUsersSuccess = createAction(
  `${namespace} load users success`,
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(`${namespace} load users failure`);

export const loadUsersCancel = createAction(`${namespace} load users cancel`);

export const createUser = createAction(
  `${namespace} Create User`,
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  `${namespace} Create User Success`,
  props<{ user: User }>()
);

export const createUserFailure = createAction(
  `${namespace} Create User Failure`,
  props<{ error: any }>()
);

export const updateUser = createAction(
  `${namespace} Update User`,
  props<{ update: Update<User> }>()
);

export const updateUserSuccess = createAction(
  `${namespace} Update User Success`,
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  `${namespace} Update User Failure`,
  props<{ error: any }>()
);

export const deleteUser = createAction(
  `${namespace} Delete User`,
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  `${namespace} Delete User Success`,
  props<{ id: number }>()
);

export const deleteUserFailure = createAction(
  `${namespace} Delete User Failure`,
  props<{ error: any }>()
);
