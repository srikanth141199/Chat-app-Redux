// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsvI6dndEiJoqRZbBTSCscdTa8eFM7Dg0",
  authDomain: "chat-d9103.firebaseapp.com",
  projectId: "chat-d9103",
  storageBucket: "chat-d9103.appspot.com",
  messagingSenderId: "269850099743",
  appId: "1:269850099743:web:124e5897e1ef1484bad52a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();