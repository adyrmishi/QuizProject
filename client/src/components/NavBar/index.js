import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";
import HomeIcon from "@mui/icons-material/Home";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Login } from "../Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/action.js";
function NavBar() {
 
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const socketConnection = useSelector(
    (state) => state.player.socketConnection
  );

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/QuizPage") {
      if (socketConnection !== undefined ) {
        socketConnection.socketConnect.disconnect(true);
      }
    }
  }, []);


  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/QuizPage") {
      if (socketConnection !== undefined) {
        socketConnection.socketConnect.disconnect();
      }
    }
  });

  return (
    <div role="nav">
      <nav className="nav-wrap">
        <div className="account">
          {location.pathname === "/" ? (
            localStorage.getItem("token") ? (
              <button
                onClick={() => {
                  dispatch(logout);
                  window.location.reload();
                }}
              >
                Log Out
              </button>
            ) : (
              <Link to="/LoginRegister">
                <span className="person">
                  <AccountCircleIcon />
                </span>
                <div className="log-reg">Login</div>
              </Link>
            )
          ) : (
            <span>
              <button onClick={() => navigate(-1)}>
                <span className="back-arrow">
                  <NavigateBeforeIcon />
                </span>
                <div className="take-back">Back</div>
              </button>
            </span>
          )}
        </div>

        <span>
          <ExtensionIcon />
          inQUIZitive
          <ExtensionIcon />
        </span>

        <div className="Home-wrap">
          <Link to="/">
            <span className="house">
              <HomeIcon />
            </span>
            <div className="home-icon">Home </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
