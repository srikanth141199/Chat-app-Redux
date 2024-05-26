import Aside from "../Aside/Aside"
import ChatPannel from "../ChatPanel/ChatPanel"
import "./Home.css"

export default function Home(){
    return(
        <div className="HomeContainer">
            <Aside/>
            <ChatPannel/>
        </div>
    )
}