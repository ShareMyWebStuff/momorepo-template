import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import sendMsg from '@utils/sendMsg'

type IAuth = {
    // accessToken: string | null
    userId: string | null
    accountType: number | null
    isAuthenticated: boolean
    refreshToken?: string | null
}

type T_Relogin = {
    status: number
    data: {
        // accessToken: string | null
        userId: string | null
        accountType: number | null
        refreshToken: string | null
    }
}

type T_Logout = {
    data: {
        msg: string
    }
}

const initialState: IAuth = {
    // accessToken: null,
    userId: null,
    accountType: null,
    isAuthenticated: false
    // refreshToken: null
}

export interface ILoginPayload {
    email: string
    googleAcc: boolean
    googleId: string | null
    password: string
    googleEmail: string
}

// checkConnection
export const checkConnection = createAsyncThunk('auth/check', 
async () => {
    try {
        console.log ('CALLING createAsyncThunk - GET user/check')
        const response = await sendMsg( 'get', 'user/auth/check', {}) as T_Relogin
        console.log ('Check Connection ')
        console.log (response)
        if ( response.status === 200  )
            return {
                // accessToken : response.data.accessToken,
                userId : response.data.userId,
                accountType : response.data.accountType,
                refreshToken : response.data.refreshToken,
                isAuthenticated : true}
        return {
            // accessToken : null,
            userId : null,
            accountType : null,
            isAuthenticated : false,
            refreshToken: null
        }
            
    } catch (err) {
        console.log ('RELO(GIN ERROR')
        console.log (err)
        throw err
    }
})


/**
 * logout
 * 
 * 
 */
export const logout = createAsyncThunk('auth/logout', 
async () => {
    try {
        const response = await sendMsg( 'delete', 'user/auth/logout', {}) as T_Logout
        console.log ('LOGOUT ')
        console.log (response)
        return response.data
            
    } catch (err) {
        console.log ('LOGOUT ERROR')
        console.log (err)
        throw err
    }
})


/**
 * authSlice
 */
export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: ( state , action: PayloadAction<IAuth>) => {
            // state.accessToken = action.payload.accessToken;
            state.userId = action.payload.userId;
            state.accountType = action.payload.accountType;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        resetAuth: ( state ) => {
            // state.accessToken = null;
            state.userId = null;
            state.accountType = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        // login
        // builder.addCase(login.rejected, (state) => {
        //     window.localStorage.removeItem('tk')
        //     state.token = null;
        //     state.userId = null;
        //     state.accountType = null;
        //     state.isAuthenticated = false;
        // }),
        // builder.addCase(login.fulfilled, (state, action) => {
        //     console.log ('login.fulfilled')
        //     console.log (action)
        //     window.localStorage.setItem('tk', action.payload.accessToken!);
        //     state.token = action.payload.accessToken;
        //     state.userId = action.payload.userId;
        //     state.accountType = action.payload.accountType;
        //     state.isAuthenticated = true;
        // }),

        // relogin
        // builder.addCase(relogin.rejected, (state) => {
        //     // window.localStorage.removeItem('tk')
        //     window.localStorage.removeItem('auth')
        //     // state.accessToken = null;
        //     state.userId = null;
        //     state.accountType = null;
        //     state.isAuthenticated = false;
        // }),
        // builder.addCase(relogin.fulfilled, (state, action) => {
        //     console.log ('relogin.fulfilled')
        //     console.log (action)
        //     // if (action.payload.accessToken === null){
        //     //     // window.localStorage.removeItem('tk')
        //     //     window.localStorage.removeItem('auth')
        //     // }else{
        //         console.log ('Setting auth ....')
        //         window.localStorage.setItem('auth', JSON.stringify({isAuthenticated: true, rt: action.payload.refreshToken }));
        //         console.log ('Set all')
        //     // }
        //     // state.accessToken = action.payload.accessToken;
        //     state.userId = action.payload.userId;
        //     state.accountType = action.payload.accountType;
        //     state.isAuthenticated = action.payload.isAuthenticated;
        // }),

        // logout
        builder.addCase(logout.rejected, (state) => {
            // window.localStorage.removeItem('tk')
            window.localStorage.removeItem('auth')
            // state.accessToken = null;
            state.userId = null;
            state.accountType = null;
            state.isAuthenticated = false;
        }),
        builder.addCase(logout.fulfilled, (state, action) => {
            console.log ('logout.fulfilled')
            console.log (action)
            // window.localStorage.removeItem('tk')
            window.localStorage.removeItem('auth')
            // state.accessToken = null;
            state.userId = null;
            state.accountType = null;
            state.isAuthenticated = false;
        })
    }
})

export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
