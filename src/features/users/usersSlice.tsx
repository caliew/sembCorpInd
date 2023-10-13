import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// const initialState:UserState[] = []
interface AppState {
    users: any[];
    isUser: any;
    accessCode : any;
    companyName: any;
}
const initialState:AppState = {
    users  : [],
    isUser : null,
    accessCode : null,
    companyName : null
}

interface UserState {
    users: PersonState;
}
interface PersonState {
    map: any;
    id : number,
    name : string,
    phone : string,
    username : string,
    email: string,
    website: string,
    company: string
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})
export const addAccessCode = createAsyncThunk('users/accessCode', async(accessCode:string)=>{
    const response = { data:accessCode};
    return response.data;
})
export const addUserCompany = createAsyncThunk('users/company', async(company:string)=>{
    const response = { data:company};
    return response.data;
})
export const setIsUser = createAsyncThunk('users/setIsUser', async(flag:boolean)=>{
    const response = { data:flag };
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
        builder.addCase(addAccessCode.fulfilled, (state,action) => {
            console.log(action.payload)
            state.accessCode = action.payload;
        })
        builder.addCase(addUserCompany.fulfilled, (state,action) => {
            console.log(action.payload)
            state.companyName = action.payload;
        })
        builder.addCase(setIsUser.fulfilled, (state,action) =>{
            state.isUser = action.payload;
        })
    }
})

export const selectAllUsers = (state:any) => state.users;
export const getAccessCode = (state:any) => state.users.accessCode;
export const getIsUser = (state:any) => state.users.isUser;
export const getCompanyName = (state:any) => state.users.companyName;

export default usersSlice.reducer