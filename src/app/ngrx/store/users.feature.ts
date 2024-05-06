import { createFeature, createReducer, on } from "@ngrx/store";
import { User } from "../../repository/models/models";
import { loadUsers, loadUsersCancel, loadUsersFailure, loadUsersSuccess } from "./users.actions";

export interface IUsersState {
    users: User[],
    loading: boolean,
}

const initialState: IUsersState = {
    users: [],
    loading: false,
}

export const usersFeature = createFeature(
    {
        name: 'users',
        reducer: createReducer(
            initialState,
            on(loadUsers, (state) => ({
                ...state,
                loading: true
            })),
            on(loadUsersSuccess, (state, data) => ({
                ...state,
                users: [...state.users, ...data.users],
                loading: false
            })),
            on(loadUsersCancel, (state) => ({
                ...state,
                loading: false
            })),
            on(loadUsersFailure, (state) => ({
                ...state,
                loading: false
            })),
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
