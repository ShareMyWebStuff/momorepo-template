import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";
import { User } from '@tstypes/user'
import { Details } from '@tstypes/user-details'
import { Qualification } from '@tstypes/qualifications'
import { Media } from '@tstypes/media'
import { T_Subject } from '@tstypes/user-subject'
import { Language } from '@tstypes/user-language'
import { About } from '@tstypes/user-about'
import { VerifyMedia } from '@tstypes/media'
import { Reference } from '@tstypes/references'
import { logout } from '@store/slices/statusSlice'

import sendMsg from '@utils/sendMsg'




type T_Profile = {
    status: number
    data: {
        msg: string
        user: User
        details: Details
        media: Media[]
        qualifications: Qualification[]
        subjects: T_Subject[]
        languages: Language[]
        about: About
        verifyMedia: VerifyMedia[]
        references: Reference[]
    }
}

type T_MediaProfileItem = {
    languageId: number
    spokenProficiencyId: number
    writtenProficiencyId: number
    native: boolean
} []
// 
type T_Languages = {
    languageId: number
    spokenProficiencyId: number
    writtenProficiencyId: number
    native: boolean
} []

type InitProfile = {
    user: User
    details: Details
    media: Media[]
    qualifications: Qualification[]
    subjects: T_Subject[]
    languages: Language[]
    about: About
    verifyMedia: VerifyMedia[]
    references: Reference[]
}

const initialState: InitProfile = {
    user: {
        userId: null,
        email: null,
        tutorAcc: false,
        studentAcc: false,
        parentAcc: false,
        adminAcc: false,
        googleAcc: false,
        googleId: null,
        validatedEmail: false,
        validatedMobile: false,
        verified: false,
        idVerified: false,
        photoVerified: false,
        idPhotoVerified: false,
        addrVerified: false,
        dbsVerified: false,
        refsVerified: false,
        createDate: null
    },
    details: {
        title: 0,
        firstname: '',
        lastname: '',
        gender: 0,
        address1: '',
        address2: '',
        town: '',
        county: '',
        postcode: '',
        countryId: null,
        phone: null,
        mobile: null,
        profileTitle: '',
        profileTitleError: null,
        photoMediaId: null,
        videoMediaId: null,
        searchLocationId: null,
        avgRating: null,
        noRating: null,
        tutorsHome: false,
        tutorTravels: 0,
        tutorOnline: false,
        teacher: false,
        inEducation: false,
        hasDegree: false,
        dbs: false,
        dbsVerified: false,
        location: null,
        creationMins: 0, 
        lastOnlineMins: 0
    },
    media: [],
    qualifications: [],
    subjects: [],
    languages: [],
    about: {
        aboutYou:           null,
        aboutYouVerified:   true,
        experience:         null,
        experienceVerified: true,
        methods:            null,
        methodsVerified:    true,
        verifiedBy:         null,
        aboutYouError:      null,
        experienceError:    null,
        methodsError:       null
    },
    verifyMedia: [],
    references: []
}


// Relogin - user opens another tab so we reload their details
export const loadProfile = createAsyncThunk('user/profile', 
async (data, {rejectWithValue}) => {
    try {
        console.log ('CALLING createAsyncThunk - GET user/profile')
        const response = await sendMsg( 'get', 'user/profile', {}) as T_Profile
        console.log ('LOAD PROFILE ')
        console.log (response)
        if ( response.status === 200  ){
            return {
                user: response.data.user,
                details: response.data.details,
                media: response.data.media,
                qualifications: response.data.qualifications,
                subjects: response.data.subjects,
                languages: response.data.languages,
                about: response.data.about,
                verifyMedia: response.data.verifyMedia,
                references: response.data.references
            }
        } else {
            // return rejectedWithValue(initialState)
            // return  initialState
            return rejectWithValue('User not logged on')
        }
            
    } catch (err) {
        console.log ('LOAD PROFILE ERROR')
        console.log (err)
        throw err
    }

})

