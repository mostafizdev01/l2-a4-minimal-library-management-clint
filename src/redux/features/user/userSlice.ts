import type { RootState } from "@/redux/middlewares/store";
import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";


interface InitialState {
    users: IUser[];
}

const initialState: InitialState = {
    users: [
        {
            name: "Mostafiz",
            id: "y5e8RmNErHRyj6cdkRpyg"
        }
    ]
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
       addUser: (state, action: PayloadAction<IUser>) => {
        const UserData = {
            ...action.payload,
            id: nanoid()
        }
        state.users.push(UserData)
       }
    }
})

export const selectUser = (state: RootState) => {
    return state.user.users
}

export const { addUser } = userSlice.actions;
export default userSlice.reducer;