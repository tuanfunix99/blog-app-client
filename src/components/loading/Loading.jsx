import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <ClipLoader color={"#36D7B7"} loading={true} size={40} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Loading;
