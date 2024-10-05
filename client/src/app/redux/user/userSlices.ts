import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	id?: string;
	name?: string;
	email?: string;
	password?: string;
	refreshToken?: string;
	role?: string;
	createdAt?: Date;
	isLogin: boolean;
}

const initialState: UserState = {
	isLogin: false,
};

const userSlide = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state) => {
			return {
        ...state,
        isLogin: true,
      };
		}
		
	}
})

export const {setUser} = userSlide.actions

export default userSlide.reducer;