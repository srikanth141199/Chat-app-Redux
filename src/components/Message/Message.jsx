import { useEffect, useRef } from "react";
import "./Message.css"
import { useSelector } from "react-redux";
import { chatSelector } from "../../redux/Reducers/chatReducer";
import { authSelector } from "../../redux/Reducers/authReducer";
import image from "../../assets/Untitled design (1).png"

export default function Message({message}){

    const {user} = useSelector(chatSelector);
    const {userDetails} = useSelector(authSelector);
    const ref = useRef()
    //console.log("user : ", user);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, [message]);

    return (
    <div
      ref={ref}
      className={`message ${message.senderId === userDetails.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === userDetails.uid
              ? userDetails.photoURL
              : (user.photoURL? user.photoURL : image)
          }
          alt="user"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="you" />}
      </div>
    </div>
  );
}