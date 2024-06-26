import { useDispatch, useSelector } from "react-redux";
import "./Chats.css"
import { authSelector } from "../../redux/Reducers/authReducer";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { changeUser } from "../../redux/Reducers/chatReducer";
import image from "../../assets/Untitled design.png"

export default function Chats(){

    const {userDetails} = useSelector(authSelector);
    const [chats, setChats] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        const getChats = ()=>{
            const unsub = onSnapshot(doc(db, "userChats", userDetails.uid), (doc) => {
                setChats(doc.data());
                console.log("chat[1].userInfo.name : ", chats);
            });

            return ()=>{
                unsub();
            }
        }

        userDetails.uid && getChats();
    }, [userDetails.uid, chats])

    const handledSelectChat = (selectedUser)=>{
        dispatch(changeUser({ userDetails, selectedUser }))
    }

    return (
        <div className="chats">
          {/* sort the chat acording the the dtate and time */}
          {Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handledSelectChat(chat[1].userInfo)}
              >
                <img src={chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : image} alt="user-chat" />
                <div className="userChatInfo">
                  <span>{chat[1].userInfo.name}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
            ))}
        </div>
      );
}