import { configureStore } from '@reduxjs/toolkit';
import userReducer from '././user/userSlices'
export const store = configureStore({
	reducer: {
		user: userReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
