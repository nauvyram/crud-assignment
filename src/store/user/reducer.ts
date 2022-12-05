import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUserState } from './types'

const initialState: IUserState = {
    status: 'loading',
    data: [],
    error: null,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserData: (state, action: PayloadAction<IUser[]>) => {
            state.status = 'success'
            state.data = action.payload
        },
        fetchUserDataFailed: (state, action: PayloadAction<string>) => {
            state.status = 'error'
            state.error = action.payload
        },
        fetchTargetUserDataInit: (state) => {
            state.status = 'loading'
        },
        fetchTargetUserData: (state, action: PayloadAction<IUser>) => {
            state.status = 'success'
            state.user = action.payload
        },
        fetchTargetUserDataFailed: (state, action: PayloadAction<string>) => {
            state.status = 'error'
            state.error = action.payload
        },
        addUserInit: (state) => {
            state.status = 'addInit'
            state.user = null
        }
    }
})
export const {
    fetchUserData,
    fetchUserDataFailed,
    fetchTargetUserDataInit,
    fetchTargetUserData,
    fetchTargetUserDataFailed,
    addUserInit
} = userSlice.actions
export default userSlice.reducer