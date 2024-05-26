import { useDispatch, useSelector } from "react-redux";
import Aside from "../Aside/Aside";
import ChatPannel from "../ChatPanel/ChatPanel";
import "./Home.css";
import { authSelector, userLoggedIn } from "../../redux/Reducers/authReducer";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { userDetails, isLoggedIn } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails.length > 0) {
      dispatch(userLoggedIn(true))
    }
  }, [dispatch, userDetails]);

  if (!isLoggedIn) {
    return <Navigate to="/signIn" />;
  }

  return (
    <div className="HomeContainer">
      <Aside />
      <ChatPannel />
    </div>
  );
}
