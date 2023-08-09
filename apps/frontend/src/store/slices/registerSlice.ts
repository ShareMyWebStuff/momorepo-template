import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRegisterStep {
    step: number;
}

// export interface IGoogleRegister {
//     email: string;
//     password: string;
//     password2: string;
//     googleEmail: string;
//     googleAcc: boolean;
//     googleId: string | null,
//     firstname: string;
//     lastname: string;
//     token: string | null;
// }

export interface IRegisterStep1 {
    step: number;
    email: string;
    password: string;
    password2: string;
    googleEmail: string;
    googleAcc: boolean;
    googleId: string | null;
    firstname: string;
    lastname: string;
    token: string | null;
}

export interface IRegisterStep2 {
    step: number;
    accountType: string;
    title: string;
    firstname: string;
    lastname: string;
    gender: string;
    phone: string;
    mobile: string;
}

export interface IRegisterStep3 {
    step: number;
    address1: string;
    address2: string;
    town: string;
    county: string;
    postcode: string;
}

export interface IRegisterState extends IRegisterStep, IRegisterStep1, IRegisterStep2, IRegisterStep3 { }

const initialState: IRegisterState = {
    step: 1,
    token: null,
    email: '',
    password: '',
    password2: '',
    googleEmail: '',
    googleAcc: false,
    googleId: '',

    accountType: 'Account type',
    title: 'Title',
    firstname: '',
    lastname: '',
    gender: 'Gender',

    address1: '',
    address2: '',
    town: '',
    county: '',
    postcode: '',

    phone: '',
    mobile: ''
}


export const registerSlice = createSlice ({
    name: 'register',
    initialState,
    reducers: {
        setStep: ( state , action: PayloadAction<IRegisterStep>) => {
            state.step = action.payload.step;
        },
        setRegisterStep1: ( state , action: PayloadAction<IRegisterStep1>) => {
            state.step = action.payload.step;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.password2 = action.payload.password2;
            state.googleEmail = action.payload.googleEmail;
            state.googleAcc = action.payload.googleAcc;
            state.googleId = action.payload.googleId;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.token = action.payload.token;
        },
        setRegisterStep2: ( state , action: PayloadAction<IRegisterStep2>) => {
            state.step = action.payload.step;
            state.accountType = action.payload.accountType;
            state.title = action.payload.title;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.gender = action.payload.gender;
            state.phone = action.payload.phone;
            state.mobile = action.payload.mobile;
        },
        setRegisterStep3: ( state , action: PayloadAction<IRegisterStep3>) => {
            state.step = action.payload.step;
            state.address1 = action.payload.address1;
            state.address2 = action.payload.address2;
            state.town = action.payload.town;
            state.county = action.payload.county;
            state.postcode = action.payload.postcode;
        },
        resetRegister: ( state ) => {
            state.step=1
            state.token=null
            state.email='',
            state.password='',
            state.password2='',
            state.googleEmail='',
            state.googleAcc=false,
            state.googleId='',
        
            state.accountType='Account type',
            state.title='Title',
            state.firstname='',
            state.lastname='',
            state.gender='Gender',
        
            state.address1='',
            state.address2='',
            state.town='',
            state.county=''
            state.postcode=''
        
            state.phone=''
            state.mobile=''
        
        },
    }

})

export const { setStep, setRegisterStep1, setRegisterStep2, setRegisterStep3, resetRegister } = registerSlice.actions;

export default registerSlice.reducer;
