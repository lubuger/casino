import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { roomSlice } from './roomSlice';
import { createWrapper } from 'next-redux-wrapper';

const reducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[roomSlice.name]: roomSlice.reducer,
})
export const store = () =>
	configureStore({
		reducer,
		devTools: true,
	});

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(store);