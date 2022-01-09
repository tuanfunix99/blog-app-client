import React, { Fragment } from "react";
import Editor from "../../components/editor/Editor";
import TopBar from "../../components/topbar/TopBar";
import { Container, Row, Col } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/user";
import { useNavigate } from 'react-router-dom';


import "./Write.scss";

const Write = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  if (!user) {
    navigate("/login");
  }

  return (
    <Fragment>
      <TopBar />
      <Container>
        <Row>
          <Col lg={9} className="mx-auto">
            <div className="write">
              <img
                className="writeImg"
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
              <form className="writeForm">
                <div className="writeFormGroup">
                  <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"></i>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                  />
                  <input
                    className="writeInput"
                    placeholder="Title"
                    type="text"
                    autoFocus={true}
                  />
                  <button className="writeSubmit" type="submit">
                    Publish
                  </button>
                </div>
                <div className="writeFormGroup">
                  <Editor />
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Write;
