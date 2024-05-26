import { useDispatch, useSelector } from "react-redux"
import "./Navbar.css"
import { authSelector, userLoggedIn } from "../../redux/Reducers/authReducer"
import photoURL from "./dp1.png"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import { iniState } from "../../redux/Reducers/chatReducer";
import image from "./chat-box.png"
export default function Navbar() {

    const { userDetails } = useSelector(authSelector);
    console.log("userDetails : ", userDetails);
    const dispatch = useDispatch();

    const clearSelectChat = (user) => {
        dispatch(iniState);
    }

    // it handled the sign out from function
    const onClickSignOut = () => {
        signOut(auth)
            .then(() => {
                clearSelectChat(userDetails);
                toast.success("Logout Successful!....", {
                    position: "top-right",
                    theme: "colored",
                });
            })
            .catch((error) => {
                // An error happened.
                toast.error(error, {
                    position: "top-right",
                    theme: "colored",
                });
            });

        dispatch(userLoggedIn(false))
    };

    return (
        <div className="navbar">
            <span className="logo"><img src={image} alt="logo" className="logo" /></span>
            <div className="user">
                <img
                    src={photoURL}
                    alt="user"
                />
                <span className="userName">{userDetails.name}</span>

                <button onClick={onClickSignOut}>
                    <span style={{ fontWeight: 600 }}>Logout</span>
                </button>
            </div>
        </div>
    );
}