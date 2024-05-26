import { useState } from "react";
import "./Input.css"
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/Reducers/authReducer";
import { chatSelector } from "../../redux/Reducers/chatReducer";
import Picker, { Emoji, SkinTones } from "emoji-picker-react";
import SendIcon from "./send.png"
import ImageIcon from "./image.png"
import Smile from "./smile.png"
import baseSmile from "./happiness.png"
import { toast } from "react-toastify";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {v4 as uuid} from "uuid";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function Input(){

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [sendingImage, setSendingImage] = useState(false);

    const {userDetails} = useSelector(authSelector);
    const {chatId, user} = useSelector(chatSelector);

    const handledSendMessage = async ()=>{
        let trimmedText = text.trim();

        if(!trimmedText && !img){
            toast.error("Please select a Image or enter text");
            return;
        }

        if(!trimmedText && img){
            trimmedText = img.name;
        }

        if(img && !sendingImage){
            setSendingImage(true);

            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                (error) =>{
                    toast.error(error);
                    setSendingImage(false);
                },

                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        const imageName = img.name;
                        const messageContent = trimmedText || `${imageName}`;

                        await updateDoc(doc(db, "chats", chatId), {
                            messages : arrayUnion({
                                id : uuid(),
                                text : messageContent,
                                senderId : userDetails.uid,
                                date : Timestamp.now(),
                                img : downloadURL
                            })
                        });

                        setSendingImage(false);
                    })
                }
            )

        }
        else{
            const imageName  = img ? img.name : "";
            const messageContent = trimmedText || `${imageName}`;
            
            await updateDoc(doc(db, "chats", chatId), {
                messages : arrayUnion({
                    id : uuid(),
                    text : messageContent,
                    senderId : userDetails.uid,
                    date : Timestamp.now()
                })
            });
        }

        await updateDoc(doc(db, "userChats", userDetails.uid), {
            [chatId+".lastMessage"]:{
                text : trimmedText
            },
            [chatId+".date"] : serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
            [chatId+".lastMessage"] : {
                text : trimmedText
            },
            [chatId+".date"] : serverTimestamp()
        })

        setText("");
        setImg(null);

    }

    const handleKeyDown = (evt) =>{
        if(evt.key === "Enter"){
            handledSendMessage();
        }
    }

    const handleEmojiClick = (emojiData) =>{
        const {unified} = emojiData;
        const emoji = String.fromCodePoint(`0x${unified}`);

        setText(text + emoji);
        setSelectedEmoji(emoji);
        setShowEmojiPicker(false);
    }



    return (
        <div className="input">
          <input
            type="text"
            placeholder="Type something...."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            value={text}
          />
          {/* Emoji picker */}
          {selectedEmoji ? (
            <Emoji
              emoji={selectedEmoji}
              native={true}
              onClick={handleEmojiClick}
            />
          ) : null}
    
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiClick}
              disableAutoFocus={true}
              groupNames={{ smileys_people: "PEOPLE" }}
              native={true}
              SkinTone={SkinTones.NONE}
            />
          )}
    
          <div className="send">
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
    
            <label htmlFor="file">
              <img
                src={ImageIcon}
                alt="img-logo"
              />
            </label>
    
            {/* Emoji picker toggle button */}
            <button
              className="emojiButton"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <i>
                {showEmojiPicker? <img src={Smile} alt="Smile" /> : <img src={baseSmile} alt="Happy" />}
              </i>

            </button>
            <button onClick={handledSendMessage}>
              <img src={SendIcon} alt="send" />
            </button>
          </div>
        </div>
      );
}