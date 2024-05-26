import { useSelector } from "react-redux"
import "./Messages.css"
import { chatSelector } from "../../redux/Reducers/chatReducer";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import Message from "../Message/Message";

export default function Messages() {

    const { chatId } = useSelector(chatSelector);

    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        })

        return ()=>{
            unsub();
        }
    }, [chatId])


    return (
        <div className="messages">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
}