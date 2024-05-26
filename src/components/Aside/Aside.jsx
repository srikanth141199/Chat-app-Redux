import Chats from "../Chats/Chats"
import Navbar from "../Navbar/Navbar"
import Search from "../Search/Search"
import "./Aside.css"

export default function Aside(){
    return(
        <div className="AsideContainer">
            <Navbar/>
            <Search/>
            <Chats/>
        </div>
    )
}