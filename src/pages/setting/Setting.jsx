import React from "react";
import { Fragment } from "react";
import AccessComponent from "../../components/access/AccessComponent";
import Sidebar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import { Container, Row, Col, Alert } from "react-bootstrap";

import "./Setting.scss";
import { Link } from "react-router-dom";

const Setting = () => {
  return (
    <Fragment>
      <TopBar />
      <AccessComponent isLogin={true}>
        <div className="settings">
          <div className="settingsWrapper">
            <div className="settingsTitle">
              <span className="settingsTitleUpdate">Update Your Account</span>
              <span className="settingsTitleDelete">Delete Account</span>
            </div>
            <form className="settingsForm">
              <label>Profile Picture</label>
              <div className="settingsPP">
                <img
                  src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  className="settingsPPInput"
                />
              </div>
              <label>Username</label>
              <input type="text" placeholder="Safak" name="name" />
              <label>Email</label>
              <input type="email" placeholder="safak@gmail.com" name="email" />
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" />
              <button className="settingsSubmitButton" type="submit">
                Update
              </button>
            </form>
          </div>
          <Sidebar />
        </div>
      </AccessComponent>
      <AccessComponent isLogin={false}>
        <Container>
          <Row>
            <Col lg={9} className="mx-auto">
              <Alert variant={"danger"}>
                Access denied.Please <Link to="/login">Login</Link> to access
                page.
              </Alert>
            </Col>
          </Row>
        </Container>
      </AccessComponent>
    </Fragment>
  );
};

export default Setting;
