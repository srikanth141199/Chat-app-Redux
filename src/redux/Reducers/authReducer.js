import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {  doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from 'react-toastify';
import { db } from "../../config/firebase";

import image1 from "../../assets/Untitled design.png"
import image2 from "../../assets/Untitled design (1).png"
import image3 from "../../assets/Untitled design (2).png"
import image4 from "../../assets/Untitled design (3).png"
import image5 from "../../assets/Untitled design (4).png"

const auth = getAuth();



const initialState = {
    isLoggedIn : false,
    userDetails : []
}

const images = [
    image1,
    image2,
    image3,
    image4,
    image5
];

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};


//to create new user details
export const signUpThunk = createAsyncThunk("auth/signup", async ({ name,email, password})=>{
    try {
        const userDetails = await createUserWithEmailAndPassword(auth, email, password);
        const user = userDetails.user;

        const photoURL = getRandomImage();

        await updateProfile(user, {
            displayName : name,
            photoURL: photoURL
        })

        // await addDoc(collection(db, 'user', user.uid), {
        //     name, email
        // })

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email,
            photoURL
          });

        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", user.uid), {});
        toast.success("Signup Successfully!...", {
          position: "top-right",
          theme: "colored",
        });

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
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userDetails = userDoc.data();

        dispatch(userLoggedIn(true));
        console.log("userDetails in reducer : ", userDetails);
        console.log("user in reducer : ", user);
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