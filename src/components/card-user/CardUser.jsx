import React, { Fragment } from "react";
import moment from "moment";

import "./CardUser.scss";
import { Col, Container, Row } from "react-bootstrap";

const CardUser = ({ user, createdAt }) => {
  createdAt = moment(new Date(parseInt(createdAt.toString()))).format("MMM Do YY");
  return (
    <Fragment>
      <Container>
        <Row>
          <Col lg={8} className="my-3">
            <div className="carduser">
              <img
                src={user.profilePic}
                alt="Profile User"
                className="carduser__image"
              />
              <div className="carduser__info">
                <h6 className="my-0">{user.username}</h6>
                <small>{createdAt}</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CardUser;
