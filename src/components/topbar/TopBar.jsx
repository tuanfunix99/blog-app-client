import React from "react";
import "./TopBar.scss";
import { Link } from "react-router-dom";
import AccessComponent from "../access/AccessComponent";
import { LOGOUT } from "../../graphql/mutation/user";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";


const TopBar = () => {
  const [logout] = useMutation(LOGOUT);
  const onLogoutHanler = () => {
    logout({
      onCompleted(data) {
        if (data.logout) {
          localStorage.removeItem("access_token");
          window.location.reload();
        }
      },
      onError(errors) {
        toast.error(errors.message, {
          position: "top-center",
          autoClose: 8000,
        });
      },
    });
  };

  return (
    <div className="top">
      <ToastContainer />
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <AccessComponent isLogin={true}>
            <li className="topListItem">
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>
          </AccessComponent>
        </ul>
      </div>
      <div className="topRight">
        <AccessComponent isLogin={true}>
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        </AccessComponent>
        <AccessComponent isLogin={true}>
          <ul className="topList">
            <li className="topListItem" onClick={onLogoutHanler}>
              LOGOUT
            </li>
          </ul>
        </AccessComponent>
        <AccessComponent isLogin={false}>
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        </AccessComponent>
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default TopBar;
