import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IAlertState {
    show: boolean
    type: string
    msg: string
}
interface IAlertPayload {
    type: string
    msg: string
}

const initialState: IAlertState = {
    show: false,
    type: 'info',
    msg: ''
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        hideAlert(state) {
            state.show = false
            state.msg = ''
        },
        showAlert(state, action: PayloadAction<IAlertPayload>) {
            state.show = true
            state.type = action.payload.type
            state.msg = action.payload.msg
        },
    },
})

export const { hideAlert, showAlert } = alertSlice.actions
export default alertSlice.reducer