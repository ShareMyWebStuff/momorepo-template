import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import statusReducer from './slices/statusSlice'
import cookiesReducer from './slices/cookiesSlice'
import registerReducer from './slices/registerSlice'
// import authReducer from './slices/authSlice'
import profileReducer from './slices/profileSlice'

const storeSetup = () => {
  
  return configureStore({
    reducer: {
      status: statusReducer,
      cookies: cookiesReducer,
      register: registerReducer,
      // auth: authReducer,
      profile: profileReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
  })
}

export const store = storeSetup();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string> >;