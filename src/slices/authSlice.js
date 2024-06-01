import { createSlice } from "@reduxjs/toolkit";

// initial State
const initialState = {
   signupData:null,
    loading:false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null ,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state , value) {
            state.token = value.payload
        },
        setLoading(state , value) {
            state.loading = value.payload
        },
        setSignupData(state , value){
            state.signupData = value.payload
        }
    }
})


export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer 