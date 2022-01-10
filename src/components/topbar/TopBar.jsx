import React, { useEffect, useState } from "react";
import "./TopBar.scss";
import { Link } from "react-router-dom";
import AccessComponent from "../access/AccessComponent";
import { LOGOUT } from "../../graphql/mutation/user";
import { useMutation, useSubscription } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/user";
import { UPLOADED_PROFILEPIC } from "../../graphql/subscription/user";

const TopBar = () => {
  const [logout] = useMutation(LOGOUT);

  const user = useRecoilValue(userState);
  const [profilePic, setProfilePic] = useState("");

  useSubscription(UPLOADED_PROFILEPIC, {
    onSubscriptionData({
      subscriptionData: {
        data: {
          uplodedProfilePic: { user_id, image },
        },
      },
    }) {
      if (user._id === user_id){
        setProfilePic(image);
      }
    },
  });

  useEffect(() => {
    if(user){
      setProfilePic(user.profilePic);
    }
  }, [user])

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
            <img className="topImg" src={profilePic} alt="profile" />
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
