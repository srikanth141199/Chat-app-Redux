import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

import { toast } from 'react-toastify';
import { db } from "../../config/firebase";

const auth = getAuth();



const initialState = {
    isLoggedIn : false,
    userDetails : []
}


//to create new user details
export const signUpThunk = createAsyncThunk("auth/signup", async ({ name,email, password})=>{
    try {
        const userDetails = await createUserWithEmailAndPassword(auth, email, password);
        const user = userDetails.user;

        await updateProfile(user, {
            displayName : name
        })

        await addDoc(collection(db, 'user'), {
            name, email
        })

        //console.log('User signed up successfully!');
        //console.log(user);
        //navigate("/signIn")
    } catch (error) {
        console.log(error)
    }
})

//to signIn existing user
export const signInThunk = createAsyncThunk("auth/signIn", async ({ email, password, navigate }, { dispatch, rejectWithValue }) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        // Fetching user details from Firestore
        const userDoc = await getDoc(doc(db, 'user', user.uid));
        const userDetails = userDoc.data();

        dispatch(userLoggedIn(true));
        dispatch(setUserDetails(userDetails))//updating user details to use in product Reducer

        toast.success("SignIn is Successful");
        navigate("/");

        return userCredentials.user;
    } catch (error) {
        console.log(error);
        toast.error("SignIn failed: " + error.message);
        return rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        signIn : (state, action) => {
            state.userDetails = action.payload
        },
        userLoggedIn : (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUserDetails : (state, action) => {
            state.userDetails = action.payload
        }
    }
})

export const authReducer = authSlice.reducer;

export const {userLoggedIn, signIn, setUserDetails} = authSlice.actions;

export const authSelector = (state) => state.authReducer;