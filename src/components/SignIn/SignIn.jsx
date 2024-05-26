import { Link, useNavigate } from "react-router-dom";
//import { useValue } from "../../Context";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import {  signInThunk, userLoggedIn } from "../../redux/Reducers/authReducer";
import { auth } from "../../config/firebase";


export default function SignIn() {

    //const {email, setEmail, password, setPassword, setSignIn} = useValue();
    const [resetEmail, setResetEmail] = useState('');
    const [resetPasswordSent, setResetPasswordSent] = useState(false);

    //const {isLoggedIn} = useSelector(authSelector);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const navigate = useNavigate();
    dispatch(userLoggedIn(false));

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            dispatch(signInThunk({ email, password, navigate }));
            dispatch(userLoggedIn(true));
        } catch (error) {
            console.log(error);
        }
    }

    const handleResetPassword = async(event) =>{
        event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a password reset email to the user's email address
      await sendPasswordResetEmail(auth, resetEmail);
      setResetPasswordSent(true);
      toast.success("Link Send on your mail");
    } catch (error) {
      // Handle any errors
      console.error(error);
      toast.error("Something went wrong!!");
    }
    }


    return (
        <>
            <div className="signin">
                {!resetPasswordSent ? (
                    <form className="signin">
                        <h2>Sign In</h2>
                        <input
                            type="email"
                            className="signininput"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            className="signininput"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button className="signingbtn" onClick={handleSubmit}>
                            Sign In
                        </button>
                        <div className='signup'>
                            <Link to="/signup" >
                                <p>or Sign Up instead</p>
                            </Link>
                            <span className="reset-password-link">
                                <Link to="#" onClick={() => setResetPasswordSent(true)}>
                                    Forgot Password?
                                </Link>
                            </span>
                        </div>
                    </form>
                ) : (
                    <form className="signin">
                        <h2>Reset Password</h2>
                        <p>
                            Please enter your email address. We will send you a link to reset your password.
                        </p>
                        <input
                            type="email"
                            className="signininput"
                            placeholder="Enter Email"
                            value={resetEmail}
                            onChange={(event) => setResetEmail(event.target.value)}
                        />
                        <button className="signingbtn" onClick={handleResetPassword}>
                            Send Reset Email
                        </button>
                        <div className="reset-password-link">
                            <Link to="#" onClick={() => setResetPasswordSent(false)}>
                                Go Back
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}