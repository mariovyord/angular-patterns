import { createAction, props } from "@ngrx/store"
import { User } from "../../repository/models/models"
import { Update } from "@ngrx/entity";

const namespace = `[USERS]`

export const getUser = createAction(
  `${namespace} Get User`,
  props<{ id: string }>()
);

export const getUserSuccess = createAction(
  `${namespace} Get User Success`,
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
