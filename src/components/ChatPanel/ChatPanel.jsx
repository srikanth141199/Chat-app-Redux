import { useSelector } from "react-redux";
import "./ChatPanel.css"
import { chatSelector } from "../../redux/Reducers/chatReducer";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";


export default function ChatPannel(){

    const {user} = useSelector(chatSelector);

    return (
        <div className="chatPanel">
          <div className="chatInfo">
            <span>
              {user ? (
                <img
                  src={user.photoURL}
                  style={user.photoURL ? null : { display: "none" }}
                alt="userProfile"/>
              ) : null}
              {user?.displayName}
            </span>
            <div className="chatIcons">
              <i className="fa-solid fa-video"></i>
              <i className="fa-solid fa-user-plus"></i>
              <i className="fa-solid fa-circle-info"></i>
            </div>
          </div>
          <Messages />
          <Input />
        </div>
      );
}