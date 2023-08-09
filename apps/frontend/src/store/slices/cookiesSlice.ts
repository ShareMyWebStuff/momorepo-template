import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICookiesState {
    display: boolean,
    status: ('A'|'D'|'N'),
    analytics: boolean,
    thirdParty: boolean
}

const initialState: ICookiesState = {
    display: false,
    status: 'N',
    analytics: false,
    thirdParty: false
}

export const cookiesSlice = createSlice ({
    name: 'cookies',
    initialState,
    reducers: {
        setCookieOptions: ( state , action: PayloadAction<ICookiesState>) => {
            state.display = action.payload.display,
            state.status = action.payload.status,
            state.analytics = action.payload.analytics,
            state.thirdParty = action.payload.thirdParty
        }
    }

})

export const { setCookieOptions } = cookiesSlice.actions;

export default cookiesSlice.reducer;
