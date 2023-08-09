import { createSlice, PayloadAction, Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
// import { relogin } from '@store/slices/authSlice'
import { loadProfile } from '@store/slices/profileSlice'
import sendMsg from '@utils/sendMsg'

export interface IStatusState {
    isAuthenticated?: boolean
    userId?: number | null
    loading?: boolean
    saving?: boolean
    showSpinner?: boolean
    msg?: string | null,
    msgType?: '' | 'info' | 'warning' | 'fatal'
}

const initialState: IStatusState = {
    isAuthenticated: false,
    loading: true,
    saving: false,
    showSpinner: false,
    msg: null,
    msgType: ''
}

export const setTemporaryMsg = (msg: string, msgType: '' | 'info' | 'warning' | 'fatal', waitTime: number) => (dispatch: Dispatch) => {
console.log ('1 - setTemporaryMsg')
dispatch(setMsg({msg, msgType}))
    setTimeout(() => {
console.log ('2 - setTemporaryMsg')
        dispatch(resetStatus());
    }, waitTime*1000);

}


// Need to sort out status

// 1. Load or Saving needs a waiting spinner
// 2. Loading may just need a msg and msg type
// 3. 
/*
    setLoadingSpinner
    setSavingSpinner
    setLoadingMsg
    setSavingMsg

*/

type T_Logout = {
    data: {
        msg: string
    }
}

// 
// relogin - This action is called to create to relogin in to the application
//           It calls user/auto
// 


// 
// logout - user opens another tab so we reload their details
// 
export const logout = createAsyncThunk('auth/logout', 
async (runBackend: boolean) => {
    try {
        if (runBackend){
            const response = await sendMsg( 'delete', 'user/auth/logout', {}) as T_Logout
            console.log ('LOGOUT ')
            console.log (response)
            return response.data
        } else {
            return true
        }
            
    } catch (err) {
        console.log ('LOGOUT ERROR')
        console.log (err)
        throw err
    }
})


export const statusSlice = createSlice ({
    name: 'status',
    initialState,
    reducers: {
        setLoadingSpinner: ( state ) => {
            state.loading = true,
            state.showSpinner = true
        },
        setSavingSpinner: ( state ) => {
            state.saving = true,
            state.showSpinner = true
        },
        setLoadingMsg: ( state, action: PayloadAction<IStatusState>) => {
            state.loading = true,
            state.msg = action.payload.msg,
            state.msgType = action.payload.msgType
        },
        setSavingMsg: ( state, action: PayloadAction<IStatusState>) => {
            state.saving = true,
            state.msg = action.payload.msg,
            state.msgType = action.payload.msgType
        },
        setMsg: ( state, action: PayloadAction<IStatusState>) => {
            state.msg = action.payload.msg,
            state.msgType = action.payload.msgType
        },
        resetStatus: ( state ) => {
            state.loading = false,
            state.saving = false,
            state.showSpinner = false,
            state.msg = null
            state.msgType = ''
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(relogin.pending, (state) => {
        //     console.log ('AUTH/RELOGIN/PENDING ???????????')
        //     console.log (state)
        //     state.loading = true,
        //     state.showSpinner = true
        // }),
        // builder.addCase(relogin.fulfilled, (state) => {
        //     console.log ('AUTH/RELOGIN/FULFILLED ???????????')
        //     state.loading = false,
        //     state.showSpinner = false
        // }),
        // builder.addCase(relogin.rejected, (state) => {
        //     console.log ('AUTH/RELOGIN/REJECTED ???????????')
        //     state.loading = false,
        //     state.showSpinner = false
        // }),


        builder.addCase(logout.rejected, (state) => {
            // window.localStorage.removeItem('tk')
            window.localStorage.removeItem('auth')
            // state.accessToken = null;
            state.userId = null;
            state.isAuthenticated = false;
        }),
        builder.addCase(logout.fulfilled, (state, action) => {
            console.log ('logout.fulfilled')
            console.log (action)
            // window.localStorage.removeItem('tk')
            window.localStorage.removeItem('auth')
            state.userId = null;
            state.isAuthenticated = false;
        })
        builder.addCase(loadProfile.pending, (state) => {
            console.log ('LOAD_PROFILE/PENDING ???????????')
            console.log (state)
            state.loading = true
            state.showSpinner = true
        }),
        builder.addCase(loadProfile.fulfilled, (state, action) => {
            console.log ('LOAD_PROFILE/FULFILLED ???????????')
            state.loading = false
            state.showSpinner = false
            state.isAuthenticated = true
            state.userId = action.payload.user.userId
        }),
        builder.addCase(loadProfile.rejected, (state) => {
            console.log ('LOAD_PROFILE/REJECTED ???????????')
            state.loading = false
            state.showSpinner = false
        })
    }
})

export const { setLoadingSpinner, setSavingSpinner, setLoadingMsg, setSavingMsg, resetStatus, setMsg } = statusSlice.actions;

export default statusSlice.reducer;
