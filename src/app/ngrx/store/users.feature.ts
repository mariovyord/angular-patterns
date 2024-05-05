import { createFeature, createReducer, on } from '@ngrx/store';
import * as usersActions from './users.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/models';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface State extends EntityState<User> {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const initialState: State = adapter.getInitialState({
  users: [],
  status: 'idle',
});

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(usersActions.loadUsers, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(usersActions.loadUsersSuccess, (state, data) => ({
      ...state,
      users: [...state.users, ...data.users],
      status: 'succeeded' as const,
    })),
    on(usersActions.loadUsersCancel, (state) => ({
      ...state,
      status: 'succeeded' as const,
    })),
    on(usersActions.loadUsersFailure, (state) => ({
      ...state,
      status: 'failed' as const,
    })),

    on(usersActions.createUser, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(usersActions.createUserSuccess, (state, { user }) =>
      adapter.addOne(user, { ...state, status: 'succeeded' as const })
    ),
    on(usersActions.createUserFailure, (state) => ({
      ...state,
      status: 'failed' as const,
    })),

    on(usersActions.updateUser, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(usersActions.updateUserSuccess, (state, { user }) =>
      adapter.updateOne(
        { id: user.id, changes: user },
        { ...state, status: 'succeeded' as const }
      )
    ),
    on(usersActions.updateUserFailure, (state) => ({
      ...state,
      status: 'failed' as const,
    })),

    on(usersActions.deleteUser, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(usersActions.deleteUserSuccess, (state, { id }) =>
      adapter.removeOne(id, { ...state, status: 'succeeded' as const })
    ),
    on(usersActions.deleteUserFailure, (state) => ({
      ...state,
      status: 'failed' as const,
    }))
  ),
});

export const { name, reducer, selectUsersState, selectUsers, selectStatus } =
  usersFeature;
