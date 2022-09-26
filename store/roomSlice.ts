import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';

import {AppState} from './index';
import API from '../config/API';
import {createRoomRequest, Rooms} from '../pages/api/rooms';


export interface RoomState {
	status: string,
	rooms: Array<Rooms>;
	room: Rooms;
}

// Initial state
const initialState: RoomState = {
	status: 'loading',
	rooms: [],
	room: {
		id: 0,
		game: '',
		info: {}
	},
};

export const roomSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		setRoomsState(state, action) {
			state.rooms = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRooms.pending, (state: RoomState) => {
				state.status = 'loading';
				state.rooms = [];
			})
			.addCase(fetchRooms.fulfilled, (state: RoomState, action: any) => {
				state.status = 'done'
				state.rooms = action.payload;
			})
			.addCase(createRoom.pending, (state: RoomState) => {
				state.status = 'loading';
				state.room = {
					id: 0,
					game: '',
					info: {}
				};
			})
			.addCase(createRoom.fulfilled, (state: RoomState, action: any) => {
				state.status = 'done'
				state.room = action.payload.room;
			})
			.addCase(HYDRATE, (state: RoomState, action: any) => {
				return {
					...state,
					...action.payload.rooms,
				};
			})
	}
});


export const fetchRooms = createAsyncThunk('rooms/fetch', async () => {
	const response = await fetch(API.rooms);
	return await response.json();
});

export const createRoom = createAsyncThunk('rooms/create', async (data: createRoomRequest) => {
	const response = await fetch(API.rooms, {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return await response.json();
});

export const { setRoomsState } = roomSlice.actions;

export const selectRoomsState = (state: AppState) => state.rooms.rooms;

export default roomSlice.reducer;