export const profileSlice = createSlice ({
    name: 'profile',
    initialState,
    reducers: {
        // setAuth: ( state , action: PayloadAction<IAuth>) => {
        //     state.userId = action.payload.userId;
        //     state.accountType = action.payload.accountType;
        //     state.isAuthenticated = action.payload.isAuthenticated;
        // },
        resetProfile: ( state ) => {
            state = initialState;
        },
        setAbout: (state, action: PayloadAction<About>) => {
            state.about = action.payload
        },
        setDetails: (state, action: PayloadAction<Details>) => {
            state.details = action.payload
        },
        setLanguages: (state, action: PayloadAction<T_Languages>) => {
            state.languages = action.payload
        },
        setSubjects: (state, action: PayloadAction<T_Subject[]>) => {
            state.subjects = action.payload
        },
        addProfileMediaItem: (state, action: PayloadAction<Media>) => {
            state.media.push(action.payload) 
        },
        removeProfileMediaItem: (state, action: PayloadAction<{mediaId: number, mediaCatId: number}>) => {
            state.media = state.media.filter ( item => !(item.mediaCatId === action.payload.mediaCatId && item.mediaId === action.payload.mediaId))
        },
        addVerifyMediaItem: (state, action: PayloadAction<VerifyMedia>) => {
            state.verifyMedia.push(action.payload) 
        },
        removeVerifyMediaItem: (state, action: PayloadAction<{mediaId: number, mediaCatId: number}>) => {
            state.verifyMedia = state.verifyMedia.filter ( item => !(item.mediaCatId === action.payload.mediaCatId && item.mediaId === action.payload.mediaId))
        },
        addReference: (state, action: PayloadAction<Reference>) => {
            state.references.push(action.payload) 
        },
        removeReference: (state, action: PayloadAction<{referenceId: number}>) => {
            state.references = state.references.filter ( item => !(item.referenceId === action.payload.referenceId ))
        },
        setReferenceSent: (state, action: PayloadAction<{referenceId: number}>) => {
            state.references = state.references.map ( item => {
                if ( item.referenceId === action.payload.referenceId) {
                    return { ...item, status: 'S', lastSent: new Date().toISOString(), sentCount: item.sentCount + 1}
                }
                return item
            })
        },
        setQualifications: (state, action: PayloadAction<Qualification[]>) => {
            state.qualifications = action.payload
        }
    },
    extraReducers: (builder) => {
        // loadProfile
        builder.addCase(loadProfile.rejected, (state) => {
            state.user = initialState.user
            state.details = initialState.details
            state.media = initialState.media
            state.qualifications = initialState.qualifications
            state.subjects = initialState.subjects
            state.languages = initialState.languages
            state.about = initialState.about
            state.verifyMedia = initialState.verifyMedia
            state.references = initialState.references
        }),
        builder.addCase(loadProfile.fulfilled, (state, action) => {
            console.log ('relogin.fulfilled')
            console.log (action)
            state.user = action.payload.user;
            state.details = action.payload.details;
            state.media = action.payload.media;
            state.qualifications = action.payload.qualifications;
            state.subjects = action.payload.subjects;
            state.languages = action.payload.languages;
            state.about = action.payload.about;
            state.verifyMedia = action.payload.verifyMedia;
            state.references = action.payload.references;
        })
        builder.addCase(logout.rejected, (state) => {
            state.user = initialState.user
            state.details = initialState.details
            state.media = initialState.media
            state.qualifications = initialState.qualifications
            state.subjects = initialState.subjects
            state.languages = initialState.languages
            state.about = initialState.about
            state.verifyMedia = initialState.verifyMedia
            state.references = initialState.references
        }),
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = initialState.user
            state.details = initialState.details
            state.media = initialState.media
            state.qualifications = initialState.qualifications
            state.subjects = initialState.subjects
            state.languages = initialState.languages
            state.about = initialState.about
            state.verifyMedia = initialState.verifyMedia
            state.references = initialState.references
        })

        // // logout
        // builder.addCase(logout.rejected, (state) => {
        //     state = initialState;
        // }),
        // builder.addCase(logout.fulfilled, (state, action) => {
        //     state = initialState;
        // })
    }
})

export const {  resetProfile,
                setAbout,
                setDetails,
                setLanguages,
                setSubjects,
                addProfileMediaItem,
                removeProfileMediaItem,
                addVerifyMediaItem,
                removeVerifyMediaItem,
                addReference,
                removeReference,
                setReferenceSent,
                setQualifications } = profileSlice.actions;

export default profileSlice.reducer;
