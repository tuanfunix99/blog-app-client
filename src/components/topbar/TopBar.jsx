import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccessComponent from "../access/AccessComponent";
import { LOGOUT } from "../../graphql/mutation/user";
import { useMutation, useSubscription } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/user";
import { UPLOADED_PROFILEPIC } from "../../graphql/subscription/user";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";

import "./TopBar.scss";

const TopBar = () => {
  const [logout] = useMutation(LOGOUT);

  const user = useRecoilValue(userState);
  const [profilePic, setProfilePic] = useState("");
  const [show, setShow] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");

  const navigator = useNavigate();

  useSubscription(UPLOADED_PROFILEPIC, {
    onSubscriptionData({
      subscriptionData: {
        data: {
          uplodedProfilePic: { user_id, image },
        },
      },
    }) {
      if (user._id === user_id) {
        setProfilePic(image);
      }
    },
  });

  useEffect(() => {
    if (user) {
      setProfilePic(user.profilePic);
    }
  }, [user]);

  const onLogoutHanler = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
    logout({
      onError(errors) {
        toast.error("Error System", {
          position: "top-center",
          autoClose: 8000,
        });
      },
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const onSelectHandler = (e) => {
    const link = e.target.innerHTML.toString();
    if (link === "MY POST") {
      navigator("/my-post/" + (user ? user._id : ""), { replace: true });
      return;
    }
    if (link === "HOME") {
      navigator("/", { replace: true });
      return;
    }
    navigator("/" + link.toLowerCase(), { replace: true });
  };

  const displayMenuPopup = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <AccessComponent isLogin={true}>
              <Link className="link" to="/settings">
                <img className="topImg" src={profilePic} alt="profile" />
                <h6>{user ? user.username : ""}</h6>
              </Link>
            </AccessComponent>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown.Item eventKey="0">
            <Form className="form-search" onSubmit={onSubmitSearchHandler}>
              <Form.Control
                type="text"
                placeholder="Title..."
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </Form>
          </Dropdown.Item>
          <Dropdown.Item eventKey="1" onClick={onSelectHandler}>
            HOME
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={onSelectHandler}>
            ABOUT
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={onSelectHandler}>
            CONTACT
          </Dropdown.Item>
          <AccessComponent isLogin={true}>
            <Dropdown.Item eventKey="4" onClick={onSelectHandler}>
              WRITE
            </Dropdown.Item>
            <Dropdown.Item eventKey="5" onClick={onSelectHandler}>
              MY POST
            </Dropdown.Item>
            <Dropdown.Item eventKey="5" onClick={onSelectHandler}>
              SETTINGS
            </Dropdown.Item>
            <Dropdown.Item eventKey="6" onClick={onLogoutHanler}>
              LOGOUT
            </Dropdown.Item>
          </AccessComponent>
          <AccessComponent isLogin={false}>
            <Dropdown.Item eventKey="7" onClick={onSelectHandler}>
              LOGIN
            </Dropdown.Item>
            <Dropdown.Item eventKey="8" onClick={onSelectHandler}>
              REGISTER
            </Dropdown.Item>
          </AccessComponent>
        </Modal.Body>
      </Modal>
    );
  };

  const onSubmitSearchHandler = (e) => {
    e.preventDefault();
    const link = "/posts?title=" + searchTitle;
    navigator(link);
    setSearchTitle("");
    setShow(false);
  };

  return (
    <div className="top">
      <ToastContainer />
      {displayMenuPopup()}
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topTitle">
        <span className="headerTitleSm">Dev & Storys</span>
      </div>
      <div className="topBar">
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-bars"></i>
        </Button>
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
            <li className="topListItem">
              <Link className="link" to={"/my-post/" + (user ? user._id : "")}>
                MY POST
              </Link>
            </li>
          </AccessComponent>
        </ul>
      </div>
      <div className="topRight">
        <ul className="topList">
          <li className="topListItem">
            <Form className="form-search" onSubmit={onSubmitSearchHandler}>
              <Form.Control
                type="text"
                placeholder="Title..."
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </Form>
          </li>
          <AccessComponent isLogin={true}>
            <li className="topListItem" onClick={onLogoutHanler}>
              LOGOUT
            </li>
          </AccessComponent>
          <AccessComponent isLogin={false}>
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
          </AccessComponent>
          <AccessComponent isLogin={true}>
            <Link className="link" to="/settings">
              <img className="topImg" src={profilePic} alt="profile" />
            </Link>
          </AccessComponent>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
