import React, { Fragment } from "react";
import Editor from "../../components/editor/Editor";
import TopBar from "../../components/topbar/TopBar";
import { Container, Row, Col, Alert } from "react-bootstrap";

import "./Write.scss";
import AccessComponent from "../../components/access/AccessComponent";
import { Link } from "react-router-dom";

const Write = () => {
  return (
    <Fragment>
      <TopBar />
      <AccessComponent isLogin={true}>
        <Container>
          <Row>
            <Col lg={9} className="mx-auto">
              <div className="write">
                <img
                  className="writeImg"
                  src="./background.jpg"
                  alt="background post"
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

export default Write;
