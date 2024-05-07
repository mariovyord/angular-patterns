import {  createFeature, createReducer, on } from "@ngrx/store";
import { User } from "../../repository/models/models";
import * as usersActions from "./users.actions";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface State extends EntityState<User> {
  users: User[];
  loading: boolean;
};

export const initialState: State = adapter.getInitialState({
  users: [],
  loading: false,
});

export const usersFeature = createFeature(
    {
        name: 'users',
        reducer: createReducer(
            initialState,
            on(usersActions.loadUsers, (state) => ({
                ...state,
                loading: true
            })),
            on(usersActions.loadUsersSuccess, (state, data) => ({
                ...state,
                users: [...state.users, ...data.users],
                loading: false
            })),
            on(usersActions.loadUsersCancel, (state) => ({
                ...state,
                loading: false
            })),
            on(usersActions.loadUsersFailure, (state) => ({
                ...state,
                loading: false
            })),

            on(usersActions.createUser, state => ({ ...state, loading: true })),
            on(usersActions.createUserSuccess, (state, { user }) => adapter.addOne(user, { ...state, loading: false })),
            on(usersActions.createUserFailure, state => ({ ...state, loading: false })),

            on(usersActions.updateUser, state => ({ ...state, loading: true })),
            on(usersActions.updateUserSuccess, (state, { user }) => adapter.updateOne({ id: user.id, changes: user }, { ...state, loading: false })),
            on(usersActions.updateUserFailure, state => ({ ...state, loading: false })),

            on(usersActions.deleteUser, state => ({ ...state, loading: true })),
            on(usersActions.deleteUserSuccess, (state, { id }) => adapter.removeOne(id, { ...state, loading: false })),
            on(usersActions.deleteUserFailure, state => ({ ...state, loading: false })),
        )
    }
)

export const {
    name,
    reducer,
    selectUsersState,
    selectUsers,
    selectLoading,
} = usersFeature;
