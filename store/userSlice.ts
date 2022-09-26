import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';

import {AppState} from './index';
import {Users} from '../pages/api/users';
import {fetchRooms, RoomState} from './roomSlice';
import API from '../config/API';


export interface UserState {
	status: string,
	users: Array<Users>;
}

// Initial state
const initialState: UserState = {
	status: 'loading',
	users: [],
};

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsersState(state, action) {
			state.users = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state: UserState) => {
				state.status = 'loading';
				state.users = [];
			})
			.addCase(fetchUsers.fulfilled, (state: UserState, action: any) => {
				state.status = 'done'
				state.users = action.payload;
			})
			.addCase(HYDRATE, (state: UserState, action: any) => {
				return {
					...state,
					...action.payload.users,
				};
			})
	}
});


export const fetchUsers = createAsyncThunk('users/fetch', async () => {
	const response = await fetch(API.users);
	return await response.json();
})

export const { setUsersState } = userSlice.actions;

export const selectAuthState = (state: AppState) => state.users.users;

export default userSlice.reducer;