import { useState } from "react"
import "./SignUp.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpThunk } from "../../redux/Reducers/authReducer";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        dispatch(signUpThunk({name, email, password}))
        navigate("/signIn")
    };

    return (
        <>
            <div className="signin">
                <form className="signin">
                    <h2>Sign Up</h2>
                    <input
                        type="text"
                        className="signininput"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
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
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    )
}

export default SignUp;