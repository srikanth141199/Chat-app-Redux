import { useState } from "react";
import "./Search.css";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/Reducers/authReducer";
import { toast } from "react-toastify";
import { collection, query, getDocs, serverTimestamp, setDoc, updateDoc, where, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Search() {
    const [userName, setUserName] = useState("");
    const [errorVal, setErrorVal] = useState(false);
    const [user, setUser] = useState(null);
    const { userDetails } = useSelector(authSelector);

    const handleKeyDown = async (evt) => {
        if (evt.code === "Enter") {
            if (userDetails.name === userName) {
                setErrorVal(true);
                toast.warn("The login person cannot be friend");
                return;
            }

            const q = query(collection(db, "users"), where("name", "==", userName));

            try {
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setErrorVal(true);
                    console.log("No users found");
                    return;
                }

                setErrorVal(false);
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData) {
                        setUser(userData);
                    } else {
                        setErrorVal(true);
                    }
                });
            } catch (error) {
                console.log(error);
                setErrorVal(true);
            }
        }
    };

    const handleSelectChat = async () => {
        const combineId =
            userDetails.uid > user.uid
                ? userDetails.uid + user.uid
                : user.uid + userDetails.uid;

        try {
            const res = await getDoc(doc(db, "chats", combineId));
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combineId), { messages: [] });

                await updateDoc(doc(db, "userChats", userDetails.uid), {
                    [combineId + ".userInfo"]: {
                        uid: user.uid,
                        name: user.name,
                        // photoURL: user.photoURL,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineId + ".userInfo"]: {
                        uid: userDetails.uid,
                        name: userDetails.name,
                        // photoURL: userDetails.photoURL,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) {
            console.error("Error while adding user as friend:", err);
        }
        setUser(null);
        setUserName("");
    };

    return (
        <div className="SearchContainer">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Search for contact"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                />
            </div>
            {errorVal && <span>User not found!</span>}
            {user && (
                <div className="userChat" onClick={handleSelectChat}>
                    <img src={user.photoURL} alt="user-chat" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
